import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import axios from "axios";

const Detail = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { categoryBlogs, blogId } = useParams();
  const navigate = useNavigate();
  console.log("category: ", categoryBlogs);
  console.log("blog_id: ", blogId);

  let content = ""; // generate fifty random string
  for (let i = 0; i < 50; i++) {
    content += Math.random().toString(36).substring(2, 7);
  }
  let longDiscription = `<p class="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, omnis laudantium facere aliquid fugiat praesentium consectetur ab architecto molestiae quod rerum sed expedita ullam! Minima reiciendis exercitationem necessitatibus iusto reprehenderit.</p>
                 <p class="mb-4">The process of achieving perfection in product design is iterative and never-ending. It requires a deep understanding of user needs, technical constraints, and business objectives. Designers must constantly balance these competing demands while maintaining their creative vision.</p>
                 <h2 class="text-xl font-semibold mb-3 mt-6">The Role of Blog Research</h2>
                <p class="mb-4">${content}</p>`;

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:1111/blogs/oneBlog?category=${categoryBlogs}&&blog_id=${blogId}`,
    })
      .then((res) => {
        console.log(`one ${categoryBlogs} Blog \n`, res.data.data);
        setBlog(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching one blog");
      });

    // Simulated comments
    const commentsData = [
      {
        id: 1,
        author: "Sarah Miller",
        authorImage:
          "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797851/portrait-787522_1280_p6fluq.jpg",
        content:
          "This is a great article! The insights about user research are particularly valuable.",
        date: "2 hours ago",
      },
      {
        id: 2,
        author: "James Wilson",
        authorImage:
          "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797987/butterfly-9791233_1280_ys6yeg.jpg",
        content:
          "I appreciate how you broke down the design process. Very insightful!",
        date: "5 hours ago",
      },
    ];
    setComments(commentsData);
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!blog) return null;

  return (
    <>
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to articles</span>
          </button>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={blog.imageUrl}
                  alt={blog.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{blog.author}</h3>
                  <div className="text-sm text-gray-500">
                    <span>{blog.date.split("T")[0]}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleFavorite}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {isFavorite ? (
                    <HeartIconSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ShareIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] mb-8">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-12 break-words"
            dangerouslySetInnerHTML={{ __html: longDiscription }}
          />

          {/* Comments Section */}
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-semibold mb-8">
              Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <form className="mb-12">
              <textarea
                value=""
                placeholder="Add a comment..."
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-primary-color resize-none h-32"
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-8">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.authorImage}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {comment.author}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default Detail;
