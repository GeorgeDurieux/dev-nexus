import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import "../styles/sidebar.css";

const NAV_ITEMS = [
	{ id: "bio",        label: "Bio"        },
	{ id: "journey",    label: "Journey"    },
	{ id: "education",  label: "Education"  },
	{ id: "skills",     label: "Skills"     },
	{ id: "learning",   label: "Learning"   },
	{ id: "projects",   label: "Projects"   },
	{ id: "philosophy", label: "Philosophy" },
	{ id: "interests",  label: "Interests"  },
	{ id: "contact",    label: "Contact"    },
];

export default function Sidebar() {
	const [active, setActive] = useState("about");

	useEffect(() => {
		function onScroll() {
			const atBottom =
				window.scrollY + window.innerHeight >=
				document.documentElement.scrollHeight - 50;

			if (atBottom) {
				setActive(NAV_ITEMS[NAV_ITEMS.length - 1].id);
				return;
			}

			let current = NAV_ITEMS[0].id;
			const threshold = window.innerHeight * 0.1;

			for (const item of NAV_ITEMS) {
				const el = document.getElementById(item.id);
				if (el && el.getBoundingClientRect().top <= threshold) {
					current = item.id;
				}
			}

			setActive(current);
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	function scrollTo(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<aside className="sidebar">
			<div className="sidebar-profile">
				<img
					src={profile.image}
					alt="profile"
					className="sidebar-avatar"
				/>
				<p className="sidebar-name">{profile.name}</p>
				<p className="sidebar-title">{profile.title}</p>
			</div>

			<div className="sidebar-divider" />

			<nav className="sidebar-nav">
				{NAV_ITEMS.map((item) => (
					<button
						key={item.id}
						className={`sidebar-link ${active === item.id ? "active" : ""}`}
						onClick={() => scrollTo(item.id)}
					>
						<span className="sidebar-link-indicator" />
						{item.label}
					</button>
				))}
			</nav>
		</aside>
	);
}
