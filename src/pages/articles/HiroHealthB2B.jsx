import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img7 from "../../assets/images/download-2.png";

const HiroHealthB2B = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img src={img7} alt="Hiro Health - B2B" className="w-full max-h-[450px] object-cover rounded-3xl mb-12" />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Digital Health</p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          Digital Transformation with Hiro Health: Better Care at Lower Cost
        </h1>
        <p className="text-gray-500 text-sm mb-4">Published in: <span className="text-gray-300 font-medium">B2B</span></p>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          How Hiro Health is reducing operational burdens in Syrian hospitals while improving care
          quality — keeping costs manageable for both patients and institutions.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <p>
              Syria's healthcare sector has faced mounting pressure due to severe shortages in
              staff and supplies, alongside rising operational costs. Against this backdrop, Hiro
              Health — a company specializing in digital health — stepped in to bridge the gap.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Hiro Health's Core Objectives</h2>
            <div className="space-y-4">
              {[
                { title: "1. Cost Reduction", body: "Digital technologies help hospitals cut financial burdens and improve patient access to medical services." },
                { title: "2. Addressing Staff Shortages", body: "Technological tools simplify routine administrative operations and reduce the reliance on human resources." },
                { title: "3. Improving Service Quality", body: "Technical solutions empower medical staff to dedicate more time to direct patient care." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg text-primary font-semibold mb-1">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">How Hiro Health Technologies Improve Care Quality</h2>
            <div className="space-y-5">
              {[
                { title: "1. Reducing the Need for Administrative Staff", body: "Automating appointment scheduling, data documentation, report exchange, and reminder delivery has significantly reduced the need for administrative personnel." },
                { title: "2. Minimizing Human Error", body: "Accurate electronic health records stored on the cloud with advanced security systems eliminate errors caused by manual processes." },
                { title: "3. Remote Consultations", body: "Available 24/7 from anywhere at minimal cost, relieving pressure on healthcare facilities." },
                { title: "4. Physician Access to Patient Data", body: "The Hiro Health Doctor app provides fast, secure access to patient records for precise medical decision-making." },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-primary pl-5">
                  <h3 className="text-lg text-white font-semibold mb-1">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-4">
              Hiro Health contributes to economic improvement by reducing operational budgets and
              providing more inclusive, affordable healthcare — which positively impacts the local
              economy.
            </p>
            <p className="text-primary font-semibold">
              Which digital services have helped you most in reducing healthcare costs?
            </p>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/مقال موقع B2B معدل نهائي.docx"
          fileName="مقال موقع B2B معدل نهائي.docx"
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

export default HiroHealthB2B;
