import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Code } from "lucide-react";
import { Tutorial } from "@shared/schema";

export default function TutorialDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  
  const { data: tutorial, isLoading } = useQuery<Tutorial>({
    queryKey: ["/api/tutorials", params.id],
  });

  const handleTryInWorkspace = () => {
    if (tutorial?.lessons && tutorial.lessons[currentStep]) {
      // Store current lesson code in localStorage for workspace
      localStorage.setItem('workspaceCode', tutorial.lessons[currentStep].codeExample || '');
      localStorage.setItem('workspaceLanguage', 'bash');
      setLocation('/workspace');
    }
  };

  const handleNext = () => {
    if (tutorial?.lessons && currentStep < tutorial.lessons.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (tutorial) {
      // Mark tutorial as completed in localStorage
      const progress = JSON.parse(localStorage.getItem('tutorialProgress') || '{}');
      progress[tutorial.id] = { 
        status: 'completed', 
        progress: 100, 
        completedAt: new Date().toISOString() 
      };
      localStorage.setItem('tutorialProgress', JSON.stringify(progress));
      
      // Navigate back to tutorials with completion feedback
      setLocation('/tutorials');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBack = () => {
    setLocation('/tutorials');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="h-2 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tutorial Not Found</h1>
          <p className="text-muted-foreground mb-4">The tutorial you're looking for doesn't exist.</p>
          <Button onClick={handleBack} data-testid="button-back-to-tutorials">
            Back to Tutorials
          </Button>
        </Card>
      </div>
    );
  }

  const currentLesson = tutorial?.lessons?.[currentStep];
  const progressPercentage = tutorial?.lessons ? ((currentStep + 1) / tutorial.lessons.length) * 100 : 0;
  const isLastStep = tutorial?.lessons && currentStep === tutorial.lessons.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tutorial Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-tutorial-title">
            {tutorial.title}
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground" data-testid="text-step-progress">
              Step {currentStep + 1} of {tutorial?.lessons?.length || 0}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {currentLesson?.duration || 5} minutes left
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progressPercentage} className="mb-8" data-testid="progress-lesson" />

      {/* Lesson Content */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6" data-testid="text-lesson-title">
          {currentLesson?.title}
        </h2>
        
        <div className="prose prose-gray max-w-none mb-8">
          <p className="text-lg text-muted-foreground mb-4">
            {currentLesson?.content}
          </p>
        </div>

        {/* Code Example */}
        {currentLesson?.codeExample && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Try this command:</h3>
            <div className="bg-muted border border-border rounded-lg p-4 mb-4 font-mono text-sm">
              <code className="text-foreground" data-testid="code-example">
                {currentLesson.codeExample}
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              Copy this code and try it in the workspace to see how it works.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleTryInWorkspace}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            data-testid="button-try-workspace"
          >
            <Code className="w-5 h-5 mr-2" />
            Try in Workspace
          </Button>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
          data-testid="button-previous"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </Button>
        
        {isLastStep ? (
          <Button
            onClick={handleComplete}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            data-testid="button-complete"
          >
            <span>Complete Tutorial</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!tutorial?.lessons}
            className="flex items-center space-x-2"
            data-testid="button-next"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
