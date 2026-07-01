import "../styles/footer.css";
import { profile } from "../data/profile";
import { socials } from "../data/socials";

export default function Footer() {
	const year = new Date().getFullYear();
	const links = socials.filter((s) => s.name !== "Email");

	return (
		<footer className="site-footer">
			<span className="footer-copy">
				© {year} {profile.name}
			</span>
			<div className="footer-links">
				{links.map((s) => (
					<a
						key={s.name}
						href={s.url}
						target="_blank"
						rel="noopener noreferrer"
						className="footer-link"
					>
						{s.name}
					</a>
				))}
			</div>
		</footer>
	);
}
