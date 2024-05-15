export interface Result {
  status: "ok" | "failure";
}

export interface Props {
  text: string;
}

export default async function sendPost(
  props: Props,
  _req: unknown,
  _ctx: unknown,
): Promise<Result> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      props,
    }),
  });

  if (response.ok) {
    return { status: "ok" };
  }
  return { status: "failure" };
}
