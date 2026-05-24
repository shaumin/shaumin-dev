export interface RSSItem {
  id: string
  title: string
  url: string
  source: string
  date: string // ISO 8601
}

export const FEED_URLS: string[] = [
  'https://oswalt.dev/feed.xml',
  'https://eli.thegreenplace.net/feeds/all.atom.xml',
  'https://engineering.fb.com/feed/',
  'https://jvns.ca/atom.xml',
]
