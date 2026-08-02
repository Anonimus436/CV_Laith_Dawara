/**
 * DownloadButton — renders a styled download anchor for a file served from /public.
 *
 * Props:
 *   downloadPath  string  URL path to the file (e.g. "/files/Blogs/foo.docx")
 *   fileName      string  The suggested filename for the download
 */
const DownloadButton = ({ downloadPath, fileName }) => {
  if (!downloadPath) return null;

  return (
    <div className="mt-10">
      <a
        href={downloadPath}
        download={fileName}
        className="inline-flex items-center gap-3 bg-primary text-black font-semibold px-6 py-3 rounded-2xl hover:opacity-90 active:scale-95 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
        </svg>
        Download File
      </a>
    </div>
  );
};

export default DownloadButton;
