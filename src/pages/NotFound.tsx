
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/10 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-7xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you're looking for: <span className="font-mono bg-secondary/50 px-2 py-1 rounded text-sm">{location.pathname}</span>
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="glass-card">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
