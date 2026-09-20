import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <Link to="/posts/$slug" params={{ slug: "abc" }}>
      Go to Post abc
    </Link>
  );
}
