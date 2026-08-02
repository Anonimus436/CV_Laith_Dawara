import { Link, useLocation } from "react-router-dom"

const Linkwork = ({ Img1, Text1, link1, editLink, imgHeight }) => {
  const location = useLocation();
  // imgHeight lets callers set a fixed image height (e.g. "h-52" for Select Works).
  // Falls back to the original proportional value used on the Portfolio page.
  // const imgClass = imgHeight
  //   ? `${imgHeight} w-full object-cover p-2.5 rounded-3xl! group-hover:scale-105 duration-500`
  //   : "h-[80%]! p-2.5 rounded-3xl! group-hover:scale-105 duration-500"

  return (
    <div className="bg-[#141414] rounded-3xl! group relative">
      <Link to={link1}>
        <img src={Img1} className="h-[80%]! p-2.5 rounded-3xl! group-hover:scale-105 duration-500" alt={Text1} />
        <div className="flex justify-between gap-10 mt-3 mx-4 pb-4 max-h-full! max-[570px]:m-1.5!">
          <h2 className="text-[13px] font-medium font-serif max-[570px]:text-[13px]">{Text1}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
             className="bi bi-arrow-up-right font-extrabold! mt-2 text-primary transition-transform group-hover:rotate-45 duration-300"
             viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
          </svg>
        </div>
      </Link>

      {/* Edit button — only rendered when editLink is provided */}
      {editLink && (
        <Link
          to={`/admin-login?redirect=${encodeURIComponent(editLink)}`}
          state={{ from: location.pathname }}
          onClick={(e) => e.stopPropagation()}
          title="Edit card"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-xl bg-black/60 border border-[#333] text-gray-400 hover:text-primary hover:border-primary opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
          </svg>
        </Link>
      )}
    </div>
  )
}

export default Linkwork