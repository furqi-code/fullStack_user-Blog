import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import BlogArticles from "../shared/blogArticle";
import axios from "axios";

const Blog = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const { categoryType } = useParams();
  console.log("categoryType: ", categoryType);

  const categories = [
    { name: "Fashion", count: 4 },
    { name: "Business", count: 3 },
    { name: "Travel", count: 1 },
    { name: "Health", count: 5 },
    { name: "Food", count: 2 },
  ];

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:1111/blogs?category=${categoryType}`,
    })
      .then((res) => {
        console.log(`${categoryType} Blogs \n`, res.data.data);
        setLatestBlogs(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching blogs");
      });
  }, [categoryType]);

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
                      <Link
                        to={`/${category.name}`}
                        key={category.name}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-gray-600 hover:bg-gray-50`}
                      >
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main content */}
            <main className="col-span-12 lg:col-span-9">
              {latestBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {latestBlogs.map((blog) => (
                    <Link
                      to={`/${categoryType}/${blog.blog_id}`}
                      key={blog.blog_id}
                    >
                      <BlogArticles blog={blog}></BlogArticles>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-8 max-w-lg mx-auto text-center mb-18">
                  <div className="mb-6">
                    <svg
                      className="w-20 h-20 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </div>

                  {/* Message */}
                  <h3 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Nothing to see here... yet
                  </h3>
                  <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                    Sorry, we couldn’t find any blogs in this category. Please
                    explore other categories or check back soon!
                  </p>
                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-x-4">
                    <Link
                      to="/"
                      className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 text-base font-medium rounded-md shadow-sm border border-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Go Home
                    </Link>
                    <Link
                      to="/all"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Browse All Categories
                    </Link>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
