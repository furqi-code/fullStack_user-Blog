const BlogArticles = ({blog}) => {
  return (
    <article key={blog.blog_id} className="group cursor-pointer">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <span>{blog.date.split('T')[0]}</span>
        <span className="text-gray-300">•</span>
        <span>{blog.author}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 line-clamp-2">
        {blog.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>
    </article>
  );
};
export default BlogArticles;
