import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ params }) => {
    const module = await import(`../../posts/${params.slug}.mdx`);
    return { ...module.frontmatter };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/posts/$slug"!</div>;
}
