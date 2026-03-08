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

	useEffect(() => {
		async function loadRepos() {
			const data = await fetchRepos(repoName);
			setRepos(data);
		}

		loadRepos();
	}, []);

	return (
		<PageLayout>
			<div className="projects-page">
				<PageTitle title="Projects" />

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
