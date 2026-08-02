import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SELECT_WORKS_SEED } from "../data/selectWorksData";

const STORAGE_KEY = "cvl_select_works";

// ─── helpers ──────────────────────────────────────────────────────────────────

function buildInitialItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    // If user has saved state, use it (it may include edits/deletions/additions)
    if (Array.isArray(saved)) return saved;
  } catch { /* ignore */ }
  return SELECT_WORKS_SEED;
}

const SEED_SLUGS = new Set(SELECT_WORKS_SEED.map((i) => i.slug));

// ─── context ──────────────────────────────────────────────────────────────────

const SelectWorksContext = createContext(null);

export function SelectWorksProvider({ children }) {
  const [items, setItems] = useState(buildInitialItems);

  // persist the full list every time it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      if (prev.find((i) => i.slug === item.slug)) return prev;
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
    <SelectWorksContext.Provider
      value={{ items, addItem, updateItem, removeItem, slugExists, seedSlugs: SEED_SLUGS }}
    >
      {children}
    </SelectWorksContext.Provider>
  );
}

export function useSelectWorks() {
  const ctx = useContext(SelectWorksContext);
  if (!ctx) throw new Error("useSelectWorks must be used inside <SelectWorksProvider>");
  return ctx;
}
