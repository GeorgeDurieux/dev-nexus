import type { SkillCategory } from "../types/skills";

export const skillCategories: SkillCategory[] = [
	{
		title: "Languages",
		skills: [
			{ name: "Java", icon: "java" },
			{ name: "Python", icon: "python" },
			{ name: "JavaScript", icon: "javascript" },
			{ name: "TypeScript", icon: "typescript" },
			{ name: "HTML", icon: "html" },
			{ name: "CSS", icon: "css" },
			{ name: "Bash", icon: "bash" },
		],
	},

	{
		title: "Java Ecosystem",
		skills: [
			{ name: "Spring", icon: "spring" },
			{ name: "Spring Boot", icon: "spring" },
			{ name: "Hibernate", icon: "hibernate" },
			{ name: "Maven", icon: "maven" },
			{ name: "Gradle", icon: "gradle" },
			{ name: "JUnit", icon: "junit" },
		],
	},

	{
		title: "Frontend",
		skills: [
			{ name: "React", icon: "react" },
			{ name: "Redux", icon: "redux" },
			{ name: "Axios", icon: "axios" },
			{ name: "Angular", icon: "angular" },
			{ name: "Tailwind", icon: "tailwind" },
			{ name: "Bootstrap", icon: "bootstrap" },
			{ name: "jQuery", icon: "jquery" },
		],
	},

	{
		title: "Backend",
		skills: [
			{ name: "Node.js", icon: "nodejs" },
			{ name: "Express", icon: "express" },
			{ name: "Django", icon: "django" },
		],
	},

	{
		title: "Databases",
		skills: [
			{ name: "PostgreSQL", icon: "postgres" },
			{ name: "MySQL", icon: "mysql" },
			{ name: "MongoDB", icon: "mongodb" },
		],
	},

	{
		title: "DevOps / Infrastructure",
		skills: [{ name: "Docker", icon: "docker" }],
	},

	{
		title: "Tools",
		skills: [
			{ name: "Git", icon: "git" },
			{ name: "GitHub", icon: "github" },
			{ name: "Postman", icon: "postman" },
			{ name: "VSCode", icon: "vscode" },
			{ name: "Linux", icon: "linux" },
			{ name: "Vite", icon: "vite" },
			{ name: "NPM", icon: "npm" },
		],
	},

	{
		title: "Testing",
		skills: [{ name: "Jest", icon: "jest" }],
	},
];
