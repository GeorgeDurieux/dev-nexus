export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  fork: boolean
  archived: boolean
  updated_at: string
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  )

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
  }

  const data: GitHubRepo[] = await response.json()

  return data
    .filter((repo) => !repo.fork)
    .filter((repo) => !repo.archived)
    .sort((a, b) =>
      new Date(b.updated_at).getTime() -
      new Date(a.updated_at).getTime()
    )
}
