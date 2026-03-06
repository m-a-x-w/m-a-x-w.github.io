export interface WorkEntry {
	company: string;
	role: string;
	period: string;
	description: string;
}

export const work: WorkEntry[] = [
	{
		company: 'Freelance',
		role: 'Reverse Engineering',
		period: 'May 2025 - Aug 2025',
		description:
			'Analyzed web and mobile anti-bot systems, deobfuscated JS with Babel, and used Frida to dynamically inspect Android apps to identify weaknesses and improve detection logic.'
	},
	{
		company: 'safekids.ai',
		role: 'Software Engineering Intern',
		period: 'May 2023 - Aug 2023',
		description:
			'Built and maintained backend services for a child online safety platform, optimized a MITM proxy for real-time traffic analysis, and upgraded dependencies to patch vulnerabilities and improve resilience.'
	}
];
