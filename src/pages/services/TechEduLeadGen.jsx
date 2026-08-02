import { Link } from "react-router-dom";
import Container from "../../components/Container";

const strategy = [
  "Launched a funnel-based Meta campaign (Top of Funnel – Middle of Funnel – Bottom of Funnel).",
  "Conducted creative split testing (video vs. carousel).",
  "Used a WhatsApp call-to-action for lead nurturing and directed traffic to the website.",
];

const results = [
  "1,170 qualified leads generated in 20 days",
  "Cost per Lead (CPL): 145 EGP",
  "Return on Ad Spend (ROAS): 5.2",
  "Conversion rate to paying customers: 23%",
];

export default function TechEduLeadGen() {
  document.title = "Tech Education - Laith Dawara";
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>

        {/* Case study number + title */}
        <div className="flex items-start gap-6 mb-10">
          <span className="font-extrabold text-[5rem] leading-none text-primary select-none">04.</span>
          <div className="pt-4">
            <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold mb-1">Case Study</p>
            <h1 className="text-4xl font-bold font-serif">Tech Education Lead Generation</h1>
          </div>
        </div>

        <hr className="border-[#272727] mb-10" />

        <div className="max-w-3xl space-y-10 text-gray-300 leading-relaxed text-[1.05rem]">

          {/* Client & Objective */}
          <section className="space-y-3">
            <p>
              <span className="text-white font-semibold">Client: </span>
              Online &amp; Virtual Education Startup
            </p>
            <p>
              <span className="text-white font-semibold">Objective: </span>
              Acquire qualified leads for an English–Arabic Personal Development course.
            </p>
          </section>

          {/* Strategy */}
          <section>
            <h2 className="text-xl text-white font-bold uppercase tracking-widest mb-5">Strategy</h2>
            <ul className="space-y-4">
              {strategy.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-primary font-bold mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Platforms */}
          <section>
            <p>
              <span className="text-white font-semibold uppercase tracking-widest">Platforms: </span>
              Meta Ads (Facebook &amp; Instagram) + Google Ads
            </p>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-xl text-white font-bold uppercase tracking-widest mb-5">Results</h2>
            <ul className="space-y-3">
              {results.map((r, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Back */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Home
          </Link>
          <a
            href="/files/Portfolio-Laith.pdf"
            download="Portfolio-Laith.pdf"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline hover:opacity-80 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
            </svg>
            For more information
          </a>
        </div>

      </Container>
    </div>
  );
}
