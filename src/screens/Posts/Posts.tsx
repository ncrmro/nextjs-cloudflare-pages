import {
  PostsScreenPostFragment,
  usePostsScreenQuery,
} from "~/screens/Posts/Posts.generated";
import Link from "next/link";

export function PostsList() {
  const profileId = "0xe4ce";
  const { data } = usePostsScreenQuery({ variables: { profileId } });
  const posts = data?.publications.items as PostsScreenPostFragment[];
  return (
    <ul className="flex-col gap-4">
      {posts?.map((node) => (
        <li key={node.id}>
          <Link href={`/posts/${node.id}`}>{node.metadata.name}</Link>
          <div>{node.metadata.description}</div>
          <div>{node.appId}</div>
        </li>
      ))}
    </ul>
  );
}

export default function PostsScreen() {
  return <div>Posts</div>;
}
