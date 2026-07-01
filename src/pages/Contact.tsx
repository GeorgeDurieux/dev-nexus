import PageTitle from "../components/PageTitle";
import SocialCard from "../components/SocialCard";
import { socials } from "../data/socials";

export default function Contact() {
	return (
		<>
			<PageTitle title="Contact" number="09" />

			<p className="contact-tagline">
				Always open to a good conversation — reach out through any of these.
			</p>

			<div className="social-grid">
				{socials.map((social) => (
					<SocialCard
						key={social.name}
						name={social.name}
						url={social.url}
					/>
				))}
			</div>
		</>
	);
}
