import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

export const mdxPlugin = mdx({
	remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
});

export default defineConfig({
	plugins: [mdxPlugin, reactRouter()],
	resolve: {
		tsconfigPaths: true,
	},
});
