import { useReducer, createContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BlogContext = createContext({
  favouriteList: [],
  isLoggedin: undefined,
  setIsloggedin: () => {},
  setFavouritelist: () => {},
  addtoFavourite: () => {},
  removeFavourite: () => {},
  getFavouritelist: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "activeUser":
      return {
        ...state,
        isLoggedin: action.payload.status,
      };

    case "getFavouritelist":
      return {
        ...state,
        favouriteList: action.payload.favouriteList,
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    favouriteList: [], // from DB to get user's favouritelist
    isLoggedin: localStorage.getItem("userDetail") ? true : false,
  });
  console.log("favouritelist Array \n", state.favouriteList);
  console.log("isLoggedin ? ", state.isLoggedin);

  const setIsloggedin = (status) => {
    dispatch({
      type: "activeUser",
      payload: {
        status,
      },
    });
  };

  // when clicked on logout
  const setFavouritelist = (emptyArr) => {
    dispatch({
      type: "getFavouritelist",
      payload: {
        favouriteList: [...emptyArr],
      },
    });
  };

  const getFavouritelist = () => {
    axios({
      method: "GET",
      url: "http://localhost:1111/account/favourites",
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
    })
      .then((getResponse) => {
        dispatch({
          type: "getFavouritelist",
          payload: {
            favouriteList: getResponse.data.data,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching favouriteList:", error);
      });
  };

  const collectBlogs = async (blog_id) => {
    try {
      if (state.isLoggedin) {
        await axios({
          method: "POST",
          url: `http://localhost:1111/account/favourites?blog_id=${blog_id}`,
          headers: {
            Authorization: localStorage.getItem("userDetail"),
          },
        });
        getFavouritelist();
      } else {
        toast.error("Kindly login to add in your Favourite list");
      }
    } catch (err) {
      console.error("Error adding blog to favourites", err);
    }
  };

  const removeFavourite = async (blog_id) => {
    try {
      if (state.isLoggedin) {
        await axios({
          method: "DELETE",
          url: `http://localhost:1111/account/favourites/eliminate?blog_id=${blog_id}`,
          headers: {
            Authorization: localStorage.getItem("userDetail"),
          },
        });
        getFavouritelist();
      } else {
        toast.error("Kindly login to remove from your Favourite list");
      }
    } catch (err) {
      console.error("Couldn't delete this blog from favourite list", err);
    }
  };

  return (
    <BlogContext
      value={{
        favouriteList: state.favouriteList,
        isLoggedin: state.isLoggedin,
        setIsloggedin,
        setFavouritelist,
        addtoFavourite: collectBlogs,
        removeFavourite,
        getFavouritelist,
      }}
    >
      {children}
    </BlogContext>
  );
};
