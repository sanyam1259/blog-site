import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";

interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

const Blogs = () => {
  const { loading, blogs }: { loading: boolean; blogs: Blog[] } = useBlogs();
  console.log(blogs);
  if (loading) {
    return (
      <div>
        <BlogSkeleton />
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center ">
        <div className="max-w-xl">
          {blogs.map((blog, ind) => (
            <BlogCard
              id={blog.id}
              key={ind}
              authorname={blog.author.name || "any"}
              title={blog.title || "any"}
              content={blog.content || "any"}
              publishedDate={Date()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
