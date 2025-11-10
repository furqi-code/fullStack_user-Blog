import { HeartIcon } from "@heroicons/react/24/solid";
import { BlogContext } from "../../store/blogContext";
import { useContext } from "react";

const FavouriteArticles = ({ blog }) => {
  const { removeFavourite } = useContext(BlogContext);

  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
        <img
          src={blog.imageUrl}
          alt="Blog picture"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            removeFavourite(blog.blog_id)
          }}
        >
          <HeartIcon className="w-5 h-5 text-red-500" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <span>{blog.date.split('T')[0]}</span>
        <span className="text-gray-300">•</span>
        <span>{blog.author}</span>
        <span className="text-gray-300">•</span>
        <span>{blog.readTime} min</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600">
        {blog.title}
      </h3>
      <p className="text-gray-600 line-clamp-2">
        {blog.description}
      </p>
    </article>
  );
};

export default FavouriteArticles;
