import { Link, useLocation } from "react-router-dom"
import About_Info from "../sections/About/About_Info"
import Title_About from "../sections/About/Title_About"

const About = () => {
    const location = useLocation();
    document.title = "About Me - Laith Dawara";
    return (
        <div>
            <Title_About/>
            <About_Info/>
            <div className="flex justify-end px-4 py-6">
                <Link
                    to="/admin-login?redirect=/about/edit"
                    state={{ from: location.pathname }}
                    className="inline-flex items-center gap-2 bg-primary text-black font-bold py-2.5 px-5 rounded-xl hover:opacity-90 active:scale-95 transition-all text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                    Edit About
                </Link>
            </div>
        </div>
    )
}

export default About
