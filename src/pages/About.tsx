import PageTitle from "../components/PageTitle";
import { about } from "../data/about";
import "../styles/about.css";

export default function About() {
	return (
		<>
			<PageTitle title="Bio" />

			<section className="about-bio">
				{about.bio.map((paragraph, index) => (
					<p key={index} className="about-bio-text">
						{paragraph}
					</p>
				))}
			</section>
		</>
	);
}
