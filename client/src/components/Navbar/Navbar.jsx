// Navbar.js
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [hideSellerButton, setHideSellerButton] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Update the joinBtnClass to use the active state instead of window.scrollY
  const joinBtnClass =
    pathname !== "/" || active === true
      ? "text-black border-black"
      : "text-white border-white";

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

  const handleSeller = async () => {
    try {
      setHideSellerButton(true);
      await newRequest.post("/users/:id", {
        isSeller: true,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      setHideSellerButton(false);
    }
  };

  return (
    <div
      className={
        active || pathname !== "/"
          ? "navbar z-50 flex flex-col items-center bg-white text-black font-[Montserrat] sticky top-0"
          : "navbar z-50 flex flex-col items-center bg-[#013914] text-white font-[Montserrat] sticky top-0"
      }
    >
      <div className="container w-[1400px] flex justify-between p-5 pl-0 pr-0">
        <div className="logo">
          <Link to="/" className=" flex items-center justify-center gap-2.5">
          <img src='/Movie.png' alt="" className="w-14 h-14 object-cover"/>
          <span className="tag font-medium text-3xl text-white">PandaPlay</span>
          </Link>
        </div>
        <div className="links flex gap-6 items-center font-normal">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {/* Become a Seller */}
          {!currentUser?.isSeller && !hideSellerButton && (
            <button onClick={handleSeller}>Become a Seller</button>
          )}
          {currentUser ? (
            <div
              className="user flex items-center gap-2 cursor-pointer relative"
              onClick={() => setOpen(!open)}
            >
              <img
                src={currentUser?.img || "/avatar.png"}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text">{currentUser?.username}</span>
              {open && (
                <div className="options absolute top-12 right-0 bg-white p-5 rounded-lg flex flex-col gap-2 border border-solid border-gray-300 text-slate-500 w-[250px]">
                  {currentUser?.isSeller && (
                    <div className="seller flex flex-col gap-2">
                      <Link to="/mygigs" className="text">
                        Gigs
                      </Link>
                      <Link to="/add" className="text">
                        Add New Gig
                      </Link>
                    </div>
                  )}
                  <Link to="/orders" className="text">
                    Orders
                  </Link>
                  <Link to="/messages" className="text">
                    Messages
                  </Link>
                  <Link className="text" onClick={handleLogout}>
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                {!currentUser && (
                  <button
                    className={`btn ${joinBtnClass} p-[10px] pl-5 pr-5 rounded-sm border 
                    border-solid  bg-transparent cursor-pointer
                     hover:bg-[#1dbf73] hover:border-[#1dbf73]`}
                  >
                    Join
                  </button>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr className="w-full h-0 border-[#ebebeb] border-solid" />
          <div className="menu flex justify-between w-[1400px] p-[10px] pl-0 pr-0 font-light text-[Montserrat] text-slate-400">
            <Link
              to={`/gigs?search=${encodeURIComponent("Graphics & Design")}`}
              className="link menuLink"
            >
              Graphics & Design
            </Link>
            <Link
              to={`/gigs?search=${encodeURIComponent("Videos & Animation")}`}
              className="link"
            >
              Videos & Animation
            </Link>
            <Link
              to={`/gigs?search=${encodeURIComponent("Writing & Translation")}`}
              className="link"
            >
              Writing & Translation
            </Link>
            <Link
              to={`/gigs?search=${encodeURIComponent("AI Services")}`}
              className="link"
            >
              AI Services
            </Link>
            <Link
              to={`/gigs?search=${encodeURIComponent("Digital Marketing")}`}
              className="link"
            >
              Digital Marketing
            </Link>
            <Link
              to={`/gigs?search=${encodeURIComponent("Music & Audio")}`}
              className="link"
            >
              Music & Audio
            </Link>
            <Link
              to={`/gigs?search=${encodeURIComponent("Programming & Tech")}`}
              className="link"
            >
              Programming & Tech
            </Link>
            <Link
              to={`/gigs?search=${encodeURIComponent("Business & Management")}`}
              className="link"
            >
              Business & Management
            </Link>
            <Link
              to={`/gigs?search=${encodeURIComponent("Finance")}`}
              className="link"
            >
              Finance
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
