import { about } from "../data/about";
import SkillCard from "./SkillCard";

import "../styles/skills.css";

export default function LearningSection() {
	return (
		<section className="about-section">
			<h2 className="about-section-title">Currently Learning</h2>

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
