import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect countdown
  useEffect(() => {
    document.title = "404 — Page Not Found";
    const interval = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          clearInterval(interval);
          navigate("/");
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background decoration — large blurred "404" */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-extrabold text-[clamp(12rem,40vw,28rem)] leading-none text-white/[0.03] -z-0"
      >
        404
      </span>

      {/* Accent line */}
      <div className="w-16 h-1 rounded-full bg-primary mb-8 z-10" />

      {/* Big number */}
      <h1 className="font-extrabold font-serif text-[clamp(5rem,18vw,11rem)] leading-none text-white z-10">
        404
      </h1>

      {/* Headline */}
      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-4 mb-3 text-center z-10">
        Page Not Found
      </h2>

      {/* Sub-copy */}
      <p className="text-gray-400 text-base sm:text-lg text-center max-w-md leading-relaxed z-10">
        The page you're looking for doesn't exist, was removed, or the URL might be incorrect.
      </p>

      {/* Divider */}
      <div className="w-full max-w-xs border-t border-[#272727] my-8 z-10" />

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-black font-bold px-7 py-3 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146z"/>
          </svg>
          Go Home
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-transparent text-primary border border-primary font-semibold px-7 py-3 rounded-2xl hover:bg-primary hover:text-black active:scale-95 transition-all text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Go Back
        </button>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 bg-transparent text-gray-400 border border-[#272727] font-semibold px-7 py-3 rounded-2xl hover:border-primary hover:text-primary active:scale-95 transition-all text-sm"
        >
          View Portfolio
        </Link>
      </div>

      {/* Auto-redirect notice */}
      <p className="mt-10 text-gray-600 text-sm z-10">
        Redirecting to home in{" "}
        <span className="text-primary font-semibold tabular-nums">{countdown}s</span>
        {" "}—{" "}
        <button
          onClick={() => navigate("/")}
          className="text-primary hover:underline focus:outline-none"
        >
          go now
        </button>
      </p>

      {/* Bottom nav hint */}
      <div className="absolute bottom-8 flex gap-6 text-gray-700 text-xs z-10">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
      </div>
    </div>
  );
};

export default NotFound;
