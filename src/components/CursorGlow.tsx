import { useEffect, useRef } from "react";
import "../styles/cursor-glow.css";

export default function CursorGlow() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onMove(e: MouseEvent) {
			if (ref.current) {
				ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
			}
		}
		window.addEventListener("mousemove", onMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
