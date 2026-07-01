import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import "../styles/mobile-nav.css";

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

export default function MobileNav() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState("bio");

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

	// lock body scroll when menu open
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [open]);

	function navigate(id: string) {
		setOpen(false);
		setTimeout(() => {
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		}, 260);
	}

	return (
		<>
			{/* top bar */}
			<header className="mobile-header">
				<div className="mobile-header-identity">
					<img src={profile.image} alt="profile" className="mobile-header-avatar" />
					<span className="mobile-header-name">{profile.name}</span>
				</div>
				<button
					className={`mobile-burger ${open ? "open" : ""}`}
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? "Close menu" : "Open menu"}
				>
					<span />
					<span />
					<span />
				</button>
			</header>

			{/* full-screen overlay */}
			<div className={`mobile-overlay ${open ? "visible" : ""}`} aria-hidden={!open}>
				<div className="mobile-overlay-profile">
					<img src={profile.image} alt="profile" className="mobile-overlay-avatar" />
					<p className="mobile-overlay-name">{profile.name}</p>
					<p className="mobile-overlay-title">{profile.title}</p>
				</div>

				<nav className="mobile-overlay-nav">
					{NAV_ITEMS.map((item) => (
						<button
							key={item.id}
							className={`mobile-nav-link ${active === item.id ? "active" : ""}`}
							onClick={() => navigate(item.id)}
						>
							<span className="mobile-nav-indicator" />
							{item.label}
						</button>
					))}
				</nav>
			</div>
		</>
	);
}
