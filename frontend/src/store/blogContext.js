import { useReducer, createContext } from "react";
import axios from "axios";

export const BlogContext = createContext({
  favouriteList: [],
  isLoggedin: undefined,
  setIsloggedin: () => {},
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
        favouriteList: action.payload.data,
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

  const setIsloggedin = (status) => {
    dispatch({
      type: 'activeUser',
      payload:{
        status
      }
    })
  }

  return (
    <BlogContext
      value={{
        favouriteList: state.favouriteList,
        isLoggedin: state.isLoggedin,
        setIsloggedin
      }}
    >
      {children}
    </BlogContext>
  );
};
