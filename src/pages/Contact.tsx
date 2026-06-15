import PageTitle from "../components/PageTitle";
import SocialCard from "../components/SocialCard";
import { socials } from "../data/socials";

export default function Contact() {
	return (
		<>
			<PageTitle title="Contact" />

			{socials.map((social) => (
				<SocialCard
					key={social.name}
					name={social.name}
					url={social.url}
				/>
			))}
		</>
	);
}
