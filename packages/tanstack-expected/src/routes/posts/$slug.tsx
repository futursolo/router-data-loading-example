import { createFileRoute } from "@tanstack/react-router";

const PendingComponent = () => {
  return <div>Loading...</div>;
};

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ params }) => {
    // With other data collection...
    const module = await import(`../../posts/${params.slug}.mdx`);
    return {
      ...module.frontmatter,
      Content: module.default /* ... other data */,
    };
  },
  component: RouteComponent,
  pendingComponent: PendingComponent,
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();

  const { Content } = loaderData;

  return (
    <>
      <h1>{loaderData.title}</h1>
      <p>{loaderData.date}</p>
      <Content />
    </>
  );
}
