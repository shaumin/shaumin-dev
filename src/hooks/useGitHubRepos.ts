import { useEffect, useState } from 'react'
import type { Project } from '../data/projects'

const GITHUB_USER = 'shaumin'
const CACHE_KEY = 'gh_repos_v1'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  fork: boolean
  archived: boolean
  owner: { login: string }
}

function readCache(): Project[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as Project[]) : null
  } catch {
    return null
  }
}

function writeCache(data: Project[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch { /* storage full or unavailable */ }
}

function mapRepo(repo: GitHubRepo): Project {
  // demo topic → use homepage as the live demo URL
  // docs topic → assume GitHub Pages at the conventional path
  const hasDemo = repo.topics.includes('demo')
  const hasDocs = repo.topics.includes('docs')
  return {
    id: String(repo.id),
    name: repo.name,
    description: repo.description ?? undefined,
    github: repo.html_url,
    demo: hasDemo && repo.homepage ? repo.homepage : undefined,
    docs: hasDocs
      ? `https://${repo.owner.login}.github.io/${repo.name}/`
      : undefined,
  }
}

export function useGitHubRepos() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=public`,
      { headers: { Accept: 'application/vnd.github+json' } },
    )
      .then(r => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json() as Promise<GitHubRepo[]>
      })
      .then(repos => {
        const mapped = repos
          .filter(r => !r.fork && !r.archived)
          .filter(r => r.topics.includes('demo') || r.topics.includes('docs'))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(mapRepo)
        writeCache(mapped)
        setProjects(mapped)
      })
      .catch(() => {
        // Fetch failed (rate-limited, offline, etc.) — fall back to last good data
        const cached = readCache()
        if (cached) setProjects(cached)
      })
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading }
}
