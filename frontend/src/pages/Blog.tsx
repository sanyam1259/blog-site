import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import FullBlog from "./FullBlog";

const Blog = () => {
  const { id } = useParams();
  // console.log(id);

  const { blog, loading } = useBlog({ id: id || "hello" });
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {blog && <FullBlog blog={blog} />}
    </div>
  );
};

export default Blog;
