import PageTitle from "./PageTitle";
import { about } from "../data/about";
import SkillCard from "./SkillCard";

import "../styles/skills.css";

export default function LearningSection() {
	return (
		<section className="about-section">
			<PageTitle title="Currently Learning" number="05" />

			<div className="skills-grid">
				{about.learning.map((skill) => (
					<SkillCard
						key={skill.name}
						skill={skill}
					/>
				))}
			</div>
		</section>
	);
}
