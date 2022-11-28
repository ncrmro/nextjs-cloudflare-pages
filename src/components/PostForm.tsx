import React from "react";
import { MakeOptional } from "~/graphql-types";

interface PostFormState {
  title: string;
  slug?: string;
  content: string;
}
function fieldReducer(
  state: PostFormState,
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

export function usePostFormState(
  initialState?: MakeOptional<PostFormState, "title" | "content">
) {
  return React.useReducer(fieldReducer, {
    title: initialState?.title || "Man Lands on Moon",
    slug: initialState?.slug || undefined,
    content: initialState?.content || "# test\nbla bla\n ## test boy",
  });
}
export default function PostForm({
  state,
  setState,
}: {
  state: PostFormState;
  setState: React.Dispatch<
    React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  >;
}) {
  return (
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
  );
}
