import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img2 from "../../assets/images/4.jpg";

const SugarSubstitutes = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img
          src={img2}
          alt="Sugar Substitutes"
          className="w-full max-h-[450px] object-cover rounded-3xl mb-12"
        />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
          Elderly Health
        </p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          Smart Sugar Substitutes For Elderly Patients: Are They Truly Healthy?
        </h1>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          A comprehensive overview of natural, artificial, and sugar alcohol sweeteners, outlining
          benefits, precautions, and practical guidance for balanced, personalized use for seniors
          based on current evidence.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <p>
              Added sugars contribute significantly to obesity, dysglycemia, cardiovascular disease, and
              other chronic conditions when consumed excessively. Rising awareness of these risks drives
              interest in alternative sweeteners that preserve palatability without adverse metabolic
              effects. Yet no substitute is risk-free when overused.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Natural Sweeteners</h2>
            <div className="space-y-4">
              {[
                {
                  name: "Stevia",
                  desc: "Derived from Stevia rebaudiana leaves, providing intense sweetness without measurable calories or glycemic impact. Older adults should choose high-purity formulations and check for digestive tolerance.",
                },
                {
                  name: "Monk Fruit",
                  desc: "Mogrosides extracted from Siraitia grosvenorii fruit yield high-intensity sweetness with negligible calories. Suitable for diabetes management in seniors.",
                },
                {
                  name: "Honey",
                  desc: "Contains fructose, glucose, and trace antioxidants. Because honey raises blood glucose similarly to sugar, it should be used sparingly in older adults with diabetes or cardiovascular risk.",
                },
                {
                  name: "Coconut Sugar",
                  desc: "Partially processed sap with a lower glycemic index than refined sugar but similar caloric density. Can still raise blood glucose and may not be ideal for seniors with metabolic issues.",
                },
              ].map((item) => (
                <div key={item.name}>
                  <h3 className="text-lg text-primary font-semibold mb-1">{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">
              Artificial (Non-nutritive) Sweeteners
            </h2>
            <p className="mb-3">
              Options include Saccharin, Aspartame, Sucralose, Acesulfame K, and others. They provide
              sweetness with negligible or zero calories and minimal acute glycemic impact.
            </p>
            <p>
              <span className="text-white font-semibold">Precautions:</span> Some individuals may
              experience altered appetite or cravings. Read ingredient lists carefully to avoid hidden
              additives, and practice mindful eating to prevent compensatory overeating.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Sugar Alcohols (Polyols)</h2>
            <p className="mb-3">
              Examples include Erythritol, Xylitol, Sorbitol, and Mannitol. They offer fewer calories
              and modest glycemic effects.
            </p>
            <p>
              <span className="text-white font-semibold">Tolerance:</span> Excess can cause bloating,
              gas, and diarrhea; older adults should introduce them gradually to assess tolerance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">Guiding Principles for Safe Use</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Gradually reduce preference for intense sweetness; emphasize natural flavors.</li>
              <li>Select sweeteners aligned with individual health profile.</li>
              <li>Practice label literacy: check for multiple sweeteners or unwanted additives.</li>
              <li>Rotate among different alternatives; avoid reliance on a single option.</li>
              <li>Seek professional advice when health conditions warrant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-3">Conclusion</h2>
            <p>
              No sugar substitute is entirely free of risk when overused. Informed, moderate, and
              personalized use allows occasional sweetness while minimizing potential downsides for
              seniors. What sugar substitute have you tried?
            </p>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/Smart Sugar Substitutes_ Are They Truly Healthy. updated.docx"
          fileName="Smart Sugar Substitutes_ Are They Truly Healthy. updated.docx"
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

export default SugarSubstitutes;
