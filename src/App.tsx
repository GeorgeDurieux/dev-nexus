import { useEffect } from "react";

import AnimatedBackground from "./components/AnimatedBackground";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import Footer from "./components/Footer";

import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import TimelineSection from "./components/TimelineSection";
import EducationSection from "./components/EducationSection";
import LearningSection from "./components/LearningSection";
import PhilosophySection from "./components/PhilosophySection";
import InterestsSection from "./components/InterestsSection";

import "./styles/layout.css";

export default function App() {
	useEffect(() => {
		// Page load fade-in
		document.body.style.transition = "opacity 0.55s ease";
		document.body.style.opacity = "1";

		// Scroll-triggered reveal — CSS sets opacity:0 before JS runs,
		// so the painted state is guaranteed when the observer fires
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("reveal-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.08 },
		);

		document
			.querySelectorAll(".main-section")
			.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<ScrollProgress />
			<AnimatedBackground />
			<CursorGlow />
			<MobileNav />
			<div className="layout">
				<Sidebar />
				<main className="main-content">
					<div id="bio"        className="main-section"><About /></div>
					<div id="journey"    className="main-section"><TimelineSection /></div>
					<div id="education"  className="main-section"><EducationSection /></div>
					<div id="skills"     className="main-section"><Skills /></div>
					<div id="learning"   className="main-section"><LearningSection /></div>
					<div id="projects"   className="main-section"><Projects /></div>
					<div id="philosophy" className="main-section"><PhilosophySection /></div>
					<div id="interests"  className="main-section"><InterestsSection /></div>
					<div id="contact"    className="main-section"><Contact /></div>
					<Footer />
				</main>
			</div>
		</>
	);
}
