import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img5 from "../../assets/images/63.png";

const PeriodicCheckups = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img
          src={img5}
          alt="Periodic Checkups for Men"
          className="w-full max-h-[450px] object-cover rounded-3xl mb-12"
        />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
          Men's Health
        </p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          Why Are Periodic Checkups Essential for Men After 30?
        </h1>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          A comprehensive guide covering the most important medical checkups for men after 30,
          with daily health habits for preventing chronic diseases.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <p>
              After the age of 30, the body begins sending warning signals about potential health
              problems in the future — ignoring them today can lead to complications tomorrow. At
              this stage, physical and hormonal changes gradually appear, and men become more
              susceptible to heart disease, vitamin and mineral deficiencies, and other
              lifestyle-related health issues. That is why periodic checkups become essential for
              men to ensure prevention and maintain energy levels and quality of life.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">
              5 Key Checkups to Protect Men's Health After 30
            </h2>
            <p className="mb-6">
              Understanding the importance of checkups after 30, here are the five most important
              tests men should have regularly to stay healthy and detect any potential issues early:
            </p>
            <div className="space-y-6">
              {[
                {
                  title: "1. Blood Pressure Measurement",
                  body: "The risk of high blood pressure increases with age due to factors like physical inactivity, smoking, stress, and unhealthy eating habits. Men should maintain a blood pressure below 120/80 mmHg, and it is recommended to have it checked at least once a year.",
                },
                {
                  title: "2. Cholesterol Blood Test",
                  body: "Elevated LDL (bad cholesterol) increases the risk of heart attacks and strokes. Men with risk factors should have frequent testing, while those with healthy levels can check every 5 years.",
                },
                {
                  title: "3. Hemoglobin A1C Test",
                  body: "As men age, the risk of Type 2 diabetes increases. This test is recommended for men with a BMI of 25 or more, or those with other risk factors.",
                },
                {
                  title: "4. Body Mass Index (BMI)",
                  body: "BMI is an ideal tool for screening obesity when used alongside other metrics. Annual checkups are recommended for everyone, especially those with risk factors.",
                },
                {
                  title: "5. Prostate Exam",
                  body: "After the age of 30, prostate health deserves attention. Men with a family history of prostate cancer are advised to consult their doctor starting from age 40.",
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
              Essential Health Habits for Every Man After 30
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: "1. Follow a Healthy Diet",
                  body: "Balanced meals rich in vegetables, fruits, and healthy proteins — while reducing saturated fats, sugars, and avoiding smoking.",
                },
                {
                  title: "2. Exercise Regularly",
                  body: "Consistent physical activity is essential for maintaining heart health, improving body flexibility, and preventing weight gain.",
                },
                {
                  title: "3. Maintain Sleep Quality and Reduce Stress",
                  body: "Poor sleep or chronic stress increases the risk of high blood pressure, diabetes, and weakened immunity. Good sleep and relaxation are an integral part of a healthy lifestyle.",
                },
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
              As men reach 30, their bodies enter a new phase that requires greater attention to
              health. Periodic checkups alongside a healthy lifestyle are essential tools for
              long-term prevention of chronic diseases.
            </p>
            <p className="text-primary font-semibold">
              Reflect now: Which of these checkups do you consider a priority after turning 30?
              And have you already started monitoring your health regularly?
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold font-serif mb-3">Sources</h2>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="https://stvincents.org/about-us/news-press/news-detail?articleId=57012&publicid=395" target="_blank" rel="noopener noreferrer" className="hover:text-primary duration-200 break-all">
                  St. Vincent's Health — Men's Health Screenings
                </a>
              </li>
              <li>
                <a href="https://www.thorne.com/take-5-daily/article/mayo-clinic-essential-health-screenings-for-men" target="_blank" rel="noopener noreferrer" className="hover:text-primary duration-200 break-all">
                  Thorne / Mayo Clinic — Essential Health Screenings for Men
                </a>
              </li>
            </ul>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/لماذا تعد الفحوصات الدورية ضرورية للرجل بعد سن الثلاثين.docx"
          fileName="لماذا تعد الفحوصات الدورية ضرورية للرجل بعد سن الثلاثين.docx"
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

export default PeriodicCheckups;
