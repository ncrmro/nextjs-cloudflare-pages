import { useRouter } from "next/router";
import {
  usePostScreenQuery,
  PostScreenPostFragment,
} from "~/screens/Post/Post.generated";
import PostForm, { usePostFormState } from "~/components/PostForm";

function PostScreenEdit(post: PostScreenPostFragment) {
  const [state, setState] = usePostFormState({
    title: post?.metadata.name,
    content: post?.metadata.description,
  });
  return <PostForm state={state} setState={setState} />;
}

export default function PostScreen() {
  const router = useRouter();
  const isEdit = router.query.edit;
  const { data, loading } = usePostScreenQuery({
    variables: { publicationId: router.query.id },
  });
  const post = data?.publication as PostScreenPostFragment;
  const toggleEdit = async () => {
    let url = `/posts/${router.query.id}`;
    if (!router.query.edit) {
      url = `${url}?edit=true`;
    }
    await router.push(url);
  };
  return (
    <>
      <div>
        <h1>{post?.metadata.name}</h1>
        <button onClick={toggleEdit}>{isEdit ? "Close Edit" : "Edit"}</button>
      </div>
      {isEdit && !loading ? (
        <PostScreenEdit {...post} />
      ) : (
        <div>{post?.metadata.description}</div>
      )}
    </>
  );
}
