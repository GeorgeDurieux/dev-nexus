type Props = {
	name: string;
	description: string;
	language: string;
	url: string;
};

export default function RepoCard({ name, description, language, url }: Props) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="repo-link"
		>
			<article className="repo-card">
				<h3 className="repo-name">{name}</h3>

				<p className="repo-description">
					{description || "No description provided yet."}
				</p>

				<div className="repo-footer">
					{language && (
						<span className="repo-language-wrapper">
							<span className="repo-language-dot" />
							<span className="repo-language">{language}</span>
						</span>
					)}
				</div>
			</article>
		</a>
	);
}
