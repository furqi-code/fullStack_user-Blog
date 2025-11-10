import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import BlogForm from "./blogform";
import MyblogCard from "./myBlogcard";
import axios from "axios";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [showForm, setshowForm] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/account/myBlogs",
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
    })
      .then((res) => {
        setMyBlogs(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching your Blogs:", error);
      });
  }, [showForm]);

  return (
    <>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1">
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      My Blogs
                    </h3>
                    <button
                      onClick={() => {
                        setshowForm(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md bg-primary-color hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add New Blog
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {showForm ? (
                      <BlogForm setshowForm={setshowForm} />
                    ) : myBlogs.length > 0 ? (
                      myBlogs.map((blog) => (
                        <MyblogCard
                          key={blog.blog_id}
                          blog={blog}
                          setMyBlogs={setMyBlogs}
                        />
                      ))
                    ) : (
                      <h4>Zero blogs added</h4>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
