import "../styles/background.css";

export default function AnimatedBackground() {
	return (
		<div className="animated-background" aria-hidden="true">
			<div className="bg-orb bg-orb--1" />
			<div className="bg-orb bg-orb--2" />
			<div className="bg-orb bg-orb--3" />
		</div>
	);
}
