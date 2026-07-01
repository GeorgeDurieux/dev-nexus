import PageTitle from "./PageTitle";
import { about } from "../data/about";
import "../styles/interests.css";

export default function InterestsSection() {
	return (
		<section className="about-section interests-section">
			<PageTitle title="Outside of Coding" number="08" />

			<div className="interests-list">
				{about.interests.map((item, index) => (
					<div
						key={index}
						className="interest-panel"
					>
						<div className="interest-visual">
							<span className="interest-visual-label">
								{item.title}
							</span>
						</div>

						<div className="interest-content">
							<h3 className="interest-title">{item.title}</h3>
							<p className="interest-description">
								{item.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
