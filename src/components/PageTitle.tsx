type Props = {
	title: string;
};

export default function PageTitle({ title }: Props) {
	return (
		<h1
			style={{
				marginTop: "20px",
				marginBottom: "20px",
				textAlign: "center",
			}}
		>
			{title}
		</h1>
	);
}
