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
		description: 'broke things open to see how they worked'
	},
	{
		company: 'safekids.ai',
		role: 'Software Engineering Intern',
		period: 'May 2023 - Aug 2023',
		description: 'backend + MITM proxy at a child safety startup'
	}
];
