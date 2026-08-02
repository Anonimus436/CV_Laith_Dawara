import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  BLOG_ITEMS,
  CONTENT_PLAN_ITEMS,
  GROWTH_STRATEGY_ITEMS,
  MARKETING_STRATEGY_ITEMS,
  REEL_SCRIPTS_ITEMS,
  RESEARCH_ITEMS,
  WEB_CONTENT_ITEMS,
  CATEGORIES,
} from "../data/worksData";

// ─── helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "cvl_dynamic_works";

/** Merge static seed items with anything stored in localStorage. */
function buildInitialItems() {
  const seed = [
    ...BLOG_ITEMS,
    ...CONTENT_PLAN_ITEMS,
    ...GROWTH_STRATEGY_ITEMS,
    ...MARKETING_STRATEGY_ITEMS,
    ...REEL_SCRIPTS_ITEMS,
    ...RESEARCH_ITEMS,
    ...WEB_CONTENT_ITEMS,
  ];

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // saved items are user-created; seed items have priority if slugs collide
    const seedSlugs = new Set(seed.map((i) => i.slug));
    const merged = [...seed, ...saved.filter((i) => !seedSlugs.has(i.slug))];
    return merged;
  } catch {
    return seed;
  }
}

function buildWorksMap(items) {
  const map = { All: items };
  CATEGORIES.filter((c) => c !== "All").forEach((cat) => {
    map[cat] = items.filter((i) => i.category === cat);
  });
  return map;
}

// ─── context ──────────────────────────────────────────────────────────────────

const WorksContext = createContext(null);

export function WorksProvider({ children }) {
  const [items, setItems] = useState(buildInitialItems);

  // persist only user-created items (those not in the static seed)
  const seedSlugs = new Set([
    ...BLOG_ITEMS,
    ...CONTENT_PLAN_ITEMS,
    ...GROWTH_STRATEGY_ITEMS,
    ...MARKETING_STRATEGY_ITEMS,
    ...REEL_SCRIPTS_ITEMS,
    ...RESEARCH_ITEMS,
    ...WEB_CONTENT_ITEMS,
  ].map((i) => i.slug));

  useEffect(() => {
    const dynamic = items.filter((i) => !seedSlugs.has(i.slug));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dynamic));
  }, [items]);

  const worksMap = buildWorksMap(items);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      if (prev.find((i) => i.slug === item.slug)) return prev; // slug collision
      return [...prev, item];
    });
  }, []);

  const updateItem = useCallback((slug, patch) => {
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, ...patch } : i))
    );
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const slugExists = useCallback(
    (slug, excludeSlug = null) =>
      items.some((i) => i.slug === slug && i.slug !== excludeSlug),
    [items]
  );

  return (
    <WorksContext.Provider
      value={{ items, worksMap, addItem, updateItem, removeItem, slugExists, seedSlugs }}
    >
      {children}
    </WorksContext.Provider>
  );
}

export function useWorks() {
  const ctx = useContext(WorksContext);
  if (!ctx) throw new Error("useWorks must be used inside <WorksProvider>");
  return ctx;
}
