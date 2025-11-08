import Header from "../shared/header";
import Footer from "../shared/footer";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
