import { Link } from "react-router-dom";
import Container from "../../components/Container" ;
import Title from "../../components/Title" ;

const PDF_PATH = "/files/Portfolio-Laith.pdf";

const services = [
  { id: 1, to: "/Hadaya", title: "Hadaya - Community Growth", text: "Expand the brand's community, foster meaningful connections and increase both engagement and sales through targeted campaigns."},
  { id: 2, to: "/EasySales", title: "Lead Generation - EasySales GmbH", text: "Acquire high-intent leads for purchasing products and promoting the company's offers."},
  { id: 3, to: "/HS", title: "HS.ORG", text: "Increase revenue through effective integration between marketing and sales teams."},
  { id: 4, to: "/Tech", title: "Tech Education Lead Generation", text: "Obtain qualified leads for a personal development training course in both English and Arabic."},
];

export default function Services() {
  return (
    <Container>
        <Title title={"SERVICES"}/>
        <h1 className="text-[2.5rem] text-white font-bold font-serif max-w-250 max-[700px]:text-center">Tailored strategies to enhance your brand visibility!</h1>
    <div className="grid grid-cols-2 gap-8 py-10 max-[768px]:grid-cols-1">
      {services.map(s => (
        <Link key={s.id} to={s.to}>
          <div
            className="relative overflow-hidden rounded-3xl bg-[#141414] p-6 border-2 border-transparent transition-colors duration-300 group hover:bg-black hover:border-[#272727] min-h-full! max-[768px]:max-w-[90%] max-[768px]:mx-auto"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute right-[-6%] top-[8%] -rotate-6 z-0 font-extrabold leading-[0.8] text-[clamp(3rem,12vw,12rem)] text-gray-500/6"
            >
              {s.id}
            </span>

            <div className="relative z-10">
              <h1 className="flex items-center justify-between font-serif text-[1.7rem] max-[470px]:text-[1.3rem]">
                {s.title}
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                       className="bi bi-arrow-up-right font-extrabold text-primary transition-transform group-hover:rotate-45 duration-300"
                       viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
                  </svg>
                </span>
              </h1>
              <p className="text-zinc-400 mt-4">{s.text}</p>
              <a
                href={PDF_PATH}
                download="Portfolio-Laith.pdf"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-primary hover:underline hover:opacity-80 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                </svg>
                For more information
              </a>
            </div>
          </div>
        </Link>
      ))}
    </div>
    <hr className="max-w-full h-2 text-[#272727] my-8"/>
    </Container>
  );
}