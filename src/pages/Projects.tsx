import { useEffect, useState } from "react";

import PageLayout from "../components/PageLayout";
import PageTitle from "../components/PageTitle";
import RepoCard from "../components/RepoCard";

import { fetchRepos } from "../services/github";
import type { GitHubRepo } from "../services/github";
import { repoName } from "../data/repoName";

import "../styles/projects.css";

export default function Projects() {
	const [repos, setRepos] = useState<GitHubRepo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadRepos() {
			try {
				const data = await fetchRepos(repoName);
				setRepos(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load projects.");
			} finally {
				setLoading(false);
			}
		}

		loadRepos();
	}, []);

	return (
		<PageLayout>
			<div className="projects-page">
				<PageTitle title="Projects" />

				{loading && <p className="projects-status">Loading projects...</p>}

				{error && <p className="projects-status projects-error">{error}</p>}

				{!loading && !error && repos.length === 0 && (
					<p className="projects-status">No projects found.</p>
				)}

				<div className="repo-container">
					{repos.map((repo) => (
						<RepoCard
							key={repo.id}
							name={repo.name}
							description={repo.description}
							language={repo.language}
							url={repo.html_url}
						/>
					))}
				</div>
			</div>
		</PageLayout>
	);
}
