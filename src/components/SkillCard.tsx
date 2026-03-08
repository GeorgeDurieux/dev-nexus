import type { Skill } from "../types/skills";
import "../styles/skills.css";

interface Props {
	skill: Skill;
}

export default function SkillCard({ skill }: Props) {
	const hardcodedIcons: Record<string, string> = {
		minio: "/icons/minio.png",
		celery: "/icons/celery.png",
		async: "/icons/async.png",
		axios: "/icons/axios.svg",
		junit: "/icons/junit.svg",
	};

	const skillKey = skill.icon.toLowerCase();

	const src =
		hardcodedIcons[skillKey] ??
		`https://skillicons.dev/icons?i=${skillKey}`;

	return (
		<div className="skills-card">
			<img
				className="skills-card-icon"
				src={src}
				alt={skill.name}
			/>
			<span className="skills-card-name">{skill.name}</span>
		</div>
	);
}
