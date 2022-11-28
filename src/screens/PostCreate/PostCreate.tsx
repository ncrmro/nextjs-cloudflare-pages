import React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import PostForm, { usePostFormState } from "~/components/PostForm";

function PostPreview(props: { text: string }) {
  return <ReactMarkdown>{props.text}</ReactMarkdown>;
}

export default function PostCreate() {
  const router = useRouter();
  const params = new URLSearchParams(Object(router.query));
  const isPreview = params.get("preview");
  const [state, setState] = usePostFormState();

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
          <button onClick={togglePreview}>
            {isPreview ? "Close Preview" : "Preview"}
          </button>
        </div>
      </div>
      {isPreview ? (
        <div className="surface">
          <PostPreview text={state.content} />
        </div>
      ) : (
        <PostForm state={state} setState={setState} />
      )}
    </div>
  );
}
