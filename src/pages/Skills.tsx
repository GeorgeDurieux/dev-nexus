import { skillCategories } from "../data/skills";
import SkillCategory from "../components/SkillCategory";
import PageLayout from "../components/PageLayout";
import "../styles/skills.css";
import PageTitle from "../components/PageTitle";

export default function Skills() {
	return (
		<PageLayout>
			<div className="skills-page">
				<PageTitle title="Skills" />

				<div className="skills-categories">
					{skillCategories.map((category) => (
						<SkillCategory
							key={category.title}
							category={category}
						/>
					))}
				</div>
			</div>
		</PageLayout>
	);
}
