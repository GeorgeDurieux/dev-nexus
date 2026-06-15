import { useEffect, useState } from "react";

import PageTitle from "../components/PageTitle";
import RepoCard from "../components/RepoCard";

import { fetchRepos } from "../services/github";
import type { GitHubRepo } from "../services/github";
import { repoName } from "../data/repoName";

import "../styles/projects.css";

const INITIAL_COUNT = 3;

export default function Projects() {
	const [repos, setRepos] = useState<GitHubRepo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [expanded, setExpanded] = useState(false);

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

	const visible = expanded ? repos : repos.slice(0, INITIAL_COUNT);

	return (
		<>
			<PageTitle title="Projects" />

			{loading && <p className="projects-status">Loading projects...</p>}
			{error && <p className="projects-status projects-error">{error}</p>}
			{!loading && !error && repos.length === 0 && (
				<p className="projects-status">No projects found.</p>
			)}

			<div className="repo-container">
				{visible.map((repo) => (
					<RepoCard
						key={repo.id}
						name={repo.name}
						description={repo.description}
						language={repo.language}
						url={repo.html_url}
					/>
				))}
			</div>

			{!loading && !error && repos.length > INITIAL_COUNT && (
				<button
					className="projects-show-more"
					onClick={() => setExpanded((prev) => !prev)}
				>
					{expanded ? "Show less" : `Show more (${repos.length - INITIAL_COUNT} more)`}
				</button>
			)}
		</>
	);
}
