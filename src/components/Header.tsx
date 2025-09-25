import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">AutoFlow Learn</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={`transition-colors ${
                  isActive("/") && location === "/"
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
                data-testid="nav-home"
              >
                Home
              </Link>
              <Link 
                href="/tutorials" 
                className={`transition-colors ${
                  isActive("/tutorials")
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
                data-testid="nav-tutorials"
              >
                Tutorials
              </Link>
              <Link 
                href="/workspace" 
                className={`transition-colors ${
                  isActive("/workspace")
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
                data-testid="nav-workspace"
              >
                Workspace
              </Link>
              <Link 
                href="/about" 
                className={`transition-colors ${
                  isActive("/about")
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
                data-testid="nav-about"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/profile"
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-profile"
            >
              <User className="w-6 h-6" />
            </Link>
            <Button size="sm" data-testid="button-sign-in">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
