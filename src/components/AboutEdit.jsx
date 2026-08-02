import Experience from "./Experience"
import Card from "./Card"
import { useAbout } from "../context/AboutContext"

const AboutEdit = () => {
  const { data, SEED_PROFILE_IMG } = useAbout();
  const { bio, workExperience, education, tools, capabilities, languages, softSkills, stats } = data;

  // Split work experience into two columns (4 + 3) to match original layout
  const weCol1 = workExperience.slice(0, 4);
  const weCol2 = workExperience.slice(4);

  // Capability bar background shades (original used 3 hardcoded shades)
  const capBg = ["bg-white", "bg-[#e9e9e4]", "bg-[#dbdbd8]"];
  const capMaxW = ["max-w-full", "max-w-[90%]", "max-w-[85%]"];

  return (
    <div>
        <div className="flex flex-col justify-center gap-5 my-20 border border-[#272727] p-8 rounded-3xl">

            <div className="grid grid-cols-2 gap-y-5 gap-x-20 border-b border-[#272727] pb-6 max-[1280px]:grid-cols-1">
              <article className="flex flex-col gap-y-5">
                <h1 className="text-gray-400 text-[56px] font-medium font-serif">Hello, I am</h1>
                <h1 className="text-[56px] font-medium font-serif pl-16">{bio.name}</h1>
                <p className="flex gap-8 font-medium font-serif text-[20px] border-t border-[#272727] pt-4 max-[600px]:flex-col">Working since<span>{bio.workingSince}</span></p>
                <p className="flex gap-10 font-medium font-serif text-[20px] border-t border-[#272727] pt-4 max-[600px]:flex-col">Introduction<span style={{whiteSpace:"pre-line"}}>{bio.introduction}</span></p>
              </article>
              <article>
                <img src={bio.profileImg ?? SEED_PROFILE_IMG} className="w-full! h-full! rounded-4xl max-[1280px]:max-w-[95%] max-[1280px]:max-h-[95%] max-[1280px]:mx-auto max-[1280px]:my-5"/>
              </article>
            </div>

            <div className="grid grid-cols-3 gap-5 border-b border-[#272727] pb-20 max-[1280px]:grid-cols-2 max-[768px]:grid-cols-1">

              <article className="flex flex-col gap-10 max-[768px]:text-center!">
                <h1 className="text-[30px] font-serif mt-2">Work Experience</h1>
                {weCol1.map((item) => (
                  <Experience key={item.id} Text={item.company} Period={item.period} Img={item.logoImg ?? item.logoSeed}/>
                ))}
              </article>

              <article className="flex flex-col gap-10 mt-6">
                {weCol2.map((item) => (
                  <Experience key={item.id} Text={item.company} Period={item.period} Img={item.logoImg ?? item.logoSeed}/>
                ))}
              </article>

              <article className="flex flex-col gap-10 max-[768px]:text-center!">
                <h1 className="text-[30px] font-serif mt-2">Educational Qualification</h1>
                {education.map((item) => (
                  <div key={item.id} className="flex flex-row justify-between gap-0! max-[768px]:items-center! max-[768px]:text-center! max-[768px]:flex-col!">
                    <img src={item.logoImg ?? item.logoSeed} className="w-12! h-12! rounded-2xl"/>
                    <p className="flex flex-col font-serif text-[20px] font-medium pl-10">
                      {item.degree}
                      <span className="man-w-full! text-gray-400">{item.period}</span>
                    </p>
                  </div>
                ))}
              </article>
            </div>

            <div className="pb-5">
                <h1 className="text-[30px] font-serif mt-2 max-[600px]:text-center">Essential tools I use</h1>
                <article className="grid grid-cols-5 my-8 gap-5 max-[1250px]:grid-cols-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[600px]:grid-cols-1">
                  {tools.map((item) => (
                    <Card key={item.id} Text={item.name} Description={item.description} Img={item.logoImg ?? item.logoSeed}/>
                  ))}
                </article>
            </div>

            <div className="grid grid-cols-2 max-[1280px]:grid-cols-1 max-[1280px]:gap-y-10">

              <article className="max-w-[90%] max-[400px]:max-w-full">
                <h1 className="text-[30px] font-serif font-medium mb-5">Capabilities</h1>
                {capabilities.map((cap, i) => (
                  <div
                    key={cap.id}
                    className={`flex flex-row justify-between p-1.5 max-[379px]:text-[18px] rounded-4xl text-black text-[20px] font-medium font-serif ${capBg[i] || "bg-[#d0d0cc]"} ${capMaxW[i] || ""}`}
                  >
                    <p>{cap.label}</p><p>{cap.percentage}%</p>
                  </div>
                ))}
              </article>

              <article>
                <p className="flex gap-28 font-medium font-serif text-[20px] border-t border-[#272727] py-8 max-[629px]:flex-col max-[629px]:gap-5">
                  Languages
                  <span>
                    {languages.map((lang) => (
                      <p key={lang.id} className="font-bold">{lang.name} : <span className="font-normal!">{lang.level}</span></p>
                    ))}
                  </span>
                </p>
                <p className="flex gap-34 font-medium font-serif text-[20px] border-t border-[#272727] pt-6 max-[629px]:flex-col max-[629px]:gap-5">
                  Soft Skills
                  <span>
                    <ul className="list-disc max-[629px]:list-inside!">
                      {softSkills.map((skill) => (
                        <li key={skill.id}>{skill.text}</li>
                      ))}
                    </ul>
                  </span>
                </p>
              </article>

            </div>

            <div className="grid grid-cols-3 gap-20 pt-14 font-serif max-[1024px]:grid-cols-2 max-[620px]:grid-cols-1">
              {stats.map((stat) => (
                <article key={stat.id} className="flex flex-col gap-5 p-5 justify-start border border-[#272727] rounded-3xl">
                  <h1 className="text-6xl font-medium">{stat.number}<span className="text-primary">{stat.suffix}</span></h1>
                  <p className="text-[20px]">{stat.label}</p>
                </article>
              ))}
            </div>

          </div>
    </div>
  )
}

export default AboutEdit
