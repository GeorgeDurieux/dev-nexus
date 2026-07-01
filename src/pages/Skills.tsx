import { skillCategories } from "../data/skills";
import SkillCategory from "../components/SkillCategory";
import PageTitle from "../components/PageTitle";
import "../styles/skills.css";

export default function Skills() {
	return (
		<>
			<PageTitle title="Skills" number="04" />

			<div className="skills-categories">
				{skillCategories.map((category) => (
					<SkillCategory
						key={category.title}
						category={category}
					/>
				))}
			</div>
		</>
	);
}
