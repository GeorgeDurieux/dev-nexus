import { useState } from "react";
import { about } from "../data/about";
import CertificateModal from "./CertificateModal";
import "../styles/education.css";

export default function EducationSection() {
	const [activeCertificate, setActiveCertificate] = useState<string | null>(
		null,
	);

	return (
		<section className="about-section education-section">
			<h2 className="about-section-title">Education & Certifications</h2>

			<div className="education-grid">
				{about.education.map((item, index) => (
					<div
						key={index}
						className="education-card"
					>
						<h3 className="education-card-title">{item.title}</h3>
						<p className="education-card-text">
							{item.institution}
						</p>
						<span className="education-card-meta">{item.year}</span>
					</div>
				))}

				{about.certificates.map((cert, index) => (
					<div
						key={index}
						className="education-card education-card--certificate"
					>
						<h3 className="education-card-title">{cert.title}</h3>
						<p className="education-card-text">{cert.issuer}</p>
						<span className="education-card-meta">{cert.year}</span>

						<button
							className="education-card-button"
							onClick={() => setActiveCertificate(cert.file)}
						>
							View Certificate
						</button>
					</div>
				))}
			</div>

			{activeCertificate && (
				<CertificateModal
					file={activeCertificate}
					onClose={() => setActiveCertificate(null)}
				/>
			)}
		</section>
	);
}
