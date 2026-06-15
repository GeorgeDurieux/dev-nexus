import AnimatedBackground from "./components/AnimatedBackground";
import Sidebar from "./components/Sidebar";

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
	return (
		<>
			<AnimatedBackground />
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
				</main>
			</div>
		</>
	);
}
