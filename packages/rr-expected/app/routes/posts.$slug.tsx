import { use, useMemo } from "react";
import type { Route } from "./+types/posts.$slug";

export const loader = async ({ params }: Route.LoaderArgs) => {
  // With other data collection...
  const module = await import(`../posts/${params.slug}.mdx`);
  return { ...module.frontmatter /* ... other data */ };
};

export const HydrateFallback = () => {
  return <div>Loading...</div>;
};

export default ({ loaderData, params }: Route.ComponentProps) => {
  const modulePromise = useMemo(
    () => import(`../posts/${params.slug}.mdx`),
    [params.slug],
  );

  const { default: Content } = use(modulePromise);

  return (
    <>
      <h1>{loaderData.title}</h1>
      <p>{loaderData.date}</p>
      <Content />
    </>
  );
};
