import Title_Port from "../sections/Portfolio/Title_Port"
import Works from "../sections/Portfolio/Works"

const Results = () => {
    document.title = "Portfolio - Laith Dawara";
    return (
        <div>
            <Title_Port/>
            <Works/>
        </div>
    )
}

export default Results