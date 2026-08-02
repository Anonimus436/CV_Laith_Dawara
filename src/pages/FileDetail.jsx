import { useParams, Link } from "react-router-dom";
import Container from "../components/Container";
import { FILE_REGISTRY } from "../data/worksData";
import { useWorks } from "../context/WorksContext";
import { resolvePublicFilePath } from "../utils/publicFilePath";

// Icon helpers
const DocxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const XlsxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125V5.625m0 12.75V5.625m0 0A1.125 1.125 0 014.5 4.5h15a1.125 1.125 0 011.125 1.125M3.375 5.625h17.25m0 0v12.75m0-12.75A1.125 1.125 0 0019.5 4.5m1.125 1.125V18.375A1.125 1.125 0 0119.5 19.5m-15-12.75h1.5m11.25 0h1.5m-13.5 4.5h1.5m11.25 0h1.5m-13.5 4.5h1.5m11.25 0h1.5" />
  </svg>
);

const FILE_TYPE_LABELS = {
  docx: "Word Document",
  pdf: "PDF Document",
  xlsx: "Excel Spreadsheet",
};

const FILE_TYPE_COLORS = {
  docx: "bg-blue-900/30 text-blue-400 border border-blue-800",
  pdf: "bg-red-900/30 text-red-400 border border-red-800",
  xlsx: "bg-green-900/30 text-green-400 border border-green-800",
};

const FileDetail = () => {
  const { slug } = useParams();
  const { items } = useWorks();

  // look up in dynamic items first (includes static seed), fallback to FILE_REGISTRY
  const item = items.find((i) => i.slug === slug) ?? FILE_REGISTRY[slug];

  if (!item) {
    return (
      <div className="bg-black text-white min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-6">File not found.</p>
          <Link to="/portfolio" className="text-primary underline">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const isRTL = /[\u0600-\u06FF]/.test(item.text);
  const Icon = item.fileType === "pdf" ? PdfIcon : item.fileType === "xlsx" ? XlsxIcon : DocxIcon;

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container>
        {/* Hero Image */}
        <img
          src={item.img}
          alt={item.text}
          className="w-full max-h-[420px] object-cover rounded-3xl mb-12"
        />

        {/* Category badge */}
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
          {item.category}
        </p>

        {/* Title */}
        <h1
          className="text-4xl font-bold font-serif mb-6 max-w-3xl"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {item.text}
        </h1>

        {/* Description */}
        <p
          className="text-gray-400 text-lg mb-12 max-w-2xl"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {item.description}
        </p>

        <hr className="border-[#272727] mb-12" />

        {/* File info card */}
        <div className="max-w-2xl bg-[#141414] rounded-3xl p-8 space-y-6">
          {/* File type header */}
          <div className="flex items-center gap-4">
            <Icon />
            <div>
              <p className="text-white font-semibold text-lg">{FILE_TYPE_LABELS[item.fileType]}</p>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${FILE_TYPE_COLORS[item.fileType]}`}>
                .{item.fileType}
              </span>
            </div>
          </div>

          {/* Metadata rows */}
          <div className="space-y-3 text-sm text-gray-400 border-t border-[#272727] pt-5">
            <div className="flex gap-3">
              <span className="text-gray-500 w-24 shrink-0">File name</span>
              <span className="text-gray-300 break-all" dir={isRTL ? "rtl" : "ltr"}>
                {item.fileName}
              </span>
            </div>

            {item.client && item.client !== "General" && (
              <div className="flex gap-3">
                <span className="text-gray-500 w-24 shrink-0">Client</span>
                <span className="text-gray-300">{item.client}</span>
              </div>
            )}

            <div className="flex gap-3">
              <span className="text-gray-500 w-24 shrink-0">Category</span>
              <span className="text-gray-300">{item.category}</span>
            </div>
          </div>

          {/* Download button */}
          <div className="border-t border-[#272727] pt-6">
            <a
              href={resolvePublicFilePath(item.downloadPath)}
              download={item.fileName}
              className="inline-flex items-center gap-3 bg-primary text-black font-semibold px-6 py-3 rounded-2xl hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Download File
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium transition-opacity hover:opacity-80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default FileDetail;
