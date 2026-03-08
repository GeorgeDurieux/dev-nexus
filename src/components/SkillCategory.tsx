import type { SkillCategory as SkillCategoryType } from "../types/skills";
import SkillCard from "./SkillCard";
import "../styles/skills.css";

interface Props {
	category: SkillCategoryType;
}

export default function SkillCategory({ category }: Props) {
	return (
		<section className="skills-category-section">
			<h2 className="skills-category-title">{category.title}</h2>

			<div className="skills-grid">
				{category.skills.map((skill) => (
					<SkillCard
						key={skill.name}
						skill={skill}
					/>
				))}
			</div>
		</section>
	);
}
