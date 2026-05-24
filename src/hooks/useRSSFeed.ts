import { useEffect, useState } from 'react'
import { FEED_URLS, type RSSItem } from '../data/rss'

const CACHE_KEY = 'rss_feed_v1'

function readCache(): RSSItem[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as RSSItem[]) : null
  } catch {
    return null
  }
}

function writeCache(data: RSSItem[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch { /* storage full or unavailable */ }
}

function toISO(raw: string | null | undefined): string {
  if (!raw) return new Date(0).toISOString()
  const d = new Date(raw.trim())
  return isNaN(d.getTime()) ? new Date(0).toISOString() : d.toISOString()
}

function parseItems(doc: Document, source: string, feedUrl: string): RSSItem[] {
  // RSS 2.0 — items are <channel><item>
  const rssItems = doc.querySelectorAll('channel > item')
  if (rssItems.length > 0) {
    return Array.from(rssItems)
      .map((item, i) => ({
        id: `${feedUrl}::${i}`,
        title: item.querySelector('title')?.textContent?.trim() ?? '',
        url:
          item.querySelector('link')?.textContent?.trim() ||
          item.querySelector('guid')?.textContent?.trim() ||
          feedUrl,
        source,
        date: toISO(item.querySelector('pubDate')?.textContent),
      }))
      .filter(item => item.title)
  }

  // Atom — items are <feed><entry>
  return Array.from(doc.querySelectorAll('feed > entry'))
    .map((entry, i) => ({
      id: `${feedUrl}::${i}`,
      title: entry.querySelector('title')?.textContent?.trim() ?? '',
      url:
        entry.querySelector('link[rel="alternate"]')?.getAttribute('href') ||
        entry.querySelector('link')?.getAttribute('href') ||
        feedUrl,
      source,
      date: toISO(
        entry.querySelector('published')?.textContent ??
        entry.querySelector('updated')?.textContent,
      ),
    }))
    .filter(item => item.title)
}

async function fetchFeed(url: string): Promise<RSSItem[]> {
  const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
  const res = await fetch(proxy)
  if (!res.ok) throw new Error(String(res.status))

  const json = await res.json() as { contents: string; status: { http_code: number } }
  if (json.status.http_code !== 200) throw new Error(String(json.status.http_code))

  const doc = new DOMParser().parseFromString(json.contents, 'text/xml')
  if (doc.querySelector('parsererror')) throw new Error('XML parse error')

  const source =
    doc.querySelector('channel > title, feed > title')?.textContent?.trim() ??
    new URL(url).hostname

  return parseItems(doc, source, url)
}

export function useRSSFeed() {
  const [items, setItems] = useState<RSSItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled(FEED_URLS.map(fetchFeed))
      .then(results => {
        const fresh = results.flatMap(r => r.status === 'fulfilled' ? r.value : [])

        if (fresh.length > 0) {
          const sorted = fresh.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          writeCache(sorted)
          setItems(sorted)
        } else {
          // All feeds failed — fall back to last good data
          const cached = readCache()
          if (cached) setItems(cached)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return { items, loading }
}
