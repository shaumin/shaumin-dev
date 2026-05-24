import { useState, useEffect } from 'react'
import { essays as staticEssays, type Essay } from '../data/essays'

const FEED_URL = 'https://essays.shaumin.dev/feed.xml'

function parseRssItem(item: Element, index: number): Essay {
  const get = (tag: string) => item.querySelector(tag)?.textContent?.trim() ?? ''
  const url = get('link')
  const pubDate = get('pubDate')
  const date = pubDate
    ? new Date(pubDate).toISOString().slice(0, 10)
    : ''
  return {
    id: get('guid') || url || String(index),
    title: get('title'),
    url,
    date,
  }
}

export function useEssayFeed(): { essays: Essay[]; loading: boolean; fromFeed: boolean } {
  const [essays, setEssays] = useState<Essay[]>(staticEssays)
  const [loading, setLoading] = useState(true)
  const [fromFeed, setFromFeed] = useState(false)

  useEffect(() => {
    fetch(FEED_URL)
      .then(r => r.text())
      .then(xml => {
        const doc = new DOMParser().parseFromString(xml, 'application/xml')
        const items = Array.from(doc.querySelectorAll('item'))
        if (items.length > 0) {
          setEssays(items.map(parseRssItem))
          setFromFeed(true)
        }
      })
      .catch(() => {
        // Fall back to static data already set in initial state
      })
      .finally(() => setLoading(false))
  }, [])

  return { essays, loading, fromFeed }
}
