import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ChangePassword from "./pages/changePassword/ChangePassword";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Movies from "./pages/movies/Movies";
import Movie from "./pages/movie/Movie";
import Favorites from "./pages/favorites/Favorites";
import Genre from "./pages/genre/Genre";
import Top50 from "./pages/Top50/Top50";
import TvShows from "./pages/TvShows/tvShows";
import TvShow from "./pages/TVShow/tvShow";
import WatchProviders from "./pages/watchProviders/watchProviders";
import Season from "./pages/season/Season";
import SearchResult from "./pages/searchResult/searchResult";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Link,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop />
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movie/:id",
          element: <Movie />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/genre/:genreId",
          element: <Genre />,
        },
        {
          path: "/top50",
          element: <Top50 />,
        },
        {
          path: "/watch-providers",
          element: <WatchProviders />,
        },
        {
          path: "/tvshows",
          element: <TvShows />,
        },
        {
          path: "/tvshow/:id",
          element: <TvShow />,
        },
        {
          path: "/season/:id/:seasonNumber",
          element: <Season />,
        },
        {
          path: "/search",
          element: <SearchResult />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/change-password",
          element: <ChangePassword />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <SpeedInsights />
    </div>
  );
};
export default App;
