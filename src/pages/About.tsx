import PageLayout from "../components/PageLayout";
import PageTitle from "../components/PageTitle";

import { about } from "../data/about";

import TimelineSection from "../components/TimelineSection";
import EducationSection from "../components/EducationSection";
import PhilosophySection from "../components/PhilosophySection";
import LearningSection from "../components/LearningSection";
import InterestsSection from "../components/InterestsSection";

import "../styles/about.css";

export default function About() {
	return (
		<PageLayout>
			<div className="about-page">
				<PageTitle title="About me" />

				<section className="about-bio">
					{about.bio.map((paragraph, index) => (
						<p
							key={index}
							className="about-bio-text"
						>
							{paragraph}
						</p>
					))}
				</section>

				<TimelineSection />
				<EducationSection />
				<PhilosophySection />
				<LearningSection />
				<InterestsSection />
			</div>
		</PageLayout>
	);
}
