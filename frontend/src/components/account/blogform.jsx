import { useRef } from "react";
import axios from "axios";

const BlogForm = ({ setshowForm }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const readTimeRef = useRef();
  const categoryRef = useRef();
  const imageUrlRef = useRef();
  const authorRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      const date = dateRef.current.value;
      const readTime = readTimeRef.current.value;
      const category = categoryRef.current.value;
      const imageUrl = imageUrlRef.current.value;
      const author = authorRef.current.value;
    axios({
      method: "POST",
      url: "http://localhost:1111/account/myBlogs/addBlog",
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
      data: {
        title, description, date, readTime, category, imageUrl, author
      }
    })
      .then((res) => {
        console.error("blog added in db");
        setshowForm(false);
      })
      .catch((error) => {
        console.error("Error adding blog in DB :", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 space-y-5 max-w-xl"
    >
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          ref={titleRef}
          className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          ref={descriptionRef}
          className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
          rows={3}
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            ref={dateRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Read Time (min)</label>
          <input
            type="number"
            name="readTime"
            ref={readTimeRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            min={1}
            required
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input
          type="text"
          name="category"
          ref={categoryRef}
          className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          type="url"
          name="imageUrl"
          ref={imageUrlRef}
          className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Author</label>
        <input
          type="text"
          name="author"
          ref={authorRef}
          className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setshowForm(false)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-md text-sm font-semibold rounded-lg bg-gradient-to-r from-primary-color to-secondary-color hover:from-secondary-color hover:to-primary-color transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-primary-color"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary-color hover:bg-secondary-color px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
