import Container from "../../components/Container";
import Title from "../../components/Title";
import Button from "../../components/Button";
import AboutEdit from "../../components/AboutEdit";

const About = () => {
  return (
    <div>
        <Container>
          <Title title={"ABOUT ME"}/>
          <div className="flex justify-between max-[1024px]:flex-col max-[1024px]:gap-5 max-[700px]:items-center">
          <h1 className="text-[2rem] text-white font-bold font-serif max-w-150 max-[700px]:text-center">Connecting ideas to drive growth!</h1>
          <Button typebutton={"button"} text={"Learn More"} size={"h-full!"} alignsize={"max-[1024px]:max-w-50"} link={"/about"}/>
          </div>          
          <AboutEdit/>
         </Container>
        
    </div>
  )
}

export default About