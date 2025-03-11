import React, { useEffect, useState } from "react";
import BlogCard from "../components/Cards/BlogCard";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";

function Blog() {
  const [allBlog, setAllBlog] = useState([]);
  const getAllBlogsApi = useServices(commonApis.getAllBlogs);
  const getAllBlogsApiHandle = async () => {
    const response = await getAllBlogsApi.callApi();
    setAllBlog(response ? response?.blogs : []);
  };
  useEffect(() => {
    getAllBlogsApiHandle();
  }, []);
  return (
    <div className="min-h-[50vh] px-[3%] py-[3%] ">
      <h2 className="text-primary font-semibold text-2xl">All Blogs</h2>
      <div className="my-4 flex items-center justify-start flex-wrap gap-4 w-full">
        {allBlog?.map((item) => (
          <BlogCard key={item?.title} blog={item} />
        ))}
      </div>
    </div>
  );
}

export default Blog;
