import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAbout } from "../context/AboutContext";

// ─── helpers ──────────────────────────────────────────────────────────────────
function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// ─── shared small components ─────────────────────────────────────────────────
const Label = ({ children }) => (
  <label className="block text-sm font-semibold text-gray-300 mb-1.5">{children}</label>
);

const TextInput = ({ value, onChange, placeholder, className = "" }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors ${className}`}
  />
);

const Textarea = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors resize-none"
  />
);

const PrimaryBtn = ({ children, onClick, type = "button", disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="bg-primary text-black font-bold py-2.5 px-5 rounded-xl hover:opacity-90 active:scale-95 transition-all text-sm disabled:opacity-50"
  >
    {children}
  </button>
);

const DeleteBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-800/40 rounded-xl px-3 py-1.5 text-xs"
  >
    🗑️ Delete
  </button>
);

const EditBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 border border-[#2e2e2e] rounded-xl px-3 py-1.5 text-xs"
  >
    ✏️ Edit
  </button>
);

// Inline delete confirmation
function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-red-400">
      Are you sure?
      <button onClick={onConfirm} className="text-red-400 hover:text-red-300 font-bold underline">Yes</button>
      <button onClick={onCancel} className="text-gray-400 hover:text-gray-200 font-bold underline">No</button>
    </span>
  );
}

// Image uploader widget
function ImgUploader({ label, current, seedImg, onUpload, onRevert }) {
  const ref = useRef();
  const preview = current ?? seedImg;
  return (
    <div>
      <Label>{label}</Label>
      <div
        className="border-2 border-dashed border-[#2e2e2e] rounded-2xl p-4 hover:border-primary/50 transition-colors cursor-pointer mb-2"
        onClick={() => ref.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-20 h-20 object-cover rounded-xl" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-600 py-3">
            <span className="text-2xl">🖼️</span>
            <span className="text-xs">Click to upload</span>
          </div>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const dataURL = await readFileAsDataURL(file);
          onUpload(dataURL);
          e.target.value = "";
        }}
      />
      {current && (
        <button type="button" onClick={onRevert} className="text-xs text-red-400 hover:underline">
          ↩ Revert to original
        </button>
      )}
    </div>
  );
}

// Accordion section wrapper
function Section({ title, open, onToggle, children }) {
  return (
    <div className="border border-[#272727] rounded-2xl overflow-hidden">
      <div
        className="bg-[#141414] border-b border-[#272727] p-5 cursor-pointer flex justify-between items-center"
        onClick={onToggle}
      >
        <span className="text-white font-semibold text-base">{title}</span>
        <span className="text-gray-400 text-sm">{open ? "▲" : "▼"}</span>
      </div>
      {open && <div className="bg-black p-6 space-y-5">{children}</div>}
    </div>
  );
}

// Success toast
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="fixed top-6 right-6 z-50 bg-primary/10 border border-primary text-primary text-sm rounded-2xl px-5 py-3 font-medium shadow-lg animate-pulse">
      ✓ {msg}
    </div>
  );
}

// ─── BIO SECTION ─────────────────────────────────────────────────────────────
function BioSection({ data, updateAbout, flash }) {
  const { bio, SEED_PROFILE_IMG } = data;
  const [name, setName] = useState(bio.name);
  const [workingSince, setWorkingSince] = useState(bio.workingSince);
  const [introduction, setIntroduction] = useState(bio.introduction);
  const [profileImg, setProfileImg] = useState(bio.profileImg);

  function handleSave() {
    updateAbout("bio", { name, workingSince, introduction, profileImg });
    flash("Bio saved");
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      </div>
      <div>
        <Label>Working Since</Label>
        <TextInput value={workingSince} onChange={(e) => setWorkingSince(e.target.value)} placeholder="e.g. 2021" />
      </div>
      <div>
        <Label>Introduction</Label>
        <Textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder="Short bio..." rows={5} />
      </div>
      <ImgUploader
        label="Profile Photo"
        current={profileImg}
        seedImg={data.SEED_PROFILE_IMG}
        onUpload={(url) => setProfileImg(url)}
        onRevert={() => setProfileImg(null)}
      />
      <PrimaryBtn onClick={handleSave}>Save Bio</PrimaryBtn>
    </div>
  );
}

// ─── GENERIC LIST SECTION (Work Experience / Education / Tools) ───────────────
function ListItem({ item, fields, onEdit, onDelete, confirmDelete, setConfirmDelete }) {
  const isConfirming = confirmDelete === item.id;
  const thumbSrc = item.logoImg ?? item.logoSeed;
  const primaryLabel = fields[0] ? item[fields[0].key] : "";
  const secondaryLabel = fields[1] ? item[fields[1].key] : "";

  return (
    <div className="flex items-center gap-4 bg-[#141414] border border-[#272727] rounded-2xl p-4">
      {thumbSrc && (
        <img src={thumbSrc} alt={primaryLabel} className="w-12 h-12 rounded-xl object-cover shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{primaryLabel}</p>
        {secondaryLabel && <p className="text-gray-500 text-xs mt-0.5 truncate">{secondaryLabel}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {isConfirming ? (
          <DeleteConfirm onConfirm={() => { onDelete(item.id); setConfirmDelete(null); }} onCancel={() => setConfirmDelete(null)} />
        ) : (
          <>
            <EditBtn onClick={() => onEdit(item.id)} />
            <DeleteBtn onClick={() => setConfirmDelete(item.id)} />
          </>
        )}
      </div>
    </div>
  );
}

function LogoListSection({ sectionKey, items, fields, updateAbout, flash, emptyItem, sectionTitle }) {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState(emptyItem);

  function startEdit(id) {
    const item = items.find((i) => i.id === id);
    setEditingId(id);
    setForm({ ...item });
    setAdding(false);
  }

  function cancelEdit() { setEditingId(null); setForm(null); }

  function saveEdit() {
    updateAbout(sectionKey, items.map((i) => (i.id === editingId ? form : i)));
    flash(`${sectionTitle} updated`);
    cancelEdit();
  }

  function doDelete(id) {
    updateAbout(sectionKey, items.filter((i) => i.id !== id));
    flash("Item deleted");
  }

  function startAdd() { setAdding(true); setAddForm({ ...emptyItem, id: genId() }); setEditingId(null); }
  function cancelAdd() { setAdding(false); setAddForm(emptyItem); }

  function saveAdd() {
    updateAbout(sectionKey, [...items, addForm]);
    flash("Item added");
    cancelAdd();
  }

  const renderForm = (f, setF, onSave, onCancel, isNew) => (
    <div className="bg-[#0d0d0d] border border-[#272727] rounded-2xl p-5 space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <Label>{field.label}</Label>
          {field.type === "textarea" ? (
            <Textarea value={f[field.key] || ""} onChange={(e) => setF((p) => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} />
          ) : (
            <TextInput value={f[field.key] || ""} onChange={(e) => setF((p) => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} />
          )}
        </div>
      ))}
      <ImgUploader
        label="Logo"
        current={f.logoImg ?? null}
        seedImg={f.logoSeed ?? null}
        onUpload={(url) => setF((p) => ({ ...p, logoImg: url }))}
        onRevert={() => setF((p) => ({ ...p, logoImg: null }))}
      />
      <div className="flex gap-3 pt-1">
        <PrimaryBtn onClick={onSave}>{isNew ? "Add" : "Save Changes"}</PrimaryBtn>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] text-gray-400 text-sm hover:bg-[#222] transition-colors">Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id}>
          <ListItem
            item={item}
            fields={fields}
            onEdit={startEdit}
            onDelete={doDelete}
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
          />
          {editingId === item.id && form && renderForm(form, setForm, saveEdit, cancelEdit, false)}
        </div>
      ))}
      {adding && renderForm(addForm, setAddForm, saveAdd, cancelAdd, true)}
      {!adding && (
        <button
          type="button"
          onClick={startAdd}
          className="w-full bg-[#141414] border border-dashed border-[#2e2e2e] rounded-2xl py-3 text-sm text-gray-500 hover:text-primary hover:border-primary/50 transition-colors"
        >
          + Add New
        </button>
      )}
    </div>
  );
}

// ─── CAPABILITIES SECTION ────────────────────────────────────────────────────
function CapabilitiesSection({ items, updateAbout, flash }) {
  const [list, setList] = useState(items);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [newPct, setNewPct] = useState(80);

  function save() { updateAbout("capabilities", list); flash("Capabilities saved"); }

  function handlePct(id, val) {
    setList((prev) => prev.map((c) => c.id === id ? { ...c, percentage: Number(val) } : c));
  }
  function handleLabel(id, val) {
    setList((prev) => prev.map((c) => c.id === id ? { ...c, label: val } : c));
  }
  function doDelete(id) { setList((prev) => prev.filter((c) => c.id !== id)); setConfirmDelete(null); }
  function addNew() {
    if (!newLabel.trim()) return;
    setList((prev) => [...prev, { id: genId(), label: newLabel.trim(), percentage: newPct }]);
    setNewLabel(""); setNewPct(80);
  }

  return (
    <div className="space-y-4">
      {list.map((cap) => (
        <div key={cap.id} className="bg-[#141414] border border-[#272727] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <TextInput value={cap.label} onChange={(e) => handleLabel(cap.id, e.target.value)} placeholder="Label" className="flex-1" />
            <span className="text-primary font-bold text-sm w-12 text-right">{cap.percentage}%</span>
            <div className="shrink-0">
              {confirmDelete === cap.id ? (
                <DeleteConfirm onConfirm={() => doDelete(cap.id)} onCancel={() => setConfirmDelete(null)} />
              ) : (
                <DeleteBtn onClick={() => setConfirmDelete(cap.id)} />
              )}
            </div>
          </div>
          <input
            type="range" min={0} max={100} value={cap.percentage}
            onChange={(e) => handlePct(cap.id, e.target.value)}
            className="w-full accent-primary"
          />
        </div>
      ))}

      <div className="bg-[#0d0d0d] border border-dashed border-[#2e2e2e] rounded-2xl p-4 space-y-3">
        <Label>Add New Capability</Label>
        <TextInput value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Label" />
        <div className="flex items-center gap-3">
          <input type="range" min={0} max={100} value={newPct} onChange={(e) => setNewPct(Number(e.target.value))} className="flex-1 accent-primary" />
          <span className="text-primary font-bold text-sm w-12 text-right">{newPct}%</span>
        </div>
        <PrimaryBtn onClick={addNew}>+ Add</PrimaryBtn>
      </div>

      <PrimaryBtn onClick={save}>Save Capabilities</PrimaryBtn>
    </div>
  );
}

// ─── LANGUAGES SECTION ───────────────────────────────────────────────────────
function LanguagesSection({ items, updateAbout, flash }) {
  const [list, setList] = useState(items);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [newName, setNewName] = useState("");
  const [newLevel, setNewLevel] = useState("");

  function save() { updateAbout("languages", list); flash("Languages saved"); }
  function updateField(id, key, val) { setList((prev) => prev.map((l) => l.id === id ? { ...l, [key]: val } : l)); }
  function doDelete(id) { setList((prev) => prev.filter((l) => l.id !== id)); setConfirmDelete(null); }
  function addNew() {
    if (!newName.trim()) return;
    setList((prev) => [...prev, { id: genId(), name: newName.trim(), level: newLevel.trim() }]);
    setNewName(""); setNewLevel("");
  }

  return (
    <div className="space-y-4">
      {list.map((lang) => (
        <div key={lang.id} className="bg-[#141414] border border-[#272727] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <TextInput value={lang.name} onChange={(e) => updateField(lang.id, "name", e.target.value)} placeholder="Language" className="flex-1" />
            <TextInput value={lang.level} onChange={(e) => updateField(lang.id, "level", e.target.value)} placeholder="Level" className="flex-1" />
            <div className="shrink-0">
              {confirmDelete === lang.id ? (
                <DeleteConfirm onConfirm={() => doDelete(lang.id)} onCancel={() => setConfirmDelete(null)} />
              ) : (
                <DeleteBtn onClick={() => setConfirmDelete(lang.id)} />
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="bg-[#0d0d0d] border border-dashed border-[#2e2e2e] rounded-2xl p-4 space-y-3">
        <Label>Add New Language</Label>
        <div className="flex gap-3">
          <TextInput value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Language name" />
          <TextInput value={newLevel} onChange={(e) => setNewLevel(e.target.value)} placeholder="Level" />
        </div>
        <PrimaryBtn onClick={addNew}>+ Add</PrimaryBtn>
      </div>
      <PrimaryBtn onClick={save}>Save Languages</PrimaryBtn>
    </div>
  );
}

// ─── SOFT SKILLS SECTION ─────────────────────────────────────────────────────
function SoftSkillsSection({ items, updateAbout, flash }) {
  const [list, setList] = useState(items);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [newText, setNewText] = useState("");

  function save() { updateAbout("softSkills", list); flash("Soft skills saved"); }
  function updateText(id, val) { setList((prev) => prev.map((s) => s.id === id ? { ...s, text: val } : s)); }
  function doDelete(id) { setList((prev) => prev.filter((s) => s.id !== id)); setConfirmDelete(null); }
  function addNew() {
    if (!newText.trim()) return;
    setList((prev) => [...prev, { id: genId(), text: newText.trim() }]);
    setNewText("");
  }

  return (
    <div className="space-y-3">
      {list.map((skill) => (
        <div key={skill.id} className="flex items-center gap-3 bg-[#141414] border border-[#272727] rounded-2xl p-4">
          <TextInput value={skill.text} onChange={(e) => updateText(skill.id, e.target.value)} placeholder="Skill" className="flex-1" />
          <div className="shrink-0">
            {confirmDelete === skill.id ? (
              <DeleteConfirm onConfirm={() => doDelete(skill.id)} onCancel={() => setConfirmDelete(null)} />
            ) : (
              <DeleteBtn onClick={() => setConfirmDelete(skill.id)} />
            )}
          </div>
        </div>
      ))}
      <div className="bg-[#0d0d0d] border border-dashed border-[#2e2e2e] rounded-2xl p-4">
        <Label>Add New Soft Skill</Label>
        <div className="flex gap-3 mt-1">
          <TextInput value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Soft skill text" />
          <PrimaryBtn onClick={addNew}>+ Add</PrimaryBtn>
        </div>
      </div>
      <PrimaryBtn onClick={save}>Save Soft Skills</PrimaryBtn>
    </div>
  );
}

// ─── STATS SECTION ───────────────────────────────────────────────────────────
function StatsSection({ items, updateAbout, flash }) {
  const [list, setList] = useState(items);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [nNum, setNNum] = useState(""); const [nSuf, setNSuf] = useState(""); const [nLab, setNLab] = useState("");

  function save() { updateAbout("stats", list); flash("Stats saved"); }
  function updateField(id, key, val) { setList((prev) => prev.map((s) => s.id === id ? { ...s, [key]: val } : s)); }
  function doDelete(id) { setList((prev) => prev.filter((s) => s.id !== id)); setConfirmDelete(null); }
  function addNew() {
    if (!nNum.trim() || !nLab.trim()) return;
    setList((prev) => [...prev, { id: genId(), number: nNum.trim(), suffix: nSuf.trim(), label: nLab.trim() }]);
    setNNum(""); setNSuf(""); setNLab("");
  }

  return (
    <div className="space-y-4">
      {list.map((stat) => (
        <div key={stat.id} className="bg-[#141414] border border-[#272727] rounded-2xl p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <TextInput value={stat.number} onChange={(e) => updateField(stat.id, "number", e.target.value)} placeholder="Number" className="w-24" />
            <TextInput value={stat.suffix} onChange={(e) => updateField(stat.id, "suffix", e.target.value)} placeholder="Suffix" className="w-20" />
            <TextInput value={stat.label}  onChange={(e) => updateField(stat.id, "label", e.target.value)} placeholder="Label" className="flex-1" />
            <div className="shrink-0">
              {confirmDelete === stat.id ? (
                <DeleteConfirm onConfirm={() => doDelete(stat.id)} onCancel={() => setConfirmDelete(null)} />
              ) : (
                <DeleteBtn onClick={() => setConfirmDelete(stat.id)} />
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="bg-[#0d0d0d] border border-dashed border-[#2e2e2e] rounded-2xl p-4 space-y-3">
        <Label>Add New Stat</Label>
        <div className="flex gap-3 flex-wrap">
          <TextInput value={nNum} onChange={(e) => setNNum(e.target.value)} placeholder="Number (e.g. 5)" className="w-28" />
          <TextInput value={nSuf} onChange={(e) => setNSuf(e.target.value)} placeholder="Suffix (+ or %)" className="w-24" />
          <TextInput value={nLab} onChange={(e) => setNLab(e.target.value)} placeholder="Label" className="flex-1" />
        </div>
        <PrimaryBtn onClick={addNew}>+ Add</PrimaryBtn>
      </div>
      <PrimaryBtn onClick={save}>Save Stats</PrimaryBtn>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function AboutEditPage() {
  const { data, updateAbout, SEED_PROFILE_IMG } = useAbout();
  const [openSection, setOpenSection] = useState("bio");
  const [toast, setToast] = useState("");

  function flash(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function toggle(key) {
    setOpenSection((prev) => (prev === key ? null : key));
  }

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4">
      <Toast msg={toast} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-1">Admin</p>
            <h1 className="text-4xl font-bold font-serif">Edit About</h1>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline hover:opacity-80 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to About
          </Link>
        </div>

        {/* Accordion sections */}
        <div className="space-y-4">

          {/* 1. Bio */}
          <Section title="1. Bio" open={openSection === "bio"} onToggle={() => toggle("bio")}>
            <BioSection data={{ bio: data.bio, SEED_PROFILE_IMG }} updateAbout={updateAbout} flash={flash} />
          </Section>

          {/* 2. Work Experience */}
          <Section title="2. Work Experience" open={openSection === "workExperience"} onToggle={() => toggle("workExperience")}>
            <LogoListSection
              sectionKey="workExperience"
              items={data.workExperience}
              fields={[
                { key: "company", label: "Company Name", placeholder: "e.g. Acme Corp" },
                { key: "period",  label: "Period",        placeholder: "e.g. Jan 2022 - Present" },
              ]}
              updateAbout={updateAbout}
              flash={flash}
              emptyItem={{ id: "", company: "", period: "", logoImg: null, logoSeed: null }}
              sectionTitle="Work Experience"
            />
          </Section>

          {/* 3. Education */}
          <Section title="3. Education" open={openSection === "education"} onToggle={() => toggle("education")}>
            <LogoListSection
              sectionKey="education"
              items={data.education}
              fields={[
                { key: "degree", label: "Degree",  placeholder: "e.g. Bachelor in Computer Science" },
                { key: "period", label: "Period",  placeholder: "e.g. 2020 - 2024" },
              ]}
              updateAbout={updateAbout}
              flash={flash}
              emptyItem={{ id: "", degree: "", period: "", logoImg: null, logoSeed: null }}
              sectionTitle="Education"
            />
          </Section>

          {/* 4. Tools */}
          <Section title="4. Tools" open={openSection === "tools"} onToggle={() => toggle("tools")}>
            <LogoListSection
              sectionKey="tools"
              items={data.tools}
              fields={[
                { key: "name",        label: "Tool Name",   placeholder: "e.g. Adobe Photoshop" },
                { key: "description", label: "Description", placeholder: "e.g. Design" },
              ]}
              updateAbout={updateAbout}
              flash={flash}
              emptyItem={{ id: "", name: "", description: "", logoImg: null, logoSeed: null }}
              sectionTitle="Tools"
            />
          </Section>

          {/* 5. Capabilities */}
          <Section title="5. Capabilities" open={openSection === "capabilities"} onToggle={() => toggle("capabilities")}>
            <CapabilitiesSection items={data.capabilities} updateAbout={updateAbout} flash={flash} />
          </Section>

          {/* 6. Languages */}
          <Section title="6. Languages" open={openSection === "languages"} onToggle={() => toggle("languages")}>
            <LanguagesSection items={data.languages} updateAbout={updateAbout} flash={flash} />
          </Section>

          {/* 7. Soft Skills */}
          <Section title="7. Soft Skills" open={openSection === "softSkills"} onToggle={() => toggle("softSkills")}>
            <SoftSkillsSection items={data.softSkills} updateAbout={updateAbout} flash={flash} />
          </Section>

          {/* 8. Stats */}
          <Section title="8. Stats" open={openSection === "stats"} onToggle={() => toggle("stats")}>
            <StatsSection items={data.stats} updateAbout={updateAbout} flash={flash} />
          </Section>

        </div>
      </div>
    </div>
  );
}
