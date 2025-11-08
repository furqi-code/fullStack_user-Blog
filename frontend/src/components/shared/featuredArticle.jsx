const FeaturedArticle = ({blog}) => {
  return (
    <article key={blog.id} className="group flex gap-6 cursor-pointer">
      <div className="flex-shrink-0">
        <div className="relative w-24 h-24 overflow-hidden rounded-lg">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>{blog.date}</span>
          <span className="text-gray-300">•</span>
          <span>{blog.author}</span>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-gray-600 line-clamp-2">
          {blog.title}
        </h3>
      </div>
    </article>
  );
};

export default FeaturedArticle