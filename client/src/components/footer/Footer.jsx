import "./footer.css";
import React from "react";

const Footer = () => {
  return (
    <div className="footer flex flex-col w-full justify-center my-[50px] mx-0">
      <hr className="my-[0px] mx-0 shadow-lg h-0 border border-solid border-[#e5e5e5]" />
      <div className="mt-5 top-container w-full max-w-[1400px] self-center flex flex-col md:flex-row items-start md:items-center justify-between gap-10 px-4">
        <div className="left flex flex-col sm:flex-row w-full md:w-[800px] justify-between gap-8 md:gap-0">
          <div className="item flex flex-col gap-5">
            <h2 className="text-md font-semibold">About</h2>
            <span className="font-light text-[#555] cursor-pointer">
              Partnerships
            </span>
            <span className="font-light text-[#555] cursor-pointer">
              Privacy Policy
            </span>
            <span className="font-light text-[#555] cursor-pointer">
              Terms of Service
            </span>
          </div>
          <div className="item flex flex-col gap-5">
            <h2 className="text-md font-semibold">Links</h2>
            <span className="font-light text-[#555] cursor-pointer">
              Featured
            </span>
            <span className="font-light text-[#555] cursor-pointer">
              Trust & Safety
            </span>
            <span className="font-light text-[#555] cursor-pointer">
              How to Watch
            </span>
            <span className="font-light text-[#555] cursor-pointer">
              Updates
            </span>
          </div>
          <div className="item flex flex-col gap-5">
            <h2 className="text-md font-semibold">Social</h2>
            <div className="social flex flex-col gap-5">
              <span className="flex items-center font-light text-[#555] cursor-pointer">
                Facebook
                <img
                  src="/facebook.png"
                  alt=""
                  className="cursor-pointer h-5 w-5 ml-2"
                />
              </span>
              <span className="flex items-center font-light text-[#555] cursor-pointer">
                Instagram
                <img
                  src="/instagram.png"
                  alt=""
                  className="cursor-pointer h-5 w-5 ml-2"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="right flex items-center flex-col gap-5 w-full md:w-auto">
          <h2 className="text-xl font-bold text-[#555] self-start">
            <span className="text-yellow-400">Panda</span>Play
          </h2>
          <p className="text-sm text-[#555] self-start text-justify w-full md:w-[300px]">
            OnionPlay does not store any files itself, we only link to media
            which is hosted on 3rd party services. PandaPlay is ADS-FREE and
            always will Be, Be Aware of clones or fake copies!
          </p>
        </div>
      </div>
      <hr className="my-[50px] mx-0 shadow-lg h-0 border border-solid border-[#e5e5e5]" />
      <div className="bottom-container self-center flex flex-col sm:flex-row items-center justify-between w-full max-w-[1400px] px-4 gap-4">
        <div>
          <span className="text-sm text-[#555]">
            © 2023 PandaPlay. All rights reserved.
          </span>
        </div>
        <div>
          <button
            className="scroll-up outline-none hover:rotate-180 transition-transform duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src="/scroll.png" alt="" className="h-10 w-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
