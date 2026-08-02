import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img4 from "../../assets/images/60.png";

const AIDiagnosis = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img
          src={img4}
          alt="AI Medical Diagnosis"
          className="w-full max-h-[450px] object-cover rounded-3xl mb-12"
        />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
          Medical Technology
        </p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          Medical Diagnosis: AI vs. Human Doctors — What the Latest Studies Reveal
        </h1>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          An in-depth look at how AI diagnostic tools compare to general and specialist physicians,
          the challenges of clinical integration, and recent innovations reshaping medical practice.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <p>
              AI tools have evolved dramatically in recent years and found application across many
              fields — medicine included. AI has demonstrated a meaningful role in improving healthcare
              quality and raising the efficiency of medical practice, especially in diagnosis. It is
              widely used for reading and analyzing various types of radiological images, interpreting
              lab results, and helping physicians process massive volumes of data at speeds beyond
              traditional human capability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">
              The Key Question: Does AI Match a Human Doctor's Diagnostic Accuracy?
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "1. AI Accuracy vs. General Practitioners",
                  body: "A study by Takita et al. (2025), published in Nature Digital Medicine, found that AI diagnostic accuracy was 52.1% — close to the performance of non-specialist physicians. This suggests AI can be an effective assistant in routine cases.",
                },
                {
                  title: "2. AI Accuracy vs. Specialist Physicians",
                  body: "In contrast, the same study found AI accuracy was notably lower when compared to specialist physician performance, indicating that AI still needs improvement to reach expert-level standards.",
                },
                {
                  title: "3. AI in Digital Pathology Image Analysis",
                  body: "A study by McGenity et al. (2024), published in npj Digital Medicine, indicated that AI is capable of analyzing digital pathology images with high accuracy in some cases, contributing to early diagnosis and supporting clinical decisions.",
                },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-primary pl-5">
                  <h3 className="text-lg text-white font-semibold mb-2">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">
              Challenges of Integrating AI into Medical Practice
            </h2>
            <div className="space-y-5">
              {[
                { name: "1. Data Errors and Bias", desc: "AI systems rely on datasets to generate diagnoses. If data is incomplete or biased, this leads to inaccurate results or misdiagnosis." },
                { name: "2. Limited Technological Awareness", desc: "Both physicians and patients need to understand how AI works to use it correctly and safely." },
                { name: "3. Trust and Human Interaction", desc: "Relying on AI alone in diagnosis can affect the traditional doctor-patient relationship. Physicians must maintain a supervisory role to ensure results are integrated safely." },
              ].map((item) => (
                <div key={item.name}>
                  <h3 className="text-lg text-primary font-semibold mb-1">{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-3">
              Improving AI Diagnostic Accuracy: New Developments
            </h2>
            <p>
              Microsoft developed an advanced system known as MAI-DxO, which managed to diagnose some
              complex medical cases with accuracy approaching 85% compared to general practitioners.
              This type of innovation illustrates how AI can become an effective assistive tool for
              physicians, with future expectations of further improvement and deeper integration with
              medical practice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-3">Conclusion</h2>
            <p className="mb-4">
              AI represents an effective and supportive tool for physicians, contributing to improved
              medical practice and the quality of healthcare provided. Nevertheless, its role remains
              complementary — not a replacement for the human physician.
            </p>
            <p className="text-primary font-semibold">
              Do you believe AI could replace human physicians in the future, or will the doctor's
              role remain irreplaceable?
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold font-serif mb-3">Sources</h2>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="https://www.nature.com/articles/s41746-025-01543-z" target="_blank" rel="noopener noreferrer" className="hover:text-primary duration-200">
                  Takita et al. (2025) — Nature Digital Medicine
                </a>
              </li>
              <li>
                <a href="https://pubmed.ncbi.nlm.nih.gov/38704465/" target="_blank" rel="noopener noreferrer" className="hover:text-primary duration-200">
                  McGenity et al. (2024) — npj Digital Medicine
                </a>
              </li>
              <li>
                <a href="https://time.com/7299314/microsoft-ai-better-than-doctors-diagnosis/" target="_blank" rel="noopener noreferrer" className="hover:text-primary duration-200">
                  MAI-DxO — Time Magazine
                </a>
              </li>
            </ul>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/التشخيص الطبي بين الذكاء الاصطناعي والطبيب البشري آخر ما تكشفه الدراسات.docx"
          fileName="التشخيص الطبي بين الذكاء الاصطناعي والطبيب البشري آخر ما تكشفه الدراسات.docx"
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

export default AIDiagnosis;
