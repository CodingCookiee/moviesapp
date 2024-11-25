import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    <div className={active || pathname !== "/" 
      ? "navbar z-50 flex flex-col items-center bg-white text-black font-[Montserrat] sticky top-0"
      : "navbar z-50 flex flex-col items-center bg-[#0c1d22] text-white font-[Montserrat] sticky top-0"}>
      
      <div className="container w-full max-w-[1400px] flex justify-between p-5">
        <div className="left flex items-center gap-4 md:gap-7">
          <div className="logo">
            <Link to="/" className="flex items-center justify-center gap-2.5">
              <img src="/Movie.png" alt="" className="w-10 h-10 md:w-14 md:h-14 object-cover" />
              <Link className="tag font-bold text-xl md:text-2xl">
                <Link className="text-[#efc949]">Panda</Link>Play
              </Link>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col gap-1.5 ml-4" 
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex links gap-6 items-center font-normal">
            <Link className="hover:text-[#efc949] cursor-pointer">Tv Shows</Link>
            <Link to='/movies' className="hover:text-[#efc949] cursor-pointer">Movies</Link>
            <Link className="hover:text-[#efc949] cursor-pointer">Top 50</Link>
            <div className="relative">
              <button
                className="font-normal hover:text-[#efc949] cursor-pointer"
                onClick={() => setOpenGenres(!openGenres)}
              >
                Genres
              </button>

              {openGenres && (
                <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1 flex flex-wrap p-2">
                    {['action', 'comedy', 'drama', 'horror', 'romance', 'history', 'mystery'].map((genre) => (
                      <Link
                        key={genre}
                        to={`/genre/${genre}`}
                        className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded capitalize"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop User Menu */}
        <div className="right hidden md:flex items-center font-normal">
          {currentUser ? (
            <div className="user flex items-center gap-2 cursor-pointer relative" onClick={() => setOpen(!open)}>
             <div className="flex items-center justify-center gap-1">
             <img
                src={currentUser?.img || "/avatar.png"}
                alt=""
                className="w-12 h-12 rounded-full object-cover mb-2.5"
              />
              <Link className="text">{currentUser?.username}</Link>
             </div>
              {open && (
                <div className="options absolute top-12 right-0 bg-white p-5 rounded-lg flex flex-col gap-2 border border-solid border-gray-300 text-slate-500 w-[250px]">
                  <Link to="/favorite" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Favorites
                  </Link>
                  <Link onClick={handleLogout} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="links flex gap-6 items-center font-normal">
              <Link to="/login" className="link">Sign in</Link>
              <Link to="/register" className="link">Sign up</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden w-full bg-white text-black p-4 shadow-lg">
          <div className="flex flex-col gap-4">
            <Link to='/movies' className="hover:text-[#efc949] cursor-pointer">Tv Shows</Link>
            <Link className="hover:text-[#efc949] cursor-pointer">Movies</Link>
            <Link className="hover:text-[#efc949] cursor-pointer">Top 50</Link>
            <button
              className="font-normal hover:text-[#efc949] cursor-pointer text-left"
              onClick={() => setOpenGenres(!openGenres)}
            >
              Genres
            </button>
            {openGenres && (
              <div className="flex flex-wrap gap-2 pl-4">
                {['action', 'comedy', 'drama', 'horror', 'romance', 'history', 'mystery'].map((genre) => (
                  <Link
                    key={genre}
                    to={`/genre/${genre}`}
                    className="w-[calc(50%-8px)] px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded capitalize"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            )}
            {currentUser ? (
              <>
                <Link to="/favorite" className="hover:text-[#efc949]">Favorites</Link>
                <button onClick={handleLogout} className="hover:text-[#efc949] text-left">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-[#efc949]">Sign in</Link>
                <Link to="/register" className="hover:text-[#efc949]">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
