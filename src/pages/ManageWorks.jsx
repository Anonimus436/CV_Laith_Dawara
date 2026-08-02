import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { CATEGORIES } from "../data/worksData";
import { useWorks } from "../context/WorksContext";

// ─── constants ────────────────────────────────────────────────────────────────
const FILE_TYPES = ["pdf", "docx", "xlsx"];
const ACCEPT_FILES = ".pdf,.doc,.docx,.xls,.xlsx";
const EMPTY_FORM = {
  text: "",
  slug: "",
  description: "",
  category: "Blog",
  fileType: "pdf",
  client: "",
  imgPreview: null,   // data-URL for preview
  imgFile: null,      // File object
  uploadedFile: null, // File object
  uploadedFileName: "",
  downloadPath: "",   // kept for existing static items
  fileName: "",
};

// ─── small helpers ────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fileTypeFromName(name = "") {
  const ext = name.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (ext === "docx" || ext === "doc") return "docx";
  if (ext === "xlsx" || ext === "xls") return "xlsx";
  return "pdf";
}

// ─── sub-components ───────────────────────────────────────────────────────────
const InputLabel = ({ children, required }) => (
  <label className="block text-sm font-semibold text-gray-300 mb-1.5">
    {children} {required && <span className="text-primary">*</span>}
  </label>
);

