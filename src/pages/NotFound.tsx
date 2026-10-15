import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-primary neon-text">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 neon-glow"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
