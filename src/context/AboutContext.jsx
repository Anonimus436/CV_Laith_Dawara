import { createContext, useContext, useState, useEffect, useCallback } from "react";
import ProfileImg from "../assets/images/profile.png";
import Log1 from "../assets/images/log1.jpg";
import Log2 from "../assets/images/log2Edit.jpg";
import Log3 from "../assets/images/log3Edit.jpg";
import Log4 from "../assets/images/log4Edit.jpg";
import Log5 from "../assets/images/log5Edit.jpg";
import Log6 from "../assets/images/log6Edit.jpg";
import Log7 from "../assets/images/log7Edit.jpg";
import Uni1 from "../assets/images/university1.jpg";
import Uni2 from "../assets/images/university2.jpg";
import Tool1 from "../assets/images/download1.jpg";
import Tool2 from "../assets/images/download-2.png";
import Tool3 from "../assets/images/download-1-1.png";
import Tool4 from "../assets/images/skill2.png";
import Tool5 from "../assets/images/skill3.jpg";

const STORAGE_KEY = "cvl_about_data";

const SEED = {
  bio: {
    name: "Laith Dawara",
    workingSince: "2021",
    introduction:
      "I'm a results-driven Senior Marketing Manager with over 5 years of experience leading full-funnel campaigns across Meta, TikTok, and Google.\nI specialize in turning strategy into execution, blending creative storytelling with data-backed performance marketing to deliver measurable growth.\nI build systems that don't just look good—they drive results, scale ROAS, and convert audiences into loyal customers.",
    profileImg: null,
  },
  workExperience: [
    { id: "we1", company: "Wasel-2U",                        period: "Jan 2026-Present",    logoImg: null, logoSeed: Log1 },
    { id: "we2", company: "Eazy sales GmbH",                 period: "May 2025 - Mar 2026", logoImg: null, logoSeed: Log2 },
    { id: "we3", company: "Athena AID",                      period: "Jun 2025 - Jul 2025", logoImg: null, logoSeed: Log3 },
    { id: "we4", company: "هدايا_Hadaya",                   period: "Mar 2025 - May 2025", logoImg: null, logoSeed: Log4 },
    { id: "we5", company: "Al-Alaa Upholstery",              period: "Jan 2024 - Mar 2025", logoImg: null, logoSeed: Log5 },
    { id: "we6", company: "منشى محتوى / The Arab Creator", period: "Jul 2018 - Mar 2025", logoImg: null, logoSeed: Log6 },
    { id: "we7", company: "ZAAHO-UPWAW",                     period: "Feb 2024 - Nov 2024", logoImg: null, logoSeed: Log7 },
  ],
  education: [
    { id: "ed1", degree: "Bachelor in Renewable Energy Engineering", period: "Jan 2022 - Sep 2026", logoImg: null, logoSeed: Uni1 },
    { id: "ed2", degree: "Diploma in Business Administration",        period: "Mar 2024 - Mar 2026", logoImg: null, logoSeed: Uni2 },
  ],
  tools: [
    { id: "tl1", name: "Adobe Creative Suite",  description: "Social Management",  logoImg: null, logoSeed: Tool1 },
    { id: "tl2", name: "Meta Business Suite",    description: "Social Management",  logoImg: null, logoSeed: Tool2 },
    { id: "tl3", name: "Content Planning Tools", description: "Strategic Planning", logoImg: null, logoSeed: Tool3 },
    { id: "tl4", name: "Adobe Photoshop",         description: "Social Management",  logoImg: null, logoSeed: Tool4 },
    { id: "tl5", name: "AutoCAD",                 description: "Social Management",  logoImg: null, logoSeed: Tool5 },
  ],
  capabilities: [
    { id: "cap1", label: "Marketing & Sales Strategist", percentage: 100 },
    { id: "cap2", label: "Content Creator",               percentage: 90  },
    { id: "cap3", label: "Social Media Trainer",          percentage: 85  },
  ],
  languages: [
    { id: "lang1", name: "Arabic",  level: "Native"               },
    { id: "lang2", name: "English", level: "Good (Intermediate)" },
  ],
  softSkills: [
    { id: "ss1", text: "Creativity and fresh ideas"        },
    { id: "ss2", text: "Effective and clear communication" },
    { id: "ss3", text: "Ability to work under pressure"    },
    { id: "ss4", text: "Ability to work under pressure"    },
  ],
  stats: [
    { id: "st1", number: "5",   suffix: "+", label: "Years of experience"   },
    { id: "st2", number: "25",  suffix: "+", label: "Projects completed"    },
    { id: "st3", number: "100", suffix: "%", label: "Client retention rate" },
  ],
};

function toSerializable(data) {
  return {
    bio: { ...data.bio },
    workExperience: data.workExperience.map(({ logoSeed, ...rest }) => rest),
    education:      data.education.map(({ logoSeed, ...rest }) => rest),
    tools:          data.tools.map(({ logoSeed, ...rest }) => rest),
    capabilities:   data.capabilities,
    languages:      data.languages,
    softSkills:     data.softSkills,
    stats:          data.stats,
  };
}

function reattachSeeds(saved) {
  const findSeed = (seedArr, id) =>
    seedArr.find((s) => s.id === id)?.logoSeed ?? null;
  return {
    ...saved,
    workExperience: saved.workExperience.map((item) => ({
      ...item,
      logoSeed: findSeed(SEED.workExperience, item.id),
    })),
    education: saved.education.map((item) => ({
      ...item,
      logoSeed: findSeed(SEED.education, item.id),
    })),
    tools: saved.tools.map((item) => ({
      ...item,
      logoSeed: findSeed(SEED.tools, item.id),
    })),
  };
}

function buildInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    const parsed = JSON.parse(raw);
    return reattachSeeds(parsed);
  } catch {
    return SEED;
  }
}

const AboutContext = createContext(null);

export function AboutProvider({ children }) {
  const [data, setData] = useState(buildInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSerializable(data)));
    } catch {
      // quota exceeded — silently ignore
    }
  }, [data]);

  const updateAbout = useCallback((section, newValue) => {
    setData((prev) => ({
      ...prev,
      [section]:
        section === "bio"
          ? { ...prev.bio, ...newValue }
          : newValue,
    }));
  }, []);

  return (
    <AboutContext.Provider value={{ data, updateAbout, SEED_PROFILE_IMG: ProfileImg }}>
      {children}
    </AboutContext.Provider>
  );
}

export function useAbout() {
  const ctx = useContext(AboutContext);
  if (!ctx) throw new Error("useAbout must be used inside <AboutProvider>");
  return ctx;
}
