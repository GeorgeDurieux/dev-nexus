import { useEffect, useRef } from "react";
import "../styles/background.css";

type Point = {
	x: number;
	y: number;
};

type Segment = {
	from: Point;
	to: Point;
	pulseOffset: number;
	pulseSpeed: number;
	pulseLength: number;
	thickness: number;
	axis: "x" | "y";
	isPrimary: boolean;
};

type Junction = {
	x: number;
	y: number;
	isCorner: boolean;
};

export default function AnimatedBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvasRefValue = canvasRef.current;
		if (!canvasRefValue) return;

		const contextValue = canvasRefValue.getContext("2d");
		if (!contextValue) return;

		const canvas: HTMLCanvasElement = canvasRefValue;
		const ctx: CanvasRenderingContext2D = contextValue;

		let animationFrameId = 0;
		let width = 0;
		let height = 0;
		let segments: Segment[] = [];
		let junctions: Junction[] = [];

		function randomBetween(min: number, max: number) {
			return Math.random() * (max - min) + min;
		}

		function randomInt(min: number, max: number) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function snap(value: number, step: number) {
			return Math.round(value / step) * step;
		}

		function crisp(value: number) {
			return Math.round(value) + 0.5;
		}

		function normalizePoint(point: Point): Point {
			return {
				x: crisp(point.x),
				y: crisp(point.y),
			};
		}

		function clampPoint(point: Point, margin: number): Point {
			return {
				x: Math.max(margin, Math.min(width - margin, point.x)),
				y: Math.max(margin, Math.min(height - margin, point.y)),
			};
		}

		function addSegment(
			from: Point,
			to: Point,
			thickness = 1.2,
			isPrimary = false,
		) {
			const a = normalizePoint(from);
			const b = normalizePoint(to);

			if (a.x === b.x && a.y === b.y) return;
			if (a.x !== b.x && a.y !== b.y) return;

			segments.push({
				from: a,
				to: b,
				pulseOffset: Math.random(),
				pulseSpeed: randomBetween(0.8, 2.1),
				pulseLength: randomBetween(0.08, 0.18),
				thickness,
				axis: a.y === b.y ? "x" : "y",
				isPrimary,
			});
		}

		function addOrthogonalPath(
			points: Point[],
			thickness = 1.2,
			isPrimary = false,
		) {
			const normalized = points.map(normalizePoint);

			for (let i = 0; i < normalized.length; i++) {
				const prev = normalized[i - 1];
				const curr = normalized[i];
				const next = normalized[i + 1];

				const isCorner =
					!!prev &&
					!!next &&
					(prev.x === curr.x || prev.y === curr.y) &&
					(next.x === curr.x || next.y === curr.y) &&
					!(prev.x === next.x || prev.y === next.y);

				junctions.push({
					x: curr.x,
					y: curr.y,
					isCorner,
				});
			}

			for (let i = 0; i < normalized.length - 1; i++) {
				addSegment(
					normalized[i],
					normalized[i + 1],
					thickness,
					isPrimary,
				);
			}
		}

		function randomPointOnGrid(grid: number, margin: number): Point {
			return {
				x: snap(randomBetween(margin, width - margin), grid),
				y: snap(randomBetween(margin, height - margin), grid),
			};
		}

		function createRandomTrace(
			start: Point,
			grid: number,
			margin: number,
			steps: number,
			preferredAxis?: "x" | "y",
		) {
			const points: Point[] = [start];
			let current = { ...start };
			let axis: "x" | "y" =
				preferredAxis ?? (Math.random() > 0.5 ? "x" : "y");

			for (let i = 0; i < steps; i++) {
				if (axis === "x") {
					const delta =
						randomInt(1, 4) * grid * (Math.random() > 0.5 ? 1 : -1);
					const next = clampPoint(
						{
							x: snap(current.x + delta, grid),
							y: current.y,
						},
						margin,
					);

					if (next.x !== current.x) {
						current = next;
						points.push(current);
					}
				} else {
					const delta =
						randomInt(1, 4) * grid * (Math.random() > 0.5 ? 1 : -1);
					const next = clampPoint(
						{
							x: current.x,
							y: snap(current.y + delta, grid),
						},
						margin,
					);

					if (next.y !== current.y) {
						current = next;
						points.push(current);
					}
				}

				if (Math.random() > 0.22) {
					axis = axis === "x" ? "y" : "x";
				}
			}

			return points;
		}

		function maybeAttachToExistingTrace(
			trace: Point[],
			grid: number,
			margin: number,
		) {
			if (segments.length === 0 || Math.random() > 0.45) return trace;

			const randomSegment =
				segments[Math.floor(Math.random() * segments.length)];
			if (!randomSegment) return trace;

			const attachPoint =
				randomSegment.axis === "x"
					? {
							x: snap(
								randomBetween(
									Math.min(
										randomSegment.from.x,
										randomSegment.to.x,
									),
									Math.max(
										randomSegment.from.x,
										randomSegment.to.x,
									),
								),
								grid,
							),
							y: randomSegment.from.y,
						}
					: {
							x: randomSegment.from.x,
							y: snap(
								randomBetween(
									Math.min(
										randomSegment.from.y,
										randomSegment.to.y,
									),
									Math.max(
										randomSegment.from.y,
										randomSegment.to.y,
									),
								),
								grid,
							),
						};

			const clampedAttach = clampPoint(attachPoint, margin);
			trace[0] = clampedAttach;
			return trace;
		}

		function buildScene() {
			segments = [];
			junctions = [];

			const grid = width < 768 ? 64 : 84;
			const margin = 24;

			const primaryTraceCount = width < 768 ? 8 : 14;
			const secondaryTraceCount = width < 768 ? 18 : 34;
			const shortTraceCount = width < 768 ? 10 : 20;

			// Stronger partial traces
			for (let i = 0; i < primaryTraceCount; i++) {
				const start = randomPointOnGrid(grid, margin);
				const steps = randomInt(4, 8);
				let trace = createRandomTrace(start, grid, margin, steps);
				trace = maybeAttachToExistingTrace(trace, grid, margin);
				addOrthogonalPath(trace, Math.random() > 0.5 ? 1.7 : 1.5, true);
			}

			// Medium traces
			for (let i = 0; i < secondaryTraceCount; i++) {
				const start = randomPointOnGrid(grid, margin);
				const steps = randomInt(3, 6);
				let trace = createRandomTrace(start, grid, margin, steps);
				trace = maybeAttachToExistingTrace(trace, grid, margin);
				addOrthogonalPath(
					trace,
					Math.random() > 0.5 ? 1.05 : 0.9,
					false,
				);
			}

			// Small fragments
			for (let i = 0; i < shortTraceCount; i++) {
				const start = randomPointOnGrid(grid, margin);
				const steps = randomInt(2, 3);
				let trace = createRandomTrace(start, grid, margin, steps);
				trace = maybeAttachToExistingTrace(trace, grid, margin);
				addOrthogonalPath(trace, 0.75, false);
			}
		}

		function resizeCanvas() {
			width = window.innerWidth;
			height = window.innerHeight;

			const dpr = window.devicePixelRatio || 1;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			buildScene();
		}

		function drawBackground() {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, width, height);
		}

		function drawBaseCircuit() {
			for (const segment of segments) {
				ctx.beginPath();
				ctx.moveTo(segment.from.x, segment.from.y);
				ctx.lineTo(segment.to.x, segment.to.y);
				ctx.strokeStyle = segment.isPrimary
					? "rgba(245, 248, 255, 0.48)"
					: "rgba(245, 248, 255, 0.24)";
				ctx.lineWidth = segment.thickness;
				ctx.lineCap = "butt";
				ctx.shadowColor = segment.isPrimary
					? "rgba(255, 255, 255, 0.14)"
					: "rgba(255, 255, 255, 0.08)";
				ctx.shadowBlur = segment.isPrimary ? 6 : 3;
				ctx.stroke();
			}
		}

		function drawJunctions(time: number) {
			const seen = new Set<string>();

			for (let i = 0; i < junctions.length; i++) {
				const junction = junctions[i];
				const key = `${junction.x}-${junction.y}`;
				if (seen.has(key)) continue;
				seen.add(key);

				ctx.fillStyle = "rgba(245, 248, 255, 0.16)";
				ctx.shadowColor = "rgba(255, 255, 255, 0.08)";
				ctx.shadowBlur = 2;
				ctx.fillRect(junction.x - 1.5, junction.y - 1.5, 3, 3);

				if (junction.isCorner) {
					const pulse = 0.45 + 0.35 * Math.sin(time * 0.0012 + i);

					ctx.strokeStyle = `rgba(255,255,255,${0.04 + pulse * 0.08})`;
					ctx.lineWidth = 1;
					ctx.shadowColor = "rgba(255,255,255,0.08)";
					ctx.shadowBlur = 3;
					ctx.strokeRect(junction.x - 3, junction.y - 3, 6, 6);
				}
			}
		}

		function drawCurrentStreaks(time: number) {
			for (const segment of segments) {
				const {
					from,
					to,
					pulseOffset,
					pulseSpeed,
					pulseLength,
					axis,
					isPrimary,
				} = segment;

				const total =
					axis === "x"
						? Math.abs(to.x - from.x)
						: Math.abs(to.y - from.y);

				const direction =
					axis === "x"
						? Math.sign(to.x - from.x)
						: Math.sign(to.y - from.y);

				const t = (time * 0.00018 * pulseSpeed + pulseOffset) % 1;
				const head = total * t;
				const tail = Math.max(0, head - total * pulseLength);

				const slices = isPrimary ? 7 : 5;

				for (let i = 0; i < slices; i++) {
					const localStart = tail + ((head - tail) * i) / slices;
					const localEnd = tail + ((head - tail) * (i + 1)) / slices;
					const alpha = (i + 1) / slices;

					let x1 = from.x;
					let y1 = from.y;
					let x2 = from.x;
					let y2 = from.y;

					if (axis === "x") {
						x1 = from.x + localStart * direction;
						x2 = from.x + localEnd * direction;
					} else {
						y1 = from.y + localStart * direction;
						y2 = from.y + localEnd * direction;
					}

					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.strokeStyle = `rgba(255,255,255,${0.1 + alpha * (isPrimary ? 0.75 : 0.55)})`;
					ctx.lineWidth = isPrimary
						? 1.4 + alpha * 0.8
						: 0.9 + alpha * 0.5;
					ctx.lineCap = "butt";
					ctx.shadowColor = "rgba(255,255,255,0.5)";
					ctx.shadowBlur = isPrimary ? 10 : 6;
					ctx.stroke();
				}
			}
		}

		function drawElectricalFlashes(time: number) {
			const wave = (Math.sin(time * 0.00125) + 1) / 2;
			if (wave < 0.88) return;

			for (let i = 0; i < segments.length; i += 5) {
				const segment = segments[i];
				if (!segment || !segment.isPrimary) continue;

				ctx.beginPath();
				ctx.moveTo(segment.from.x, segment.from.y);
				ctx.lineTo(segment.to.x, segment.to.y);
				ctx.strokeStyle = `rgba(255,255,255,${0.08 + (wave - 0.88) * 3.2})`;
				ctx.lineWidth = segment.thickness + 0.35;
				ctx.lineCap = "butt";
				ctx.shadowColor = "rgba(255,255,255,0.3)";
				ctx.shadowBlur = 10;
				ctx.stroke();
			}
		}

		function render(time: number) {
			drawBackground();
			drawBaseCircuit();
			drawJunctions(time);
			drawCurrentStreaks(time);
			drawElectricalFlashes(time);

			animationFrameId = window.requestAnimationFrame(render);
		}

		resizeCanvas();
		animationFrameId = window.requestAnimationFrame(render);
		window.addEventListener("resize", resizeCanvas);

		return () => {
			window.cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	return (
		<div
			className="animated-background"
			aria-hidden="true"
		>
			<canvas
				ref={canvasRef}
				className="animated-background-canvas"
			/>
		</div>
	);
}
