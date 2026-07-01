import "../styles/page-title.css";

type Props = {
	title: string;
	number?: string;
};

export default function PageTitle({ title, number }: Props) {
	return (
		<div className="page-title-wrap">
			{number && <span className="page-title-number">{number}</span>}
			<h2 className="page-title-text">{title}</h2>
			<div className="page-title-line" />
		</div>
	);
}
