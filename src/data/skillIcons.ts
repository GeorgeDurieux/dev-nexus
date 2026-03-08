import type { IconType } from "react-icons";

import { FaJava, FaGit } from "react-icons/fa";

import {
	SiTypescript,
	SiReact,
	SiHtml5,
	SiCss,
	SiNodedotjs,
	SiExpress,
	SiPostgresql,
	SiMysql,
	SiRedis,
	SiRabbitmq,
	SiDocker,
} from "react-icons/si";

export const skillIcons: Record<string, IconType> = {
	Java: FaJava,
	TypeScript: SiTypescript,
	React: SiReact,
	HTML: SiHtml5,
	CSS: SiCss,
	"Node.js": SiNodedotjs,
	Express: SiExpress,
	PostgreSQL: SiPostgresql,
	MySQL: SiMysql,
	Redis: SiRedis,
	RabbitMQ: SiRabbitmq,
	Docker: SiDocker,
	Git: FaGit,
};
