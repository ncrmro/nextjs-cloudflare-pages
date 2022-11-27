import { useRouter } from "next/router";
import {
  usePostScreenQuery,
  PostScreenPostFragment,
} from "~/screens/Post/Post.generated";

export default function PostScreen() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = usePostScreenQuery({ variables: { publicationId: id } });
  const post = data?.publication as PostScreenPostFragment;
  return (
    <>
      <h1>{post?.metadata.name}</h1>
      <div>{post?.metadata.description}</div>
    </>
  );
}
