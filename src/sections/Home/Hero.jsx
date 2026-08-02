import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Img from "../../assets/images/profile.png"

const DEFAULT_AVATAR = Img ;
const phrases = [
  "Growth Strategist",
  "Full Funner Media Buyer",
  "Funnel Architect",
  "Team Leader In Performance Marketing",
];

export default function Hero({ avatar = DEFAULT_AVATAR, interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, interval);

    return () => clearInterval(t);
  }, [paused, interval]);

  return (
  <section className="w-full max-w-[90%] px-6 py-24 rounded-4xl mx-auto bg-[#141414]">
      <div className="flex flex-col items-center text-center">
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border-8 border-gray-800 overflow-hidden mb-8">
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://via.placeholder.com/500x500.png?text=Avatar";
            }}
          />
        </div>

        <div className="flex flex-row! gap-28">
        <h1 className="font-serifTitle text-white font-medium text-4xl md:text-6xl leading-tight mb-1">
           
                       <div
          className="mt-3 mb-6 max-w-full!"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative h-8 md:h-9 pr-50 max-[700px]:pr-80!"
            aria-live="polite"
            aria-atomic="true"
            role="status"
          >
          <p className="max-[700px]:hidden font-serif">Laith</p>

            {phrases.map((p, i) => (
              <span
                key={p}
                aria-hidden={i !== index}
                className={
                  " absolute w-full! pr-0! ml-45 mt-8 max-[700px]:block! max-[700px]:ml-0! max-[700px]:my-5 font-bold top-0 right-0 inset-0 flex items-center justify-center text-sm md:text-base transition-all duration-500 ease-in-out " +
                  (i === index
                    ? "opacity-100 translate-y-0 text-[#fffffe] text-[22px]! w-full!"
                    : "opacity-0 -translate-y-3 pointer-events-none text-gray-300")
                }
              >
                {p}
              </span>
            ))}
          </div>
        </div>

          <span className="block mt-8 font-serif max-[700px]:pl-0!"><label className="hidden max-[700px]:block max-[700px]:mt-16">Laith</label>Dawara</span>
          </h1>        
          </div>

          <br />
          <h1>
        </h1>

        <p className="max-w-xl text-gray-300 mb-8 font-semibold font-serif">
          Senior Marketing Manager And Renwable Power Engineer
        </p>

<button type="button"
            className={`main-btn cursor-pointer py-2.5 px-8 font-medium text-black bg-primary
 rounded-4xl text-[1.2rem] relative overflow-hidden z-1 duration-300 hover:bg-white`}>
            <a href="#reference" className="flex items-center justify-center gap-4 group base">Veiw Portfolio<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill groupClass" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg></span></a>
        </button>

      </div>
    </section>
  );
}