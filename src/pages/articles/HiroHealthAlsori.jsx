import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img6 from "../../assets/images/download-1-1.png";

const HiroHealthAlsori = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img src={img6} alt="Hiro Health - Alsori Press" className="w-full max-h-[450px] object-cover rounded-3xl mb-12" />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Digital Health</p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          How Hiro Health Is Reshaping the Future of Healthcare in Syria
        </h1>
        <p className="text-gray-500 text-sm mb-4">Published in: <span className="text-gray-300 font-medium">Alsori Press</span></p>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          An in-depth look at Hiro Health's pioneering role in transforming the Syrian healthcare
          sector through integrated digital solutions that address the most pressing challenges
          faced by patients, doctors, and medical institutions.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <p>
              Hiro Health is one of the leading startups in the digital health space across the
              MENA region. Headquartered in Spain, it began offering its services in Syria in 2020.
              The company aims to provide intelligent digital solutions that contribute to improving
              the deteriorating state of healthcare, and has successfully bridged critical gaps
              within the health system despite significant economic and social challenges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">The Digital Transformation Driven by Hiro Health</h2>
            <p>
              The company introduced a comprehensive automation system for managing operations
              inside hospitals and health centers, and launched two applications:{" "}
              <span className="text-primary font-medium">Hiro Health Patient</span> for patients
              and <span className="text-primary font-medium">Hiro Health Doctor</span> for physicians.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">How Has Hiro Health Contributed to Developing the Health System?</h2>
            <div className="space-y-5">
              {[
                { title: "1. Administrative Process Automation", body: "Focused on automating routine operations: appointment scheduling, patient data documentation, reminder delivery, and the exchange of reports and radiological images." },
                { title: "2. Electronic Health Records", body: "Relied on cloud storage with advanced cybersecurity to protect data, forming the first unified health database in the region." },
                { title: "3. Remote Medical Consultations", body: "Empowered patients to connect with doctors at any time and from any location, expanding access to care — especially in remote areas." },
                { title: "4. Digital Communication Between Care Providers", body: "Unified health information coordination to enable fast sharing across departments, accelerating medical decision-making." },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-primary pl-5">
                  <h3 className="text-lg text-white font-semibold mb-1">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Tangible Results of the Digital Revolution</h2>
            <div className="space-y-4">
              {[
                { title: "1. Reduction in Medical Errors", body: "Accurate, up-to-date data reduced errors caused by miscommunication and improved the quality of clinical decisions." },
                { title: "2. Lower Financial Burden", body: "Printing, paper storage, and transportation costs dropped significantly, relieving financial pressure on health centers and patients alike." },
                { title: "3. Greater Reach of Health Services", body: "A larger number of patients can now receive care without traveling or waiting in long queues." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg text-primary font-semibold mb-1">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-primary font-semibold">
              The most important question remains: Is Syria now closer than ever to achieving a
              world-class digital health system?
            </p>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/مقال Alsori  معدل نهائي Press.docx"
          fileName="مقال Alsori  معدل نهائي Press.docx"
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

export default HiroHealthAlsori;
