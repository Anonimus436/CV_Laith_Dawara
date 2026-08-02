import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img9 from "../../assets/images/skill3.jpg";

const HiroHealthSyriaToday = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img src={img9} alt="Hiro Health - Syria Today 24" className="w-full max-h-[450px] object-cover rounded-3xl mb-12" />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Digital Health</p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          Digital Transformation in the Syrian Medical Sector Led by Hiro Health
        </h1>
        <p className="text-gray-500 text-sm mb-4">Published in: <span className="text-gray-300 font-medium">Syria Today-24</span></p>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          A comprehensive overview of Hiro Health's contribution since 2020 in building an
          integrated digital health ecosystem in Syria.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <p>
              Hiro Health began its operations in Syria in 2020, adopting innovative digital
              solutions to fill critical gaps in the medical sector. Its role became especially
              prominent after the COVID-19 pandemic, as it strengthened remote access to care and
              eased the burden on medical institutions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Addressing Healthcare Challenges in Syria</h2>
            <div className="space-y-4">
              {[
                { title: "1. Supporting Medical Staff", body: "Electronic health records simplified data access and reduced wasted time, allowing staff to manage more cases efficiently." },
                { title: "2. Reducing Operational Costs", body: "Automation systems reduced reliance on paper and enabled early detection of supply shortages." },
                { title: "3. Improving Patient Access", body: "Remote communication with doctors from any location at any time — overcoming geographical barriers." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg text-primary font-semibold mb-1">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Hiro Health's Role in Health Infrastructure</h2>
            <div className="space-y-5">
              {[
                { title: "1. Unified Health Database", body: "Securely aggregates patient data on the cloud and provides fast, accurate access that improves diagnostic quality." },
                { title: "2. Administrative Process Automation", body: "Electronic data documentation, periodic reminders, and cross-department report sharing." },
                { title: "3. Online Appointment Booking System", body: "Book medical appointments without waiting or prior in-person visits — organizing doctor schedules and saving time." },
                { title: "4. Digital Exchange of Medical Data", body: "Better coordination between care providers for chronic or complex cases." },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-primary pl-5">
                  <h3 className="text-lg text-white font-semibold mb-1">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-3">Improving the Patient Experience</h2>
            <p className="mb-4">Through digital platforms, patients can now:</p>
            <ul className="space-y-2">
              {[
                "Access remote medical consultations at minimal cost.",
                "Track their condition through a secure Electronic Health Record (EHR).",
                "Book appointments without needing to travel.",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-primary font-bold">●</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="mb-4">
              The digital transformation led by Hiro Health marks a turning point in Syrian
              healthcare and opens new horizons for global partnerships and investment.
            </p>
            <p className="text-primary font-semibold">
              How can we continue to improve the efficiency of digital health services in Syria?
            </p>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/موقع سوريا اليوم-24 معدل نهائي.docx"
          fileName="موقع سوريا اليوم-24 معدل نهائي.docx"
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

export default HiroHealthSyriaToday;
