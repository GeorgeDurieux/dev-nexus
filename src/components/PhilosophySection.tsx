import { about } from "../data/about";
import "../styles/philosophy.css";

export default function PhilosophySection() {
	return (
		<section className="about-section philosophy-section">
			<h2 className="about-section-title">Tech Philosophy</h2>

			<div className="philosophy-list">
				{about.philosophy.map((item, index) => (
					<div
						key={index}
						className="philosophy-card"
					>
						<h3 className="philosophy-card-title">{item.title}</h3>
						<p className="philosophy-card-text">
							{item.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
