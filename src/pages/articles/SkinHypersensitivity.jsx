import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img1 from "../../assets/images/1.jpg";

const SkinHypersensitivity = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img
          src={img1}
          alt="Skin Hypersensitivity"
          className="w-full max-h-[450px] object-cover rounded-3xl mb-12"
        />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
          Women Health
        </p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          Skin Hypersensitivity in Women: Types, Causes, and Most Effective Treatments
        </h1>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          Detailing women's skin hypersensitivity types, diagnostic approaches, and optimal treatment
          strategies in a clear, professional tone.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-3">
              Why Should Skin Hypersensitivity in Women Not Be Ignored?
            </h2>
            <p>
              Skin hypersensitivity arises when the immune system overreacts to normally harmless
              substances—such as certain foods, medications, cosmetics, or environmental triggers—leading
              to uncomfortable or sometimes debilitating skin reactions. Although rarely life-threatening,
              these conditions can significantly impair women's daily activities, sleep quality, and
              psychological well-being. Women may be particularly affected due to hormonal changes during
              menstruation, pregnancy, or menopause, which can make the skin more reactive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">
              Key Forms of Skin Hypersensitivity in Women
            </h2>
            <div className="space-y-6">
              {[
                {
                  name: "Atopic Dermatitis",
                  desc: "Appears as dry, red, itchy skin patches, often on the face, hands, and body folds. Flare-ups may worsen during pregnancy or hormonal changes. Frequent triggers include harsh skincare products, detergents, and cosmetics.",
                },
                {
                  name: "Urticaria",
                  desc: "Presents as red, raised welts that itch and shift location within hours. In women, episodes may increase during menstruation, pregnancy, or stress. Acute urticaria is often caused by foods, medications, or insect stings.",
                },
                {
                  name: "Contact Dermatitis",
                  desc: "Develops after exposure to irritants or allergens such as nickel in jewelry, fragrances, cosmetics, or cleaning agents. It causes localized redness, swelling, or peeling at the contact site.",
                },
                {
                  name: "Angioedema",
                  desc: "Involves sudden, deep swelling of the eyelids, lips, hands, or feet, usually without itching. In women, it may be triggered by foods, drugs, insect venoms, or hormonal medications. When swelling threatens the airway, emergency treatment is required.",
                },
              ].map((item) => (
                <div key={item.name}>
                  <h3 className="text-xl text-primary font-semibold mb-2">{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-3">
              How Do We Identify the Triggers? Diagnosis as the First Step
            </h2>
            <p>
              Diagnosis relies on a thorough clinical assessment and a detailed medical history. The skin
              prick test remains the standard method for identifying specific allergens: small amounts of
              suspected substances are applied to the skin, and the appearance of a wheal-and-flare
              reaction within 15–20 minutes confirms sensitization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">
              Most Suitable Treatment Plans for Each Type
            </h2>
            <p className="mb-4">
              Management begins with avoiding known triggers and restoring the skin's protective barrier.
              In atopic dermatitis, daily emollient use is essential; low- to mid-potency topical
              corticosteroids reduce inflammation, and antihistamines relieve itching.
            </p>
            <p className="mb-4">
              In urticaria, second-generation H1 antihistamines are first-line therapy. Chronic,
              treatment-resistant urticaria often responds to add-on therapy with omalizumab.
            </p>
            <p className="mb-4">
              Treatment of contact dermatitis focuses on strict avoidance of the offending agent,
              combined with topical corticosteroids and emollients.
            </p>
            <p>
              For angioedema, antihistamines suffice in mild episodes. Systemic corticosteroids are added
              for more pronounced swelling, and intramuscular epinephrine is life-saving when airway
              obstruction is imminent.
            </p>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/Skin Hypersensitivity_ Types, Causes, and Most Effective Treatments. updated.docx"
          fileName="Skin Hypersensitivity_ Types, Causes, and Most Effective Treatments. updated.docx"
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

export default SkinHypersensitivity;
