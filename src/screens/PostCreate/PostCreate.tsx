import React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

function fieldReducer(
  state: { title: string; slug?: string; content: string },
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const { name, value } = event.target;
  switch (name) {
    case "title":
    case "slug":
    case "content":
      state[name] = value;
      break;
    default:
      throw new Error("Field was not expected");
  }
  return structuredClone(state);
}

function PostPreview(props: { text: string }) {
  return <ReactMarkdown>{props.text}</ReactMarkdown>;
}

export default function PostCreate() {
  const router = useRouter();
  const params = new URLSearchParams(Object(router.query));
  const isPreview = params.get("preview");

  const [state, setState] = React.useReducer(fieldReducer, {
    title: "Man Lands on Moon",
    slug: undefined,
    content: "# test\nbla bla\n ## test boy",
  });
  console.log(state);

  const togglePreview = async () => {
    let url = router.pathname;
    if (params.get("preview")) {
      params.delete("preview");
    } else {
      params.set("preview", "true");
      url = `${url}?${params.toString()}`;
    }
    await router.push(url);
  };
  return (
    <div className="flex-col gap-4 p-4">
      <div className="flex-col">
        <h1>Create Post</h1>
        <div>
          <button onClick={togglePreview}>Preview</button>
        </div>
      </div>
      {isPreview ? (
        <div className="surface">
          <PostPreview text={state.content} />
        </div>
      ) : (
        <form className="flex-col">
          <input
            placeholder="Title"
            type="text"
            name="title"
            value={state.title}
            onChange={setState}
          />
          <input
            placeholder="Slug"
            type="text"
            name="slug"
            value={state.slug}
            onChange={setState}
          />
          <textarea
            placeholder="Content"
            rows={8}
            name="content"
            value={state.content}
            onChange={setState}
          />
        </form>
      )}
    </div>
  );
}
