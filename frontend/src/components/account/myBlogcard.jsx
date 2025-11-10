import axios from "axios";

const MyblogCard = ({ setMyBlogs, blog }) => {
  const deleteMyBlog = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:1111/account/myBlogs/deleteBlog?blog_id=${blog.blog_id}`,
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
    })
      .then((res) => {
        // window.location.reload();
        setMyBlogs((prevBlogs) =>
          prevBlogs.filter((b) => b.blog_id !== blog.blog_id)
        );
      })
      .catch((error) => {
        console.error("Error fetching favouriteList:", error);
      });
  };

  return (
    <>
      <article className="group cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
          <img
            src={blog.imageUrl}
            alt="Blog cover"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Published
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>{blog.date.split("T")[0]}</span>
          <span className="text-gray-300">•</span>
          <span>{blog.readTime} min</span>
          <span className="text-gray-300">•</span>
          <span>121 views</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button
              className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center"
                onClick={deleteMyBlog}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default MyblogCard;
