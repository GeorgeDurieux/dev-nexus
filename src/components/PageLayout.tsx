import AnimatedBackground from "./AnimatedBackground";
import FloatingProfile from "./FloatingProfile";

type Props = {
	children: React.ReactNode;
};

export default function PageLayout({ children }: Props) {
	return (
		<>
			<AnimatedBackground />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					maxWidth: "600px",
					margin: "0 auto",
					padding: "20px",
				}}
			>
				<FloatingProfile />

				{children}
			</div>
		</>
	);
}
