import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import "../styles/profile.css";

export default function FloatingProfile() {
	return (
		<div className="floating-profile">
			<div className="float-x">
				<div className="float-y">
					<div className="float-rotate">
						<Link to="/">
							<img
								src={profile.image}
								alt="profile"
								className="profile-image"
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
