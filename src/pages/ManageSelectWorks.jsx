import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { CATEGORIES } from "../data/worksData";
import { useSelectWorks } from "../context/SelectWorksContext";

// ─── helpers ──────────────────────────────────────────────────────────────────
const ACCEPT_FILES = ".pdf,.doc,.docx,.xls,.xlsx";

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

function fileTypeFromName(name = "") {
  const ext = name.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (ext === "docx" || ext === "doc") return "docx";
  if (ext === "xlsx" || ext === "xls") return "xlsx";
  return "pdf";
}

const FILE_ICONS = { pdf: "📄", docx: "📝", xlsx: "📊" };

const EMPTY = {
  text: "", slug: "", description: "", category: "Blog", client: "",
  fileType: "pdf", fileName: "", downloadPath: "",
  imgPreview: null, imgFile: null, uploadedFile: null,
};

// ─── atoms ────────────────────────────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-gray-300 mb-1.5">
    {children}{required && <span className="text-primary ml-1">*</span>}
  </label>
);
const Field = ({ value, onChange, placeholder, className = "" }) => (
  <input value={value} onChange={onChange} placeholder={placeholder}
    className={`w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors ${className}`} />
);
const Textarea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors resize-none" />
);

// ─── delete modal ─────────────────────────────────────────────────────────────
const DeleteModal = ({ item, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
    <div className="bg-[#141414] border border-[#272727] rounded-3xl p-8 max-w-md w-full space-y-5 shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-2xl bg-red-900/30 border border-red-800 flex items-center justify-center text-red-400 text-xl shrink-0">🗑</span>
        <h3 className="text-xl text-white font-bold font-serif">Delete Card?</h3>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">
        Permanently remove <span className="text-white font-semibold">"{item.text}"</span>. This cannot be undone.
      </p>
      <div className="flex gap-3 pt-1">
        <button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-semibold py-2.5 rounded-xl transition-all text-sm">Yes, Delete</button>
        <button onClick={onCancel} className="flex-1 bg-[#222] hover:bg-[#2a2a2a] text-gray-300 font-semibold py-2.5 rounded-xl transition-colors text-sm border border-[#333]">Cancel</button>
      </div>
    </div>
  </div>
);

// ─── main component ───────────────────────────────────────────────────────────
export default function ManageSelectWorks() {
  const { items, addItem, updateItem, removeItem, slugExists, seedSlugs } = useSelectWorks();

  const [form, setForm] = useState(EMPTY);
  const [editingSlug, setEditingSlug] = useState(null);
  const [slugError, setSlugError] = useState("");
  const [errors, setErrors] = useState({});
  const [toDelete, setToDelete] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const imgRef = useRef();
  const fileRef = useRef();
  const formRef = useRef();

  const isEditMode = editingSlug !== null;
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleTitleChange(e) {
    const val = e.target.value;
    setForm((f) => ({ ...f, text: val, slug: editingSlug ? f.slug : slugify(val) }));
  }

  function handleSlugChange(e) {
    const val = slugify(e.target.value);
    setForm((f) => ({ ...f, slug: val }));
    setSlugError(val && slugExists(val, editingSlug) ? "Slug already in use." : "");
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, imgPreview: ev.target.result, imgFile: file }));
    reader.readAsDataURL(file);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, uploadedFile: file, fileName: file.name, fileType: fileTypeFromName(file.name) }));
  }

  function validate() {
    const errs = {};
    if (!form.text.trim()) errs.text = "Title is required.";
    if (!form.slug.trim()) errs.slug = "Slug is required.";
    if (slugError) errs.slug = slugError;
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!isEditMode && !form.imgPreview) errs.img = "An image is required.";
    if (!isEditMode && !form.uploadedFile && !form.downloadPath) errs.file = "A file is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function flash(msg) { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(""), 3000); }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const slug = form.slug;
    const payload = {
      slug,
      text: form.text.trim(),
      description: form.description.trim(),
      category: form.category,
      client: form.client.trim() || "General",
      fileType: form.fileType,
      fileName: form.fileName,
      downloadPath: form.uploadedFile ? URL.createObjectURL(form.uploadedFile) : form.downloadPath,
      img: form.imgPreview || "",
      link: `/files/${slug}`,
      section: "home",
    };
    if (isEditMode) { updateItem(editingSlug, payload); flash("Card updated."); }
    else { addItem(payload); flash("Card added."); }
    resetForm();
  }

  function resetForm() {
    setForm(EMPTY); setEditingSlug(null); setErrors({}); setSlugError("");
    if (imgRef.current) imgRef.current.value = "";
    if (fileRef.current) fileRef.current.value = "";
  }

  function startEdit(item) {
    setEditingSlug(item.slug); setErrors({}); setSlugError("");
    setForm({ text: item.text, slug: item.slug, description: item.description || "",
      category: item.category, client: item.client || "", fileType: item.fileType || "pdf",
      fileName: item.fileName || "", downloadPath: item.downloadPath || "",
      imgPreview: item.img || null, imgFile: null, uploadedFile: null });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="bg-black text-white min-h-screen py-16">
      {toDelete && (
        <DeleteModal item={toDelete} onConfirm={() => { removeItem(toDelete.slug); setToDelete(null); if (editingSlug === toDelete.slug) resetForm(); flash("Card deleted."); }} onCancel={() => setToDelete(null)} />
      )}
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-1">Admin · Home</p>
            <h1 className="text-4xl font-bold font-serif">Manage Select Works</h1>
          </div>
          <Link to="/#reference" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
            Back to Home
          </Link>
        </div>

        {successMsg && (
          <div className="mb-6 bg-primary/10 border border-primary text-primary text-sm rounded-2xl px-5 py-3 font-medium">✓ {successMsg}</div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* ── LEFT: form ── */}
          <div ref={formRef}>
            <h2 className="text-2xl font-bold font-serif mb-6">{isEditMode ? "Edit Card" : "Add New Card"}</h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              <div>
                <Label required>Title</Label>
                <Field value={form.text} onChange={handleTitleChange} placeholder="Card title" />
                {errors.text && <p className="text-red-400 text-xs mt-1">{errors.text}</p>}
              </div>

              <div>
                <Label required>URL Slug</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm select-none">/files/</span>
                  <input value={form.slug} onChange={handleSlugChange} placeholder="my-card-slug"
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl pl-18 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors" />
                </div>
                {(errors.slug || slugError) && <p className="text-red-400 text-xs mt-1">{errors.slug || slugError}</p>}
              </div>

              <div>
                <Label required>Description</Label>
                <Textarea value={form.description} onChange={set("description")} placeholder="Brief description…" />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
              </div>

              <div>
                <Label required>Category</Label>
                <select value={form.category} onChange={set("category")}
                  className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors">
                  {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <Label>Client <span className="text-gray-600 font-normal">(optional)</span></Label>
                <Field value={form.client} onChange={set("client")} placeholder="e.g. Acme Corp" />
              </div>

              {/* Image upload */}
              <div>
                <Label required={!isEditMode}>Card Image</Label>
                <div className="border-2 border-dashed border-[#2e2e2e] rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors" onClick={() => imgRef.current?.click()}>
                  {form.imgPreview ? (
                    <div className="relative">
                      <img src={form.imgPreview} alt="preview" className="w-full max-h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-semibold bg-black/60 px-4 py-2 rounded-xl">Click to replace</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-600 py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>
                      <span className="text-sm">Click to upload image</span>
                    </div>
                  )}
                </div>
                <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                {errors.img && <p className="text-red-400 text-xs mt-1">{errors.img}</p>}
              </div>

              {/* File upload */}
              <div>
                <Label required={!isEditMode}>Attach File <span className="text-gray-500 font-normal">(PDF / Word / Excel)</span></Label>
                {(form.fileName) && (
                  <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-3 mb-3">
                    <span className="text-lg shrink-0">{FILE_ICONS[form.fileType] ?? "📄"}</span>
                    <p className="text-gray-300 text-sm truncate flex-1">{form.fileName}</p>
                  </div>
                )}
                <div className="border-2 border-dashed border-[#2e2e2e] rounded-2xl p-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
                  <div className="flex flex-col items-center gap-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/></svg>
                    <span className="text-sm">{form.uploadedFile ? `✓ ${form.uploadedFile.name}` : "Click to upload PDF, Word, or Excel"}</span>
                  </div>
                </div>
                <input ref={fileRef} type="file" accept={ACCEPT_FILES} className="hidden" onChange={handleFileChange} />
                {errors.file && <p className="text-red-400 text-xs mt-1">{errors.file}</p>}
              </div>

              {/* Preview box */}
              <div className="bg-[#141414] rounded-2xl p-4 border border-[#272727]">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">Card Preview</p>
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
                  <img src={form.imgPreview || "https://placehold.co/400x180/1a1a1a/333?text=No+image"} alt="preview" className="w-full h-32 object-cover p-2 rounded-2xl" />
                  <div className="flex justify-between gap-4 mx-4 mb-4 mt-2 items-center">
                    <span className="text-[15px] font-medium font-serif text-white truncate">{form.text || <span className="text-gray-600 italic">Card title</span>}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary shrink-0" viewBox="0 0 16 16"><path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/></svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-primary text-black font-bold py-3 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm">
                  {isEditMode ? "Save Changes" : "Add Card"}
                </button>
                {isEditMode && (
                  <button type="button" onClick={resetForm} className="px-6 bg-[#222] hover:bg-[#2a2a2a] text-gray-300 font-semibold py-3 rounded-2xl transition-colors text-sm border border-[#333]">Cancel</button>
                )}
              </div>
            </form>
          </div>

          {/* ── RIGHT: card list ── */}
          <div>
            <h2 className="text-2xl font-bold font-serif mb-6">All Cards <span className="text-gray-600 text-lg font-normal">({items.length})</span></h2>
            <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
              {items.length === 0 && <p className="text-gray-600 text-sm text-center py-10">No cards yet.</p>}
              {items.map((item) => {
                const isStatic = seedSlugs.has(item.slug);
                const isBeingEdited = editingSlug === item.slug;
                return (
                  <div key={item.slug} className={`flex items-center gap-4 bg-[#141414] rounded-2xl p-4 border transition-colors ${isBeingEdited ? "border-primary" : "border-[#272727]"}`}>
                    <img src={item.img || "https://placehold.co/48x48/141414/555?text=?"} alt={item.text} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{item.text}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.category}</p>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1 font-semibold uppercase tracking-wide ${isStatic ? "bg-gray-800 text-gray-400" : "bg-primary/15 text-primary"}`}>
                        {isStatic ? "static" : "custom"}
                      </span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => startEdit(item)} title="Edit"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#222] hover:bg-primary/20 hover:text-primary text-gray-400 transition-colors border border-[#333]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
                      </button>
                      <button onClick={() => setToDelete(item)} title="Delete"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#222] hover:bg-red-900/30 hover:text-red-400 text-gray-400 transition-colors border border-[#333]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
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
