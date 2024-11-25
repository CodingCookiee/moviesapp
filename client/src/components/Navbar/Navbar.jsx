// Navbar.js
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      <div className="container w-[1400px] flex justify-between p-5 pl-0 pr-0">
        <div className="left flex items-center gap-7">
          <div className="logo">
            <Link to="/" className=" flex items-center justify-center gap-2.5">
              <img src="/Movie.png" alt="" className="w-14 h-14 object-cover" />
              <span className="tag font-bold text-2xl">
                <span className="text-[#efc949]">Panda</span>Play
              </span>
            </Link>
          </div>
          <div className="links flex gap-6 items-center font-normal">
            <span className="hover:text-[#efc949] cursor-pointer">Tv Shows</span>
            <span className="hover:text-[#efc949] cursor-pointer">Movies</span>
            <span className="hover:text-[#efc949] cursor-pointer">Top 50</span>
            <span className="relative">
              <button
                className="font-normal hover:text-[#efc949] cursor-pointer"
                onClick={() => setOpenGenres(!openGenres)}
              >
                Genres
              </button>

              {openGenres && (
                <div className=" absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1 flex flex-wrap p-2">
                    <Link
                      to="/genre/action"
                     className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Action
                    </Link>
                    <Link
                      to="/genre/comedy"
                      className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Comedy
                    </Link>
                    <Link
                      to="/genre/drama"
                      className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Drama
                    </Link>
                    <Link
                      to="/genre/horror"
                      className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Horror
                    </Link>
                    <Link
                      to="/genre/romance"
                      className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Romance
                    </Link>
                    <Link
                      to="/genre/history"
                      className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      History
                    </Link>
                    <Link
                      to="/genre/mystery"
                      className="w-[calc(50%-4px)] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Mystery
                    </Link>
                  </div>
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="right flex items-center font-normal">
          {currentUser ? (
            <div
              className="user flex items-center gap-2 cursor-pointer relative"
              onClick={() => setOpen(!open)}
            >
              <div className="user  flex items-center gap-1 cursor-pointer ">
                <img
                  src={currentUser?.img || "/avatar.png"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover mb-2.5"
                />
                <span className="text">{currentUser?.username}</span>
              </div>
              {open && (
                <div
                  className="options absolute top-12 right-0 bg-white p-5 rounded-lg flex flex-col
                 gap-2 border border-solid border-gray-300 text-slate-500 w-[250px]"
                >
                  <Link to="/favorite"
                   className=" px-4 py-2  text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Favorites
                  </Link>
                  <Link  onClick={handleLogout}
                  className=" px-4 py-2  text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="links flex gap-6 items-center font-normal">
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
