import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import BlogArticles from "../shared/blogArticle";
import axios from "axios";

const Blog = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const { categoryBlogs } = useParams();
  console.log("categoryBlogs: ", categoryBlogs);

  const categories = [
    { name: "All", count: 12 },
    { name: "Fashion", count: 4 },
    { name: "Business", count: 3 },
    // { name: "Health", count: 2 },
    { name: "Travel", count: 1 },
    { name: "Food", count: 2 },
  ];

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:1111/blogs?category=${categoryBlogs}`,
    })
      .then((res) => {
        console.log(`${categoryBlogs} Blogs \n`, res.data.data);
        setLatestBlogs(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching blogs");
      });
  }, [categoryBlogs]);

  return (
    <>
      <section className="latest-blogs py-12">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              All Articles
            </h2>
          </div>
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <nav className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-gray-600 hover:bg-gray-50`}
                      >
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main content */}
            <main className="lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestBlogs.map((blog) => (
                   <Link to={`/${categoryBlogs}/${blog.blog_id}`}>
                    <BlogArticles blog={blog}></BlogArticles>
                  </Link>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
