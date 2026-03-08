import "../styles/social.css";

type Props = {
	name: string;
	url: string;
};

export default function SocialCard({ name, url }: Props) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="social-card"
		>
			{name}
		</a>
	);
}
