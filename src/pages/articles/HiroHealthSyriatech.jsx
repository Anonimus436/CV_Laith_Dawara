import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img8 from "../../assets/images/download1.jpg";

const HiroHealthSyriatech = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img src={img8} alt="Hiro Health - Syria Tech" className="w-full max-h-[450px] object-cover rounded-3xl mb-12" />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Digital Health</p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          How Hiro Health Technology Is Changing Healthcare in Syria
        </h1>
        <p className="text-gray-500 text-sm mb-4">Published in: <span className="text-gray-300 font-medium">Syria Tech</span></p>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          How Hiro Health — Syria's first health-tech startup — succeeded in transforming the way
          care is delivered and overcoming deep structural challenges.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <p>
              Hiro Health emerged in 2020 as Syria's first startup operating in the health
              technology space, with the goal of providing integrated digital solutions that
              improve the medical landscape, elevate care quality, and enhance patient experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Direct Impact on Healthcare</h2>
            <div className="space-y-5">
              {[
                { title: "1. Effective Digital Clinic Management", body: "A technical infrastructure that integrates records management and connects departments within a unified system — leveraging blockchain technology for data security, automated appointments, and report generation." },
                { title: "2. Expanding Patient Access to Services", body: "Remote medical consultations available at any time and place, enabling patients in remote areas and during the COVID-19 pandemic to reach doctors easily." },
                { title: "3. Increasing Physician Efficiency", body: "Integrated digital work tools allow doctors to focus on clinical aspects and improve the overall quality of care they provide." },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-primary pl-5">
                  <h3 className="text-lg text-white font-semibold mb-1">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Challenges Faced by Hiro Health</h2>
            <div className="space-y-4">
              {[
                { title: "1. Low Digital Literacy", body: "Limited tech awareness among doctors and patients required ongoing education and repeated training programs." },
                { title: "2. Technical Barriers and Limited Infrastructure", body: "Restricted internet connectivity, lack of suitable devices, and difficulty integrating new systems with existing processes." },
                { title: "3. Limited Institutional Adoption", body: "Resistance from some medical institutions due to attachment to traditional methods and reluctance to change." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg text-primary font-semibold mb-1">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-4">
              Hiro Health is looking ahead to introducing the latest technologies and artificial
              intelligence, while strengthening regional partnerships to expand its services across
              the MENA region.
            </p>
            <p className="text-primary font-semibold">
              Are we now ready for a complete digital transformation in Syria's healthcare system?
            </p>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/مقال موقع Syriatech معدّل نهائي.docx"
          fileName="مقال موقع Syriatech معدّل نهائي.docx"
        />
        <div className="mt-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HiroHealthSyriatech;
