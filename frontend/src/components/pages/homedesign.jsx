import { useState, useEffect } from "react";
import FeaturedArticle from "../shared/featuredArticle";
import LatestArticle from "../shared/latestArticle";
import axios from "axios";
import { Link } from "react-router";

const HomeDesign = () => {
  const [blogs, setBlogs] = useState([]);
  const [mainFeatured, setMainFeatured] = useState(null);
  let randomIndex = Math.floor(Math.random() * 27); // total blogs: 28

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:1111/blogs?category=all`,
    })
      .then((res) => {
        console.log(`All Blogs \n`, res.data.data);
        setBlogs(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching blogs");
      });
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      setMainFeatured(blogs[randomIndex]);
    }
  }, [blogs]);

  return (
    <>
      <section className="featured-blogs py-12 ">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Featured Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Main featured article */}
            {mainFeatured && (
              <article>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                  <img
                    src={mainFeatured.imageUrl}
                    alt={mainFeatured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span>{mainFeatured.date.split("T")[0]}</span>
                  <span className="text-gray-300">•</span>
                  <span>{mainFeatured.author}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-600">
                  {mainFeatured.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {mainFeatured.description} Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Quo praesentium voluptates
                  veritatis fuga porro placeat consequuntur natus deleniti
                  tempore labore. Iusto eaque veniam, eligendi distinctio rem
                  corrupti temporibus aliquam necessitatibus!
                </p>
              </article>
            )}
            {/* Right side - few smaller articles */}
            <div className="space-y-6">
              {blogs.slice(randomIndex, randomIndex + 4).map((blog) => (
                <Link
                  to={`/blogs/${blog.blog_id}`}
                  key={blog.id}
                  className="block mb-6"
                >
                  <FeaturedArticle key={blog.id} blog={blog} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="latest-blogs bg-light py-12">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Latest Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Latest section (show last 5) */}
            {blogs.slice(-5).map((blog) => (
              <Link to={`/blogs/${blog.blog_id}`} key={blog.id}>
                <LatestArticle key={blog.id} blog={blog} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeDesign;
