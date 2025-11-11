import { BlogContext } from "../../store/blogContext";
import { useContext } from "react";

const CommentCard = ({ comment, deleteMyComment }) => {
  const { isLoggedin } = useContext(BlogContext);

  return (
    <div
      key={comment.id}
      className="flex justify-between items-center space-x-4 py-2"
    >
      <div className="flex items-center space-x-4">
        <img
          src={comment.profile_pic}
          alt="profile pic"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-gray-900">{comment.username}</h4>
            <span className="text-sm text-gray-500">
              {comment.commented_at.split("T")[0]}
            </span>
          </div>
          <p className="text-gray-600">{comment.content}</p>
        </div>
      </div>
      {isLoggedin && (
        <button
          type="button"
          className="text-red-500 hover:text-red-700 text-sm font-medium inline-flex items-center"
          onClick={() => deleteMyComment(comment.comment_id)}
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
      )}
    </div>
  );
};

export default CommentCard;
