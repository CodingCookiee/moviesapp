import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Hero = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };
  

  return (
    <div className="featured flex flex-col items-center justify-center bg-[#0c1d22] min-h-[600px] text-white gap-6 md:gap-10 px-4 py-8 md:py-12">
      <div className="featured__container flex items-center w-full max-w-[1400px]">
        <div className="top flex flex-col gap-8 md:gap-14 w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-center">
            <span className="text-yellow-400 hover:text-[#efc949]">Panda</span>
            Play
          </h1>

          <form onSubmit={handleSubmit} className="self-center w-full md:w-4/5">
            <div
              className="search flex items-center justify-between rounded-md 
            overflow-hidden p-1 px-2 shadow-lg 
            hover:shadow-[0_0_7px_5px_#efc949] transition-shadow duration-300 bg-white"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Search for Movies or TV Shows"
                className="text-gray-900 rounded-md px-2 md:px-3 py-3 md:py-4 w-full h-full border-none outline-none shadow-sm appearance-none focus:outline-none"
              />
              <button
                type="submit"
                className="cursor-pointer bg-[#d05a49] rounded-md px-4 md:px-10 py-2 md:py-3"
              >
                <img
                  src="/seachmovie.png"
                  alt=""
                  className="w-8 h-8 md:w-10 md:h-10 m-1 md:m-2.5"
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-2.5 w-full md:w-4/5 px-4">
        <h1 className="text-2xl md:text-4xl font-semibold text-center">
          <span className="text-yellow-400 hover:text-[#efc949]">Panda</span>
          Play – The Best Place to Watch <i>Free Movies</i> and <i>TVShows</i>{" "}
          Online
        </h1>

        <p className="text-base md:text-lg text-center leading-relaxed md:leading-7">
          Movie and TVShow fans now have a place, where they can find all their
          favorite flicks. Would you like to get an exclusive access to all the
          major blockbusters of the recent years? Everybody wants to see a great
          movie with his friends and family every once in a while and{" "}
          <span className="text-yellow-400 hover:text-[#efc949]">Panda</span>
          Play is the exact place for that! Start by Searching or by Navigating
          the
          <span className=" text-yellow-400 hover:text-[#efc949] ml-1">
            Panda
          </span>
          Play Top Menu, You will find something to Watch in a matter of
          seconds!
        </p>
      </div>
    </div>
  );
};

export default Hero;
