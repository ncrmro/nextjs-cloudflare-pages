import React from "react";
import { useRouter } from "next/router";

function fieldReducer(
  state: Record<string, string | undefined>,
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

export default function PostCreate() {
  const router = useRouter();
  const params = new URLSearchParams(Object(router.query));
  const isPreview = params.get("preview");

  const [state, setState] = React.useReducer(fieldReducer, {
    title: "",
    slug: undefined,
    content: "",
  });
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
    <div className="flex-col gap-4">
      <div className="flex-col">
        <h1>Create Post</h1>
        <div>
          <button onClick={togglePreview}>Preview</button>
        </div>
      </div>
      {isPreview ? (
        <></>
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
            onChange={setState}
          />
          <textarea
            placeholder="Content"
            rows={8}
            name="content"
            onChange={setState}
          />
        </form>
      )}
    </div>
  );
}
