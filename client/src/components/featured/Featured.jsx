import "./featured.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/gigs?search=${encodeURIComponent(input)}`);
  };

  const handlePopularSearch = (searchTerm) => {
    navigate(`/gigs?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div
      className="featured flex  flex-col items-center justify-center bg-[#0c1d22] h-[600px] text-white gap-10"
    >
      <div className="featured__container flex items-center w-[1400px] ">
        <div className="top flex flex-col gap-14 w-full">
          <h1 className="text-6xl font-bold self-center">
            <span className="text-[#efc949]">Panda</span>Play
          </h1>
          <div
            className="search self-center flex items-center justify-between
            rounded-md overflow-hidden p-1 px-2 w-4/5 
            bg-[#d05a49] shadow-lg hover:shadow-[#efc949] "
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search for Movies or TV Shows"
              className="text-gray-500 rounded-md px-2.5 py-4 w-full h-full border-none
               outline-none shadow-sm appearance-none focus:outline-none "
            />
            <button onClick={handleSubmit} className=" cursor-pointer">
              <img src="/seachmovie.png" alt="" className="w-10 h-10 m-2.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 self-center w-4/5">
        <h1 className="text-4xl font-semibold self-center">
          <span className="text-[#efc949]">Panda</span>Play – The Best Place to
          Watch <i>Free Movies</i> and <i>TVShows</i> Online
        </h1>
        <p className="font-base text-lg text-center leading-7">
          Movie and TVShow fans now have a place, where they can find all their
          favorite flicks. Would you like to get an exclusive access to all the
          major blockbusters of the recent years? Everybody wants to see a great
          movie with his friends and family every once in a while and <span className="text-[#efc949]">Panda</span>Play 
          is the exact place for that! Start by Searching or by Navigating the
          <span className="text-[#efc949] ml-1">Panda</span>Play  Top Menu, You will find something to Watch in a matter of
          seconds!
        </p>
      </div>
    </div>
  );
};

export default Featured;
