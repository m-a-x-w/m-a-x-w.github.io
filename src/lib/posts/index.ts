export interface PostMeta {
	title: string;
	date: string;
	description: string;
	slug: string;
}

export async function getPosts(): Promise<PostMeta[]> {
	const modules = import.meta.glob<Record<string, unknown>>('./*.md', { eager: true });

	const posts: PostMeta[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.replace('./', '').replace('.md', '');
		const metadata = module.metadata as Omit<PostMeta, 'slug'>;

		if (metadata?.title && metadata?.date) {
			posts.push({ ...metadata, slug });
		}
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	return posts;
}
