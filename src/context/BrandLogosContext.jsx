import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cvl_brand_logos";

const buildSvgLogo = (label, bg, text, accent) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140">
      <rect width="320" height="140" rx="18" fill="${bg}" />
      <rect x="16" y="16" width="288" height="108" rx="12" fill="${accent}" opacity="0.18" />
      <text x="160" y="88" text-anchor="middle" font-size="34" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="${text}">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const BRAND_LOGOS_SEED = [
  { id: "brand-1", src: buildSvgLogo("VITAL", "#121212", "#ffffff", "#c35185"), alt: "Vital" },
  { id: "brand-2", src: buildSvgLogo("NOVA", "#0e0e0e", "#c35185", "#ffffff"), alt: "Nova" },
  { id: "brand-3", src: buildSvgLogo("QUANT", "#151515", "#ffffff", "#c35185"), alt: "Quant" },
  { id: "brand-4", src: buildSvgLogo("ARTE", "#101010", "#ffffff", "#f2f2f2"), alt: "Arte" },
  { id: "brand-5", src: buildSvgLogo("BLOOM", "#111111", "#c35185", "#ffffff"), alt: "Bloom" },
];

function buildInitialItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(saved) && saved.length > 0) return saved;
  } catch {
    // ignore parse errors and fall back to seed logos
  }

  return BRAND_LOGOS_SEED;
}

const BrandLogosContext = createContext(null);

export function BrandLogosProvider({ children }) {
  const [items, setItems] = useState(buildInitialItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((logo) => logo.id !== id));
  }, []);

  const value = useMemo(
    () => ({ items, addItem, removeItem }),
    [items, addItem, removeItem]
  );

  return (
    <BrandLogosContext.Provider value={value}>{children}</BrandLogosContext.Provider>
  );
}

export function useBrandLogos() {
  const ctx = useContext(BrandLogosContext);
  if (!ctx) {
    throw new Error("useBrandLogos must be used inside <BrandLogosProvider>");
  }
  return ctx;
}
