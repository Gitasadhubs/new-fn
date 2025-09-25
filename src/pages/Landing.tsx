import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Code, Cloud } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleStartLearning = () => {
    setLocation("/tutorials");
  };

  const handleTutorialStart = (tutorialId: string) => {
    setLocation(`/tutorials/${tutorialId}`);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Master CI/CD
            <span className="text-primary"> Step by Step</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Learn Git, GitHub Actions, and deployment through interactive tutorials and hands-on practice. 
            Build real projects and deploy them with confidence.
          </p>
          <Button 
            onClick={handleStartLearning}
            size="lg" 
            className="text-lg font-semibold px-8 py-4 h-auto"
            data-testid="button-start-learning"
          >
            Start Learning
          </Button>
        </div>
      </section>

      {/* 3-Step Learning Flow */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Learn */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Learn</h3>
              <p className="text-muted-foreground">
                Follow step-by-step tutorials with clear explanations. 
                Start with Git basics and work up to advanced CI/CD.
              </p>
            </div>

            {/* Step 2: Practice */}
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">2. Practice</h3>
              <p className="text-muted-foreground">
                Use our built-in workspace with Monaco Editor. 
                Try code examples and see results instantly.
              </p>
            </div>

            {/* Step 3: Deploy */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cloud className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Deploy</h3>
              <p className="text-muted-foreground">
                Push your projects to GitHub and deploy them to live URLs. 
                Share your work with the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutorials Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-16">Start with These Tutorials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Git Basics Tutorial */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#f14e32]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#f14e32]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Git Basics</h3>
                  <p className="text-sm text-muted-foreground">Learn version control</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">Master init, add, commit, and push. Start your Git journey with hands-on practice.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">6 lessons</span>
                <Button 
                  variant="ghost" 
                  onClick={() => handleTutorialStart("git-basics")}
                  className="text-primary hover:text-primary/80"
                  data-testid="button-start-git"
                >
                  Start →
                </Button>
              </div>
            </Card>

            {/* GitHub Actions Tutorial */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#24292f]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#24292f]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 10.956-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.219-.359-1.219c0-1.141.219-1.994.937-1.994.437 0 .219 1.141.219 1.681 0 1.031-.359 2.401-.539 3.739-.157.937.458 1.681 1.404 1.681 1.687 0 2.981-1.781 2.981-4.354 0-2.283-1.641-3.877-3.984-3.877-2.714 0-4.313 2.042-4.313 4.146 0 .823.312 1.708.703 2.188.078.094.089.175.065.27-.071.298-.229.919-.26 1.048-.041.177-.135.214-.312.129-1.192-.557-1.942-2.298-1.942-3.721 0-3.016 2.188-5.787 6.317-5.787 3.317 0 5.896 2.363 5.896 5.531 0 3.317-2.094 5.98-4.99 5.98-.974 0-1.896-.52-2.208-1.141l-.599 2.283c-.218.854-.806 1.929-1.203 2.581.906.281 1.869.433 2.869.433 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">GitHub Actions</h3>
                  <p className="text-sm text-muted-foreground">Automate your workflow</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">Build YAML workflows that test and deploy your code automatically on every push.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">8 lessons</span>
                <Button 
                  variant="ghost" 
                  onClick={() => handleTutorialStart("github-actions")}
                  className="text-primary hover:text-primary/80"
                  data-testid="button-start-actions"
                >
                  Start →
                </Button>
              </div>
            </Card>

            {/* Deploy React App Tutorial */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#00d8ff]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#00d8ff]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 8.906c-1.655 0-3 1.345-3 3s1.345 3 3 3 3-1.345 3-3-1.345-3-3-3zm0 4.594c-.88 0-1.594-.714-1.594-1.594s.714-1.594 1.594-1.594 1.594.714 1.594 1.594-.714 1.594-1.594 1.594zm8.906-1.5c0-1.072-.862-1.969-1.925-2.031-.281-1.656-1.053-3.188-2.219-4.375-.719-.719-1.594-1.281-2.531-1.656C13.875 2.844 13 2.125 12.017 2.125S10.156 2.844 9.781 3.938c-.938.375-1.813.938-2.531 1.656-1.166 1.188-1.938 2.719-2.219 4.375C3.969 10.031 3.11 10.928 3.11 12c0 1.072.859 1.969 1.922 2.031.281 1.656 1.053 3.188 2.219 4.375.719.719 1.594 1.281 2.531 1.656.375 1.094 1.25 1.813 2.234 1.813s1.859-.719 2.234-1.813c.938-.375 1.813-.938 2.531-1.656 1.166-1.188 1.938-2.719 2.219-4.375 1.063-.062 1.925-.959 1.925-2.031zm-1.406 0c0 .281-.219.5-.5.5-.031 0-.062 0-.094-.031-.344-1.344-.906-2.594-1.688-3.656.781-1.063 1.344-2.313 1.688-3.656.031 0 .063-.031.094-.031.281 0 .5.219.5.5v6.375z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Deploy React App</h3>
                  <p className="text-sm text-muted-foreground">Ship to production</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">Deploy React apps to Vercel with automated workflows. See your app live in minutes.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">5 lessons</span>
                <Button 
                  variant="ghost" 
                  onClick={() => handleTutorialStart("deploy-react")}
                  className="text-primary hover:text-primary/80"
                  data-testid="button-start-deploy"
                >
                  Start →
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
