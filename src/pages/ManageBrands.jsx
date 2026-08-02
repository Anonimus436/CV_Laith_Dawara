import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useBrandLogos } from "../context/BrandLogosContext";

const EMPTY_FORM = {
  file: null,
  preview: "",
  name: "",
};

export default function ManageBrands() {
  const { items, addItem, removeItem } = useBrandLogos();
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState("");
  const fileRef = useRef(null);

  const itemCountLabel = useMemo(() => `${items.length} logo${items.length === 1 ? "" : "s"}`, [items.length]);

  function flash(messageText) {
    setMessage(messageText);
    window.setTimeout(() => setMessage(""), 2800);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      flash("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ file, preview: reader.result, name: file.name });
    };
    reader.readAsDataURL(file);
  }

  function handleAddLogo(e) {
    e.preventDefault();
    if (!form.preview) {
      flash("Choose an image before adding it.");
      return;
    }

    addItem({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      src: form.preview,
      alt: form.name || "Uploaded brand logo",
    });

    setForm(EMPTY_FORM);
    if (fileRef.current) fileRef.current.value = "";
    flash("Brand logo added.");
  }

  function handleDelete(id) {
    removeItem(id);
    flash("Brand logo deleted.");
  }

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-1">Admin · Home</p>
            <h1 className="text-4xl font-bold font-serif">Manage Brand Logos</h1>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            Back to Home
          </Link>
        </div>

        {message && (
          <div className="mb-6 bg-primary/10 border border-primary text-primary text-sm rounded-2xl px-5 py-3 font-medium">
            ✓ {message}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-10 lg:gap-14">
          <section className="bg-[#141414] border border-[#272727] rounded-3xl p-6">
            <h2 className="text-2xl font-bold font-serif mb-6">Add a new brand logo</h2>
            <form onSubmit={handleAddLogo} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Logo image</label>
                <div className="border-2 border-dashed border-[#2e2e2e] rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors" onClick={() => fileRef.current?.click()}>
                  {form.preview ? (
                    <div className="relative">
                      <img src={form.preview} alt="Logo preview" className="w-full h-52 object-contain bg-white" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-semibold bg-black/60 px-4 py-2 rounded-xl">Click to replace</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-600 py-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                      </svg>
                      <span className="text-sm">Click to upload an image</span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-black font-bold py-3 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm"
              >
                Add logo to the scroller
              </button>
            </form>
          </section>

          <section className="bg-[#141414] border border-[#272727] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-2xl font-bold font-serif">Current logos</h2>
              <span className="text-sm text-gray-400">{itemCountLabel}</span>
            </div>

            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#2e2e2e] p-10 text-center text-gray-500 text-sm">
                No brand logos have been added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {items.map((logo) => (
                  <div key={logo.id} className="rounded-2xl border border-[#2e2e2e] bg-[#111] overflow-hidden">
                    <img src={logo.src} alt={logo.alt} className="w-full h-40 object-contain bg-white" />
                    <div className="flex items-center justify-between gap-3 p-3">
                      <span className="text-xs text-gray-400 truncate">{logo.alt}</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(logo.id)}
                        className="bg-red-900/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </Container>
    </div>
  );
}
