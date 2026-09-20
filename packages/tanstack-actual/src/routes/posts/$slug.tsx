import { Await, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

const PendingComponent = () => {
  return <div>Loading...</div>;
};

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ params }) => {
    // With other data collection...
    const module = await import(`../../posts/${params.slug}.mdx`);
    return { ...module.frontmatter /* ... other data */ };
  },
  component: RouteComponent,
  pendingComponent: PendingComponent,
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  const params = Route.useParams();

  const modulePromise = useMemo(
    () => import(`../../posts/${params.slug}.mdx`),
    [params.slug],
  );

  return (
    <>
      <h1>{loaderData.title}</h1>
      <p>{loaderData.date}</p>
      <Await promise={modulePromise} fallback={<PendingComponent />}>
        {({ default: Content }) => <Content />}
      </Await>
    </>
  );
}
