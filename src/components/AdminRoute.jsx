import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SESSION_KEY = "admin_authenticated";

/**
 * Wraps a protected page. If the user isn't authenticated this session,
 * they are redirected to /admin-login with the current path as the redirect target.
 */
export default function AdminRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  // Use a state flag so we don't flash the protected page before the redirect
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const authenticated = sessionStorage.getItem(SESSION_KEY) === "true";
    if (!authenticated) {
      navigate(
        `/admin-login?redirect=${encodeURIComponent(location.pathname)}`,
        { replace: true, state: { from: location.state?.from || "/" } }
      );
    } else {
      setAllowed(true);
    }
  }, [navigate, location]);

  if (!allowed) return null;
  return children;
}
