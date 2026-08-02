import { Link } from "react-router-dom"

const Button = ({ text, link , typebutton , size , alignsize}) => {
    return (
        <button type={typebutton}
            className={`main-btn cursor-pointer py-2.5 px-8 font-medium text-black bg-primary
 rounded-4xl text-[1.2rem] relative overflow-hidden z-1 duration-300 hover:bg-white ${size} ${alignsize}`}>
            <Link to={link} className="flex items-center justify-center gap-4 group base">{text}<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill groupClass" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg></span></Link>
        </button>
    )
}

export default Button