import About from "../sections/Home/About"
import Brands from "../sections/Home/Brands"
import Contact from "../sections/Home/Contact"
import Hero from "../sections/Home/Hero"
import Select_Works from "../sections/Home/Select_Works"
import Services from "../sections/Home/Services"

const Home = () => {
    document.title = "Home - Laith Dawara";
    return (
        <>
            <Hero/>
            <Services/>
            <Select_Works/>
            <About/>
            <Brands/>
        </>
    )
}

export default Home