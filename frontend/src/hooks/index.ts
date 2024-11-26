import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    // console.log(res.data.blogs);
    setBlogs(res.data.blogs);
  };
  useEffect(() => {
    setLoading(true);
    fetchBlogs();
    setLoading(false);
  }, []);
  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(res.data.blog);
    setBlog(res.data.blog);
    setLoading(false);
  };
  useEffect(() => {
    fetchBlogs();
  }, [id]);
  return {
    loading,
    blog,
  };
};
