import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "../components/Container";
import { CATEGORIES } from "../data/worksData";
import { useSelectWorks } from "../context/SelectWorksContext";

// ─── helpers ──────────────────────────────────────────────────────────────────
const ACCEPT_FILES = ".pdf,.doc,.docx,.xls,.xlsx";

function fileTypeFromName(name = "") {
  const ext = name.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (ext === "docx" || ext === "doc") return "docx";
  if (ext === "xlsx" || ext === "xls") return "xlsx";
  return "pdf";
}

const FILE_TYPE_LABELS = { pdf: "PDF", docx: "Word", xlsx: "Excel" };
const FILE_ICONS = { pdf: "📄", docx: "📝", xlsx: "📊" };

// ─── small UI atoms ───────────────────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-gray-300 mb-1.5">
    {children}{required && <span className="text-primary ml-1">*</span>}
  </label>
);

const Field = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
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

// ─── delete modal ─────────────────────────────────────────────────────────────
const DeleteModal = ({ title, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
    <div className="bg-[#141414] border border-[#272727] rounded-3xl p-8 max-w-md w-full space-y-5 shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-2xl bg-red-900/30 border border-red-800 flex items-center justify-center text-red-400 text-xl shrink-0">🗑</span>
        <h3 className="text-xl text-white font-bold font-serif">Delete Card?</h3>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">
        You are about to permanently delete{" "}
        <span className="text-white font-semibold">"{title}"</span> from the
        Select Works section on the Home page. This cannot be undone.
      </p>
      <div className="flex gap-3 pt-1">
        <button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-semibold py-2.5 rounded-xl transition-all text-sm">
          Yes, Delete
        </button>
        <button onClick={onCancel} className="flex-1 bg-[#222] hover:bg-[#2a2a2a] text-gray-300 font-semibold py-2.5 rounded-xl transition-colors text-sm border border-[#333]">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// ─── main component ───────────────────────────────────────────────────────────
export default function EditSelectCard() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { items, updateItem, removeItem, seedSlugs } = useSelectWorks();

  const item = items.find((i) => i.slug === slug);

  const [form, setForm] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [newImgFile, setNewImgFile] = useState(null);
  const [newUploadedFile, setNewUploadedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const imgRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    if (!item) return;
    setForm({
      text: item.text || "",
      description: item.description || "",
      category: item.category || "Blog",
      client: item.client || "",
      fileType: item.fileType || "pdf",
      fileName: item.fileName || "",
      downloadPath: item.downloadPath || "",
    });
    setImgPreview(item.img || null);
  }, [slug]);

  if (!item) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-400 text-xl">Card not found.</p>
          <Link to="/" className="text-primary hover:underline text-sm">← Back to Home</Link>
        </div>
      </div>
    );
  }

  if (!form) return null;

  const isStatic = seedSlugs.has(slug);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImgFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImgPreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewUploadedFile(file);
    setForm((f) => ({
      ...f,
      fileName: file.name,
      fileType: fileTypeFromName(file.name),
    }));
  }

  function validate() {
    const errs = {};
    if (!form.text.trim()) errs.text = "Title is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave(e) {
    e.preventDefault();
    if (!validate()) return;
    updateItem(slug, {
      text: form.text.trim(),
      description: form.description.trim(),
      category: form.category,
      client: form.client.trim() || "General",
      fileType: form.fileType,
      fileName: form.fileName,
      downloadPath: newUploadedFile
        ? URL.createObjectURL(newUploadedFile)
        : form.downloadPath,
      img: newImgFile ? imgPreview : item.img,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDelete() {
    removeItem(slug);
    navigate("/");
  }

  return (
    <div className="bg-black text-white min-h-screen py-16">
      {showDeleteModal && (
        <DeleteModal
          title={item.text}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      <Container>
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-1">
              Edit Select Works Card
            </p>
            <h1 className="text-3xl font-bold font-serif leading-snug max-w-xl">
              {item.text}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {item.category}&nbsp;·&nbsp;Home → Select Works
            </p>
          </div>
          <Link
            to="/#reference"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline hover:opacity-80 transition-opacity mt-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Static notice */}
        {isStatic && (
          <div className="mb-8 bg-yellow-900/20 border border-yellow-700/40 text-yellow-400 text-sm rounded-2xl px-5 py-3 font-medium">
            ⚠ This is a built-in card. Your changes are saved in your browser's local storage.
          </div>
        )}

        {/* Success toast */}
        {saved && (
          <div className="mb-8 bg-primary/10 border border-primary text-primary text-sm rounded-2xl px-5 py-3 font-medium">
            ✓ Changes saved successfully.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── LEFT: form ── */}
          <form onSubmit={handleSave} noValidate className="space-y-6">

            {/* Title */}
            <div>
              <Label required>Title</Label>
              <Field value={form.text} onChange={set("text")} placeholder="Card title" />
              {errors.text && <p className="text-red-400 text-xs mt-1">{errors.text}</p>}
            </div>

            {/* Description */}
            <div>
              <Label required>Description</Label>
              <Textarea value={form.description} onChange={set("description")} placeholder="Brief description…" rows={4} />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Category */}
            <div>
              <Label required>Category</Label>
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

            {/* Client */}
            <div>
              <Label>Client <span className="text-gray-600 font-normal">(optional)</span></Label>
              <Field value={form.client} onChange={set("client")} placeholder="e.g. Acme Corp" />
            </div>

            {/* Image upload */}
            <div>
              <Label>Card Image</Label>
              <div
                className="relative border-2 border-dashed border-[#2e2e2e] rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => imgRef.current?.click()}
              >
                {imgPreview ? (
                  <div className="relative">
                    <img src={imgPreview} alt="preview" className="w-full max-h-52 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-semibold bg-black/60 px-4 py-2 rounded-xl">Click to replace</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-600 py-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                    </svg>
                    <span className="text-sm">Click to upload image</span>
                  </div>
                )}
              </div>
              <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              {imgPreview && newImgFile && (
                <button type="button" onClick={() => { setImgPreview(item.img || null); setNewImgFile(null); }}
                  className="mt-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors">
                  ↩ Revert to original
                </button>
              )}
            </div>

            {/* File upload */}
            <div>
              <Label>Attached File <span className="text-gray-600 font-normal">(PDF / Word / Excel)</span></Label>
              {form.fileName && (
                <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-3 mb-3">
                  <span className="text-lg shrink-0">{FILE_ICONS[form.fileType] ?? "📄"}</span>
                  <div className="min-w-0">
                    <p className="text-gray-300 text-sm truncate">{form.fileName}</p>
                    <p className="text-gray-600 text-xs">{FILE_TYPE_LABELS[form.fileType]}</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-600 shrink-0">current</span>
                </div>
              )}
              <div
                className="border-2 border-dashed border-[#2e2e2e] rounded-2xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  <span className="text-sm">{newUploadedFile ? `✓ ${newUploadedFile.name}` : "Click to replace file"}</span>
                </div>
              </div>
              <input ref={fileRef} type="file" accept={ACCEPT_FILES} className="hidden" onChange={handleFileChange} />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="flex-1 bg-primary text-black font-bold py-3 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm">
                Save Changes
              </button>
              <button type="button" onClick={() => setShowDeleteModal(true)}
                className="px-5 bg-red-900/20 hover:bg-red-900/40 text-red-400 font-semibold py-3 rounded-2xl transition-colors text-sm border border-red-800/40">
                Delete Card
              </button>
            </div>
          </form>

          {/* ── RIGHT: live preview ── */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-serif text-white">Live Preview</h2>

            {/* Card preview — exact Linkwork design */}
            <div className="bg-[#141414] rounded-3xl overflow-hidden max-w-sm">
              <img
                src={imgPreview || "https://placehold.co/400x240/141414/333?text=No+image"}
                alt="preview"
                className="w-full h-48 object-cover p-2.5 rounded-3xl"
              />
              <div className="flex justify-between gap-4 mx-6 mb-5 mt-3 items-center">
                <h2 className="text-[17px] font-medium font-serif text-white truncate">
                  {form.text || <span className="text-gray-600 italic">Card title</span>}
                </h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  className="text-primary shrink-0" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
                </svg>
              </div>
            </div>

            {/* Metadata summary */}
            <div className="bg-[#141414] border border-[#272727] rounded-2xl p-5 space-y-3 text-sm">
              <p className="text-gray-500 font-semibold uppercase tracking-widest text-xs mb-3">Card Details</p>
              <div className="flex gap-3">
                <span className="text-gray-600 w-24 shrink-0">Category</span>
                <span className="text-primary font-medium">{form.category}</span>
              </div>
              {form.client && form.client !== "General" && (
                <div className="flex gap-3">
                  <span className="text-gray-600 w-24 shrink-0">Client</span>
                  <span className="text-gray-300">{form.client}</span>
                </div>
              )}
              <div className="flex gap-3">
                <span className="text-gray-600 w-24 shrink-0">Section</span>
                <span className="text-gray-400">Home → Select Works</span>
              </div>
              {form.fileName && (
                <div className="flex gap-3">
                  <span className="text-gray-600 w-24 shrink-0">File</span>
                  <span className="text-gray-300 break-all">{form.fileName}</span>
                </div>
              )}
              {form.description && (
                <div className="flex gap-3">
                  <span className="text-gray-600 w-24 shrink-0">Description</span>
                  <span className="text-gray-400 line-clamp-3">{form.description}</span>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-2">
              <Link to={item.link} target="_blank"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg>
                View card detail page
              </Link>
              <Link to="/manage-select-works"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3A1.5 1.5 0 0 1 15 10.5v3A1.5 1.5 0 0 1 13.5 15h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                </svg>
                Open Select Works manager
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
