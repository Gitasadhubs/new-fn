import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, RefreshCw, Filter } from "lucide-react";
import TutorialCard from "@/components/TutorialCard";
import { Tutorial } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import { useState, useMemo } from "react";

export default function Tutorials() {
  const { data: tutorials, isLoading, error, isError } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/tutorials"] });
  };

  // Get unique categories from tutorials
  const categories = useMemo(() => {
    if (!tutorials) return ["All"];
    const uniqueCategories = Array.from(new Set(tutorials.map(t => t.category)));
    return ["All", ...uniqueCategories.sort()];
  }, [tutorials]);

  // Filter tutorials by selected category
  const filteredTutorials = useMemo(() => {
    if (!tutorials) return [];
    if (selectedCategory === "All") return tutorials;
    return tutorials.filter(tutorial => tutorial.category === selectedCategory);
  }, [tutorials, selectedCategory]);

  // Mock progress data - in real app would come from user state
  const mockProgress: Record<string, { progress: number; status: "completed" | "in-progress" | "not-started" }> = {
    "git-basics": { progress: 100, status: "completed" },
    "github-actions": { progress: 60, status: "in-progress" },
    "deploy-react": { progress: 0, status: "not-started" }
  };

  const completedCount = Object.values(mockProgress).filter(p => p.status === "completed").length;
  const totalCount = filteredTutorials?.length || 0;
  const overallProgress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-page-title">
            Learning Path
          </h1>
          <p className="text-xl text-muted-foreground">Master CI/CD through hands-on tutorials</p>
        </div>
        
        <Alert className="max-w-md mx-auto" data-testid="alert-error">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex flex-col items-start gap-4">
            <div>
              <strong>Unable to load tutorials</strong>
              <p className="text-sm text-muted-foreground mt-1">
                We're having trouble connecting to our servers. Please try again.
              </p>
              {error && (
                <p className="text-xs text-muted-foreground mt-1" data-testid="text-error-details">
                  Error: {error instanceof Error ? error.message : 'Unknown error'}
                </p>
              )}
            </div>
            <Button 
              onClick={handleRetry} 
              variant="outline" 
              size="sm"
              data-testid="button-retry"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-page-title">
          Learning Path
        </h1>
        <p className="text-xl text-muted-foreground">Master modern development through hands-on tutorials</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <Filter className="w-5 h-5 text-muted-foreground mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Filter by Category</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="transition-colors"
            >
              {category}
              {category !== "All" && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-background/50"
                >
                  {tutorials?.filter(t => t.category === category).length || 0}
                </Badge>
              )}
            </Button>
          ))}
        </div>
        {selectedCategory !== "All" && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} in {selectedCategory}
            </p>
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="bg-card rounded-xl p-6 border border-border mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
          <span className="text-muted-foreground" data-testid="text-progress-summary">
            {completedCount} of {totalCount} completed
          </span>
        </div>
        <Progress value={overallProgress} className="mb-2" data-testid="progress-overall" />
        <p className="text-sm text-muted-foreground">
          Keep going! You're making great progress.
        </p>
      </div>

      {/* Tutorial Cards */}
      <div className="grid gap-6">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              progress={mockProgress[tutorial.id as keyof typeof mockProgress]}
            />
          ))
        ) : (
          <div className="text-center py-12" data-testid="no-tutorials-message">
            <h3 className="text-lg font-semibold text-foreground mb-2">No tutorials found</h3>
            <p className="text-muted-foreground">
              No tutorials match the selected category. Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
