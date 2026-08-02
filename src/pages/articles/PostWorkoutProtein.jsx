import { Link } from "react-router-dom";
import Container from "../../components/Container";
import DownloadButton from "../../components/DownloadButton";
import img3 from "../../assets/images/6.jpg";

const PostWorkoutProtein = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <img
          src={img3}
          alt="Post-Workout Protein"
          className="w-full max-h-[450px] object-cover rounded-3xl mb-12"
        />

        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
          Men Health
        </p>
        <h1 className="text-4xl font-bold font-serif mb-6 max-w-3xl">
          Build Muscle Faster: Men's Guide to Post-Workout Protein
        </h1>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          This comprehensive blog covers the crucial role of protein in post-workout nutrition for men,
          detailing the best animal and plant sources to meet daily requirements. The article provides
          accurate, meticulously verified information to support muscle building and enhance athletic
          performance.
        </p>

        <hr className="border-[#272727] mb-12" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">
          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-3">
              Why Aren't You Seeing Results Despite Regular Workouts?
            </h2>
            <p>
              Many men wonder why consistent training doesn't always translate into the desired results.
              The key often lies in proper nutrition. Adequate protein intake plays a vital role in
              achieving goals like muscle building, fat loss, and overall strength, as protein is the
              fundamental nutrient required for muscle repair and growth.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-bold font-serif mb-4">
              Top Animal-Based Protein Sources for Strength and Muscle Building
            </h2>
            <div className="space-y-5">
              {[
                { name: "Eggs – The Nutritional Powerhouse", desc: "An egg typically contains 6 to 7 grams of high-quality protein along with essential nutrients like phospholipids, omega-3 fatty acids, and vitamin D, all contributing to optimal muscle development and recovery after workouts." },
                { name: "Salmon – A Superior Choice for Heart and Muscle Health", desc: "An 85-gram serving of salmon provides approximately 17 to 18 grams of protein, enriched with omega-3 fatty acids and various B vitamins that aid overall athletic performance." },
                { name: "Chicken Breast – Pure, Lean Protein for Active Lifestyles", desc: "An 85-gram portion of chicken breast offers around 26.7 grams of protein, coupled with vitamins B3 and B6, which enhance the body's energy levels and exercise performance." },
                { name: "Dairy Products – A Balanced Blend of Fast and Slow Digesting Proteins", desc: "A cup of whole milk yogurt delivers roughly 8 grams of protein, accompanied by minerals and vitamins essential for maintaining robust muscles and bones." },
                { name: "Tuna – The Ideal Option for a Healthy Diet", desc: "Approximately 85 grams of tuna contain about 20 grams of protein, enriched with omega-3 fatty acids and vitamins such as A, B12, and B6, promoting muscle maintenance and overall body function." },
                { name: "Cow's Milk – An All-Round Nutrient-Boosting Drink", desc: "A cup of full-fat cow's milk provides about 8 grams of protein and numerous essential nutrients that support muscular and skeletal health." },
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
              Plant-Based Protein Options: Nutritious and Delicious Alternatives
            </h2>
            <div className="space-y-5">
              {[
                { name: "Soybeans – The Efficient Plant Protein", desc: "Half a cup (around 86 grams) of cooked soybeans supplies about 16 grams of protein along with key minerals like iron, phosphorus, and vitamin K." },
                { name: "Beans – A Versatile Protein Source", desc: "A cup of cooked beans delivers roughly 15 grams of protein along with B vitamins, phosphorus, magnesium, and iron." },
                { name: "Quinoa – The Superfood of Energy", desc: "One cooked cup of quinoa contains approximately 8 grams of protein and is a great source of carbohydrates, powering your workouts efficiently." },
                { name: "Peanuts – Multi-Benefit Nutritious Snack", desc: "Every 28 grams of peanuts provides around 7 grams of protein, 6 grams of carbohydrates, and a significant amount of healthy unsaturated fats." },
                { name: "Chickpeas – The Complete Meal Component", desc: "A 164-gram serving of canned chickpeas provides about 15 grams of protein and 45 grams of carbohydrates along with a moderate amount of dietary fiber." },
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
              Determining Your Daily Protein Requirements as an Active Individual
            </h2>
            <p className="mb-4">Protein needs vary based on muscle mass and physical activity level:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-white font-semibold">Less active individuals:</span> About
                0.8 grams per kilogram of body weight is recommended daily.
              </li>
              <li>
                <span className="text-white font-semibold">Athletes:</span> The requirement
                increases to 1.2 to 1.7 grams per kilogram of body weight.
              </li>
            </ul>
            <p className="mt-4">
              A balanced intake of both animal and plant proteins not only supports muscle building but
              also enhances bone health. Consuming protein post-workout is critical to maximize the
              benefits of training.
            </p>
            <p className="mt-4 text-primary font-semibold">
              What are your favorite protein-rich foods to meet your daily nutritional needs?
            </p>
          </section>
        </div>
        <DownloadButton
          downloadPath="/files/Blogs/Unleashing the Power of Protein_ Your Ultimate Guide to Post-Workout Nutrition.updated.docx"
          fileName="Unleashing the Power of Protein_ Your Ultimate Guide to Post-Workout Nutrition.updated.docx"
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

export default PostWorkoutProtein;
