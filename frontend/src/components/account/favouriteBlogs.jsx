import { useEffect, useContext } from "react";
import { Link } from "react-router";
import Sidebar from "./sidebar";
import FavouriteArticles from "../shared/favouriteArticle";
import { BlogContext } from "../../store/blogContext";

const FavBlog = () => {
  const { favouriteList, isLoggedin, getFavouritelist } =
    useContext(BlogContext);

  useEffect(() => {
    if (isLoggedin) getFavouritelist();
  }, []);

  return (
    <>
      <div className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center  min-h-[60vh]">
              <div className="space-y-8">
                <section className="bg-white shadow-md rounded-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                    Favourite Articles
                  </h3>
                  {favouriteList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {favouriteList.map((blog) => (
                        <Link
                          to={`/blogs/${blog.blog_id}`}
                          key={blog.blog_id}
                          className="block hover:shadow-lg transition-shadow rounded-md"
                        >
                          <FavouriteArticles blog={blog} />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center min-h-[300px]">
                      <div className="emptyCart-base-mainContainer flex items-center justify-center">
                        <div className="emptyCart-base-subContainer flex flex-col items-center text-center">
                          <div
                            className="emptyCart-base-emptyBagImage mb-6"
                            style={{ height: "165px", width: "146px" }}
                          >
                            <picture
                              className="image-base-imgResponsive"
                              style={{ width: "100%" }}
                            >
                              <source
                                srcSet="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
                                type="image/webp"
                              />
                              <img
                                src="https://constant.myntassets.com/checkout/assets/img/empty-bag.png"
                                alt="empty bag"
                                loading="eager"
                                style={{ height: "165px", width: "146px" }}
                              />
                            </picture>
                          </div>
                          <div className="emptyCart-base-emptyText mb-1">
                            Hey, it feels so light!
                          </div>
                          <div className="emptyCart-base-emptyDesc mb-6">
                            There is nothing in your bag. Let's add some items.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavBlog;
