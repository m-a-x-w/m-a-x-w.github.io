export interface Project {
	slug: string;
	title: string;
	description: string;
	details?: string;
	stack?: string[];
	url?: string;
	repo?: string;
}

export const projects: Project[] = [
	{
		slug: 'predictionedge',
		title: 'PredictionEdge',
		description: 'Low-latency prediction market arbitrage system.',
		stack: ['Go', 'HTML/CSS']
	},
	{
		slug: 'partipix',
		title: 'PartiPix',
		description: 'Photo sharing platform with facial recognition.',
		details:
			'Supports 10,000+ images per event with a Python-based facial recognition pipeline (OpenCV + CNN) for automatic tagging and categorization. Achieved ~93% accuracy on face recognition.',
		stack: ['Go', 'Python', 'HTML/CSS'],
		repo: 'https://github.com/m-a-x-w/partipix'
	},
	{
		slug: 'wetrade',
		title: 'WeTrade',
		description: 'Autonomous stock trading bot with sentiment analysis.',
		stack: ['Go', 'Python', 'React.js'],
		repo: 'https://github.com/m-a-x-w/wetrade'
	},
	{
		slug: 'auditory-insights',
		title: 'Auditory-InSights',
		description: 'AR glasses that visualize audio cues for deaf users.',
		details:
			'Augmented reality glasses that visualize audio cues like fire alarms and sirens for deaf users. Lightweight wearable with a directional microphone array, custom PCB, and transparent OLED display achieving sub-100ms latency.',
		stack: ['Python', 'Hardware Integration'],
		repo: 'https://github.com/m-a-x-w/auditory-insights'
	},
	{
		slug: 'wecode',
		title: 'WeCode',
		description: 'AI-powered educational platform for learning to code.',
		details:
			'Personalized programming lessons to student interests with interactive coding exercises, real-time feedback, and progress tracking.',
		stack: ['Go', 'Python', 'HTML/CSS']
	},
	{
		slug: 'dining',
		title: 'Dining WASM Demo',
		description: 'WebAssembly-powered Purdue dining meal recommender.',
		details: 'Interactive demo for ranking Purdue dining options with a Go WebAssembly runtime.',
		stack: ['Go', 'WebAssembly', 'SvelteKit'],
		url: '/dining',
		repo: 'https://github.com/m-a-x-w/purdue-dining-tracker'
	}
];
