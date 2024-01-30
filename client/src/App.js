import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Scan from "./pages/scan/Scan";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./components.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/cat-blog-simple",
        element: <Home />,
      },
      {
        path: "/cat-blog-simple/post/:id",
        element: <Single />,
      },
      {
        path: "/cat-blog-simple/scan",
        element: <Scan />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
