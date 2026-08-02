import Form from "../sections/Contact/Form";
import Title_Contact from "../sections/Contact/Title_Contact" ;

const Contact = () => {
  document.title = "Contact - Laith Dawara";
  return (
    <div>
        <Title_Contact/>
        <Form/>
    </div>
  )
}

export default Contact