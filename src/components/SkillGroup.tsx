import { skillIcons } from "../data/skillIcons";

type Props = {
	title: string;
	skills: string[];
};

export default function SkillGroup({ title, skills }: Props) {
	return (
		<div style={{ width: "100%", marginBottom: "25px" }}>
			<h2>{title}</h2>

			<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
				{skills.map((skill) => {
					const Icon = skillIcons[skill];

					return (
						<span
							key={skill}
							style={{
								display: "flex",
								alignItems: "center",
								gap: "6px",
							}}
						>
							{Icon && <Icon />}
							{skill}
						</span>
					);
				})}
			</div>
		</div>
	);
}
