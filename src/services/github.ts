export type GitHubRepo = {
  id: number
  name: string
  description: string
  html_url: string
  language: string
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {

  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  )

  const data = await response.json()

  return data
    .filter((repo: any) => !repo.fork)
    .filter((repo: any) => !repo.archived)
    .sort((a: any, b: any) =>
      new Date(b.updated_at).getTime() -
      new Date(a.updated_at).getTime()
    )
}