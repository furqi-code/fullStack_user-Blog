import { BlogContextProvider } from "../../store/blogContext";
import { Outlet } from "react-router";
import Header from "../shared/header";
import Footer from "../shared/footer";

const Home = () => {
  return (
    <>
      <BlogContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </BlogContextProvider>
    </>
  );
};

export default Home;
