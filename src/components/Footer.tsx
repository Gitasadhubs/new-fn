import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-semibold text-foreground">AutoFlow Learn</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-about">
              About
            </a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-help">
              Help
            </a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-github">
              GitHub
            </a>
            <span>© 2024 AutoFlow Learn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
