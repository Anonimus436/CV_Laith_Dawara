import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const SESSION_KEY = "admin_authenticated";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // The page to go to after a correct password
  const redirect = searchParams.get("redirect") || "/";
  // The page to go back to if the user cancels or enters a wrong password
  const from = location.state?.from || "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Warn in console if env variable is not configured
  useEffect(() => {
    if (!ADMIN_PASSWORD) {
      console.warn(
        "[AdminLogin] VITE_ADMIN_PASSWORD is not set. All authentication attempts will be rejected."
      );
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!password.trim()) {
      setError("Please enter the password.");
      return;
    }

    if (!ADMIN_PASSWORD) {
      setError("Admin password is not configured. Contact the site owner.");
      return;
    }

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      navigate(redirect, { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  }

  function handleCancel() {
    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
        aria-hidden="true"
        style={{
          width: 1,
          height: 1,
          boxShadow: "0 0 300px 200px #c35185",
          borderRadius: "50%",
        }}
      />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-[#111] border border-[#272727] rounded-3xl p-8 shadow-2xl">
          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="text-primary"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold font-serif text-white text-center mb-1">
            Admin Access
          </h1>
          <p className="text-gray-500 text-sm text-center mb-8">
            Enter the password to continue to the editing page.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Password input */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-gray-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  maxLength={128}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors ${
                    error
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#2e2e2e] focus:border-primary"
                  }`}
                />
                {/* Show / hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    // Eye-slash icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Error message */}
              {error && (
                <p role="alert" className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={!ADMIN_PASSWORD}
                className="flex-1 bg-primary text-black font-bold py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Unlock
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 font-semibold py-3 rounded-xl transition-colors text-sm border border-[#2e2e2e]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Small hint */}
        <p className="text-center text-gray-700 text-xs mt-6">
          This page is for site administrators only.
        </p>
      </div>
    </div>
  );
}
