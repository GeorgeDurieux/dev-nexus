import "../styles/modal.css";

interface Props {
	file: string;
	onClose: () => void;
}

export default function CertificateModal({ file, onClose }: Props) {
	return (
		<div
			className="modal-overlay"
			onClick={onClose}
		>
			<div
				className="modal-content"
				onClick={(e) => e.stopPropagation()}
			>
				<iframe
					src={file}
					title="certificate"
					className="certificate-viewer"
				/>
			</div>
		</div>
	);
}
