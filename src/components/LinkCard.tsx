import { Link } from "react-router-dom";
import "../styles/links.css";

type Props = {
	title: string;
	path: string;
};

export default function LinkCard({ title, path }: Props) {
	return (
		<Link
			to={path}
			className="link-card"
		>
			{title}
		</Link>
	);
}