const TextInput = ({ value, onChange, placeholder, className = "" }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors ${className}`}
  />
);

const Textarea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors resize-none"
  />
);

// ─── Experience-style card preview ───────────────────────────────────────────
const ExperienceCard = ({ img, text, period }) => (
  <div className="flex flex-row gap-x-3.5 gap-y-2 font-serif">
    <img
      src={img || "https://placehold.co/48x48/141414/555?text=?"}
      className="w-12 h-12 rounded-2xl object-cover shrink-0"
      alt={text}
    />
    <p className="flex flex-col text-[18px] font-medium">
      {text || <span className="text-gray-600 italic">Card title</span>}
      <span className="text-gray-400 text-sm mt-0.5">{period}</span>
    </p>
  </div>
);

// ─── delete confirm modal ─────────────────────────────────────────────────────
const DeleteModal = ({ item, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
    <div className="bg-[#141414] border border-[#272727] rounded-3xl p-8 max-w-md w-full space-y-5">
      <h3 className="text-xl text-white font-bold font-serif">Delete Card?</h3>
      <p className="text-gray-400 text-sm">
        This will permanently remove <span className="text-white font-semibold">"{item.text}"</span> from{" "}
        <span className="text-primary">{item.category}</span>. This action cannot be undone.
      </p>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
        >
          Yes, Delete
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-[#222] hover:bg-[#2a2a2a] text-gray-300 font-semibold py-2.5 rounded-xl transition-colors text-sm border border-[#333]"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// ─── main component ───────────────────────────────────────────────────────────
export default function ManageWorks() {
  const { items, worksMap, addItem, updateItem, removeItem, slugExists, seedSlugs } = useWorks();

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingSlug, setEditingSlug] = useState(null); // null = add mode
  const [slugError, setSlugError] = useState("");
  const [errors, setErrors] = useState({});
  const [toDelete, setToDelete] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [successMsg, setSuccessMsg] = useState("");
  const imgInputRef = useRef();
  const fileInputRef = useRef();
  const formRef = useRef();

  const isEditMode = editingSlug !== null;
  const displayItems = worksMap[filterCat] ?? [];

  // ── form field helpers ──
  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSlugChange(e) {
    const val = slugify(e.target.value);
    setForm((f) => ({ ...f, slug: val }));
    if (val && slugExists(val, editingSlug)) {
      setSlugError("This slug is already in use.");
    } else {
      setSlugError("");
    }
  }

  function handleTitleChange(e) {
    const val = e.target.value;
    setForm((f) => {
      const newSlug = editingSlug ? f.slug : slugify(val);
      return { ...f, text: val, slug: newSlug };
    });
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((f) => ({ ...f, imgPreview: ev.target.result, imgFile: file }));
    reader.readAsDataURL(file);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({
      ...f,
      uploadedFile: file,
      uploadedFileName: file.name,
      fileType: fileTypeFromName(file.name),
      fileName: file.name,
    }));
  }

  function validate() {
    const errs = {};
    if (!form.text.trim()) errs.text = "Title is required.";
    if (!form.slug.trim()) errs.slug = "Slug is required.";
    if (slugError) errs.slug = slugError;
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!isEditMode && !form.imgFile && !form.imgPreview)
      errs.img = "An image is required.";
    if (!isEditMode && !form.uploadedFile && !form.downloadPath)
      errs.file = "A file is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function flash(msg) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // For uploaded files we create an object URL so FileDetail can serve them.
    // In a real backend you'd upload to a server; here we use the blob URL.
    const downloadPath = form.uploadedFile
      ? URL.createObjectURL(form.uploadedFile)
      : form.downloadPath;

    const imgSrc = form.imgPreview || "";

    const payload = {
      slug: form.slug,
      text: form.text.trim(),
      description: form.description.trim(),
      category: form.category,
      fileType: form.fileType,
      fileName: form.fileName || form.uploadedFileName,
      client: form.client.trim() || "General",
      downloadPath,
      img: imgSrc,
      link: `/files/${form.slug}`,
    };

    if (isEditMode) {
      updateItem(editingSlug, payload);
      flash("Card updated successfully.");
    } else {
      addItem(payload);
      flash("Card added successfully.");
    }

    resetForm();
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingSlug(null);
    setErrors({});
    setSlugError("");
    if (imgInputRef.current) imgInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit(item) {
    setEditingSlug(item.slug);
    setErrors({});
    setSlugError("");
    setForm({
      text: item.text,
      slug: item.slug,
      description: item.description || "",
      category: item.category,
      fileType: item.fileType || "pdf",
      client: item.client || "",
      imgPreview: item.img || null,
      imgFile: null,
      uploadedFile: null,
      uploadedFileName: "",
      downloadPath: item.downloadPath || "",
      fileName: item.fileName || "",
    });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function confirmDelete(item) { setToDelete(item); }
  function doDelete() {
    removeItem(toDelete.slug);
    setToDelete(null);
    if (editingSlug === toDelete.slug) resetForm();
    flash("Card deleted.");
  }

  // ── render ──
  return (
    <div className="bg-black text-white min-h-screen py-16">
      {toDelete && (
        <DeleteModal
          item={toDelete}
          onConfirm={doDelete}
          onCancel={() => setToDelete(null)}
        />
      )}

      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-1">
              Admin
            </p>
            <h1 className="text-4xl font-bold font-serif">Manage Works</h1>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline hover:opacity-80 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Portfolio
          </Link>
        </div>

        {/* Success toast */}
        {successMsg && (
          <div className="mb-6 bg-primary/10 border border-primary text-primary text-sm rounded-2xl px-5 py-3 font-medium">
            ✓ {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* ── LEFT: Form ── */}
          <div ref={formRef}>
            <h2 className="text-2xl font-bold font-serif mb-6">
              {isEditMode ? "Edit Card" : "Add New Card"}
            </h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Title */}
              <div>
                <InputLabel required>Title</InputLabel>
                <TextInput value={form.text} onChange={handleTitleChange} placeholder="e.g. Growth Strategy – Acme Corp" />
                {errors.text && <p className="text-red-400 text-xs mt-1">{errors.text}</p>}
              </div>

              {/* Slug */}
              <div>
                <InputLabel required>URL Slug</InputLabel>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm select-none">/files/</span>
                  <input
                    value={form.slug}
                    onChange={handleSlugChange}
                    placeholder="my-card-slug"
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl pl-18 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                {(errors.slug || slugError) && <p className="text-red-400 text-xs mt-1">{errors.slug || slugError}</p>}
              </div>

              {/* Description */}
              <div>
                <InputLabel required>Description</InputLabel>
                <Textarea value={form.description} onChange={set("description")} placeholder="Brief description shown on the card detail page." />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Category */}
              <div>
                <InputLabel required>Category</InputLabel>
                <select
                  value={form.category}
                  onChange={set("category")}
                  className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Client (optional) */}
              <div>
                <InputLabel>Client <span className="text-gray-600 font-normal">(optional)</span></InputLabel>
                <TextInput value={form.client} onChange={set("client")} placeholder="e.g. Acme Corp" />
              </div>

              {/* Image upload */}
              <div>
                <InputLabel required={!isEditMode}>Card Image</InputLabel>
                <div
                  className="border-2 border-dashed border-[#2e2e2e] rounded-2xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => imgInputRef.current?.click()}
                >
                  {form.imgPreview ? (
                    <img src={form.imgPreview} alt="preview" className="w-full max-h-40 object-cover rounded-xl" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-600 py-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                      </svg>
                      <span className="text-sm">Click to upload image</span>
                    </div>
                  )}
                </div>
                <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                {form.imgPreview && (
                  <button type="button" onClick={() => setForm((f) => ({ ...f, imgPreview: null, imgFile: null }))}
                    className="mt-2 text-xs text-red-400 hover:underline">Remove image</button>
                )}
                {errors.img && <p className="text-red-400 text-xs mt-1">{errors.img}</p>}
              </div>

              {/* File upload */}
              <div>
                <InputLabel required={!isEditMode}>Attach File <span className="text-gray-500 font-normal">(PDF / Word / Excel)</span></InputLabel>
                <div
                  className="border-2 border-dashed border-[#2e2e2e] rounded-2xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {form.uploadedFileName || form.fileName ? (
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-bold text-lg">
                        {(form.fileType === "pdf") ? "📄" : (form.fileType === "xlsx") ? "📊" : "📝"}
                      </span>
                      <span className="text-gray-300 text-sm break-all">{form.uploadedFileName || form.fileName}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-600 py-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                      </svg>
                      <span className="text-sm">Click to upload PDF, Word, or Excel</span>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept={ACCEPT_FILES} className="hidden" onChange={handleFileChange} />
                {errors.file && <p className="text-red-400 text-xs mt-1">{errors.file}</p>}
              </div>

              {/* Live preview */}
              <div className="bg-[#141414] rounded-2xl p-5 border border-[#272727]">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">Card Preview</p>
                <ExperienceCard
                  img={form.imgPreview}
                  text={form.text}
                  period={form.category}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-black font-bold py-3 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm"
                >
                  {isEditMode ? "Save Changes" : "Add Card"}
                </button>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 bg-[#222] hover:bg-[#2a2a2a] text-gray-300 font-semibold py-3 rounded-2xl transition-colors text-sm border border-[#333]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ── RIGHT: Card list ── */}
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-2xl font-bold font-serif">All Cards</h2>
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {displayItems.length === 0 && (
                <p className="text-gray-600 text-sm text-center py-10">No cards in this category yet.</p>
              )}
              {displayItems.map((item) => {
                const isStatic = seedSlugs.has(item.slug);
                const isBeingEdited = editingSlug === item.slug;
                return (
                  <div
                    key={item.slug}
                    className={`flex items-center gap-4 bg-[#141414] rounded-2xl p-4 border transition-colors ${
                      isBeingEdited ? "border-primary" : "border-[#272727]"
                    }`}
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.img || "https://placehold.co/48x48/141414/555?text=?"}
                      alt={item.text}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{item.text}</p>
                      <p className="text-gray-500 text-xs mt-0.5 truncate">/files/{item.slug}</p>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1 font-semibold uppercase tracking-wide ${
                        isStatic
                          ? "bg-gray-800 text-gray-400"
                          : "bg-primary/15 text-primary"
                      }`}>
                        {isStatic ? "static" : "custom"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEdit(item)}
                        title="Edit"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#222] hover:bg-primary/20 hover:text-primary text-gray-400 transition-colors border border-[#333]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => confirmDelete(item)}
                        title="Delete"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#222] hover:bg-red-900/30 hover:text-red-400 text-gray-400 transition-colors border border-[#333]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
