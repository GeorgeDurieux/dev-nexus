import { about } from "../data/about";
import "../styles/timeline.css";

export default function TimelineSection() {
	return (
		<section className="about-section timeline-section">
			<h2 className="about-section-title timeline-title">Journey</h2>

			<div className="timeline">
				{about.timeline.map((item, index) => {
					const side = index % 2 === 0 ? "left" : "right";

					return (
						<div
							key={index}
							className={`timeline-item ${side}`}
						>
							<div className="timeline-card">
								<span className="timeline-date">
									{item.date}
								</span>

								<h3 className="timeline-item-title">
									{item.title}
								</h3>

								<p className="timeline-description">
									{item.description}
								</p>

								{item.link && (
									<a
										href={item.link}
										target="_blank"
										rel="noopener noreferrer"
										className="timeline-link"
									>
										View Project
									</a>
								)}
							</div>

							<div className="timeline-dot" />
						</div>
					);
				})}
			</div>
		</section>
	);
}
