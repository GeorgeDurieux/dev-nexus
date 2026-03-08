import PageLayout from "../components/PageLayout";
import { profile } from "../data/profile";
import { links } from "../data/links";
import LinkCard from "../components/LinkCard";
import "../styles/home.css";
import PageTitle from "../components/PageTitle";

export default function Home() {
	return (
		<PageLayout>
			<div className="home">
				<PageTitle title={profile.name} />
				<h2 className="home-subtitle">{profile.title}</h2>

				<div className="links-container">
					{links.map((link) => (
						<LinkCard
							key={link.path}
							title={link.title}
							path={link.path}
						/>
					))}
				</div>
			</div>
		</PageLayout>
	);
}
