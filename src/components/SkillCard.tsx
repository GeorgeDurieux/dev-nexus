import type { Skill } from "../types/skills";
import "../styles/skills.css";

interface Props {
	skill: Skill;
}

export default function SkillCard({ skill }: Props) {
	const hardcodedIcons: Record<string, string> = {
		minio: "/dev-nexus/icons/minio.png",
		celery: "/dev-nexus/icons/celery.png",
		async: "/dev-nexus/icons/async.png",
		axios: "/dev-nexus/icons/axios.svg",
		junit: "/dev-nexus/icons/junit.svg",
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
