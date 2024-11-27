import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../utils/movieAPI";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

// Update the genres query
const { data: genres = [] } = useQuery({
  queryKey: ['genres'],
  queryFn: async () => {
    const genresData = await getGenres();
    return genresData || [];
  },
  staleTime: 300000, // Cache for 5 minutes
  cacheTime: 3600000, // Keep in cache for 1 hour
});



  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        active || pathname !== "/"
          ? "navbar z-50 flex flex-col items-center bg-white text-black font-[Montserrat] sticky top-0"
          : "navbar z-50 flex flex-col items-center bg-[#0c1d22] text-white font-[Montserrat] sticky top-0"
      }
    >
      <div className="container w-full max-w-[1400px] flex justify-between p-5">
        <div className="left flex items-center gap-4 md:gap-7">
          <div className="logo">
            <Link to="/" className="flex items-center justify-center gap-2.5">
              <img
                src="/Movie.png"
                alt=""
                className="w-10 h-10 md:w-14 md:h-14 object-cover"
              />
              <span className="tag font-bold text-xl md:text-2xl">
                <span className="text-yellow-400 hover:text-yellow-400">
                  Panda
                </span>
                Play
              </span>
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 ml-4"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </button>

          <div className="hidden md:flex links gap-6 items-center font-normal">
            <Link
              to="/tvshows"
              className="hover:text-yellow-400 cursor-pointer"
            >
              Tv Shows
            </Link>
            <Link to="/movies" className="hover:text-yellow-400 cursor-pointer">
              Movies
            </Link>
            <Link to="/top50" className="hover:text-yellow-400 cursor-pointer">
              Top 50
            </Link>
            <div className="relative">
              <button
                className="font-normal hover:text-yellow-400 cursor-pointer"
                onClick={() => setOpenGenres(!openGenres)}
              >
                Genres
              </button>

              {openGenres && (
                <div className="absolute left-0 z-10 mt-2 w-[300px] origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1 flex flex-wrap p-2">
                    {genres &&
                      genres.length > 0 &&
                      genres.map((genre) => (
                        <Link
                          key={genre.id}
                          to={`/genre/${genre.id}`}
                          className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-yellow-400 hover:text-white rounded capitalize transition-colors"
                          onClick={() => setOpenGenres(false)}
                        >
                          {genre.name}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="right hidden md:flex items-center font-normal">
          {currentUser ? (
            <div
              className="user flex items-center gap-2 cursor-pointer relative"
              onClick={() => setOpen(!open)}
            >
              <div className="flex items-center justify-center gap-1">
                <img
                  src={currentUser?.img || "/avatar.png"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover mb-2.5"
                />
                <div className="text">{currentUser?.username}</div>
              </div>
              {open && (
                <div className="options absolute top-12 right-0 bg-white p-5 rounded-lg flex flex-col gap-2 border border-solid border-gray-300 text-slate-500 w-[250px]">
                  <Link
                    to="/favorites"
                    className="px-4 py-2 text-gray-700 hover:bg-yellow-400 rounded"
                  >
                    Favorites
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-700 hover:bg-yellow-400 rounded"
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="links flex gap-6 items-center font-normal">
              <Link to="/login" className="link hover:text-yellow-400">
                Sign in
              </Link>
              <Link to="/register" className="link hover:text-yellow-400">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden w-full bg-white text-black p-4 shadow-lg">
          <div className="flex flex-col gap-4">
            <Link
              to="/tvshows"
              className="hover:text-yellow-400 cursor-pointer"
            >
              Tv Shows
            </Link>
            <Link to="/movies" className="hover:text-yellow-400 cursor-pointer">
              Movies
            </Link>
            <Link to="/top50" className="hover:text-yellow-400 cursor-pointer">
              Top 50
            </Link>
            <div className="relative cursor-pointer">
              <button
                className="font-normal hover:text-yellow-400 cursor-pointer text-left"
                onClick={() => setOpenGenres(!openGenres)}
              >
                Genres
              </button>
              {openGenres && (
                <div className="flex flex-wrap gap-2 pl-4">
                  {genres &&
                    genres.length > 0 &&
                    genres.map((genre) => (
                      <Link
                        key={genre.id}
                        to={`/genre/${genre.id}`}
                        className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-yellow-400 hover:text-white rounded capitalize transition-colors"
                        onClick={() => {
                          setOpenGenres(false);
                          setMobileMenu(false);
                        }}
                      >
                        {genre.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>
            {currentUser ? (
              <>
                <Link to="/favorites" className="hover:bg-yellow-400 text-left">
                  Favorites
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:bg-yellow-400 text-left"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-yellow-400">
                  Sign in
                </Link>
                <Link to="/register" className="hover:text-yellow-400">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
