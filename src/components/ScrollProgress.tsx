import { useEffect, useState } from "react";
import "../styles/scroll-progress.css";

export default function ScrollProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		function onScroll() {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
			const scrollable = scrollHeight - clientHeight;
			setProgress(scrollable > 0 ? (scrollTop / scrollable) * 100 : 0);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div className="scroll-progress-track" aria-hidden="true">
			<div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
		</div>
	);
}
