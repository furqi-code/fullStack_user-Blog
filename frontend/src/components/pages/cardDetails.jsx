import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { BlogContext } from "../../store/blogContext";
import CommentCard from "../shared/commentCard";
import axios from "axios";
import {
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const Detail = () => {
  const { addtoFavourite, getFavouritelist, favouriteList, isLoggedin } =
    useContext(BlogContext);
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const commentRef = useRef();
  const navigate = useNavigate();
  const { categoryType, blogId } = useParams();
  console.log("category: ", categoryType);
  console.log("blog_id: ", blogId);

  let content = ""; // generate fifty random string
  for (let i = 0; i < 50; i++) {
    content += Math.random().toString(36).substring(2, 7);
  }
  let longDiscription = `<p class="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, omnis laudantium facere aliquid fugiat praesentium consectetur ab architecto molestiae quod rerum sed expedita ullam! Minima reiciendis exercitationem necessitatibus iusto reprehenderit.</p>
                 <p class="mb-4">The process of achieving perfection in product design is iterative and never-ending. It requires a deep understanding of user needs, technical constraints, and business objectives. Designers must constantly balance these competing demands while maintaining their creative vision.</p>
                 <h2 class="text-xl font-semibold mb-3 mt-6">The Role of Blog Research</h2>
                <p class="mb-4">${content}</p>`;

  const alreadyinList = favouriteList.find((blog) => blog.blog_id == blogId);

  useEffect(() => {
    if (isLoggedin) {
      getFavouritelist();
    }
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:1111/blogs/oneBlog?category=${categoryType}&&blog_id=${blogId}`,
    })
      .then((res) => {
        console.log(`one ${categoryType} Blog \n`, res.data.data);
        setBlog(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching one blog");
      });

    axios({
      method: "GET",
      url: `http://localhost:1111/account/comment?blog_id=${blogId}`,
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
    })
      .then((res) => {
        if (res.data.data.length > 0) setComments(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching comment");
      });
  }, []);

  const addComment = (e) => {
    e.preventDefault();
    if (isLoggedin) {
      const content = commentRef.current.value;
      if(!content) return alert("Please fill up the comment box");
      axios({
        method: "POST",
        url: `http://localhost:1111/account/comment?blog_id=${blogId}`,
        headers: {
          Authorization: localStorage.getItem("userDetail"),
        },
        data: {
          content,
        },
      })
        .then((res) => {
          setComments(res.data.data);
        })
        .catch((err) => {
          console.log("Error while adding a comment");
        });
      commentRef.current.value = "";
    } else {
      alert("Kindly login to add a comment under this blog");
    }
  };

  const deleteMyComment = (comment_id) => {
    axios({
      method: "DELETE",
      url: `http://localhost:1111/account/comment/eliminate?comment_id=${comment_id}&&blog_id=${blogId}`,
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
    })
      .then((res) => {
        // could have run the select query in Api to get the fresh comments for this blog
        setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== comment_id));
      })
      .catch((err) => {
        console.log("Error while deleting a comment");
      });
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
                  onClick={async () => {
                    if (!alreadyinList) await addtoFavourite(blogId);
                    else
                      alert(
                        "this Blog already available in your favoutire list"
                      );
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {!alreadyinList ? (
                    <HeartIcon className="w-6 h-6 text-gray-600" />
                  ) : (
                    <HeartIconSolid className="w-6 h-6 text-red-500" />
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
            <form className="mb-12" onSubmit={addComment}>
              <textarea
                ref={commentRef}
                placeholder="Add a comment..."
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-primary-color resize-none h-32"
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-color rounded-md hover:bg-secondary-color transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            {/* made a card for every comment on this blog */}
            <div className="space-y-8">
              {comments.map((comment) => (
                <CommentCard
                  comment={comment}
                  deleteMyComment={deleteMyComment}
                ></CommentCard>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default Detail;
