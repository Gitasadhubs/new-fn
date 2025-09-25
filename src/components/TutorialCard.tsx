import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Container, TestTube, GitBranch, Server, Code, Database, Smartphone, Cloud, Globe, Zap, Cpu, Box, Layout, Settings, FileCode } from "lucide-react";
import { Tutorial } from "@shared/schema";

interface TutorialCardProps {
  tutorial: Tutorial;
  progress?: {
    progress: number;
    status: 'completed' | 'in-progress' | 'not-started';
  };
}

export default function TutorialCard({ tutorial, progress }: TutorialCardProps) {
  const [, setLocation] = useLocation();

  const getIconColor = (icon: string) => {
    switch (icon) {
      // Original icons
      case 'git': return '#f14e32';
      case 'github': return '#24292f';
      case 'react': return '#00d8ff';
      case 'docker': return '#2496ed';
      case 'test': return '#10b981';
      case 'git-branch': return '#f97316';
      case 'server': return '#059669';
      
      // Frontend Frameworks
      case 'vue': return '#4fc08d';
      case 'angular': return '#dd0031';
      case 'svelte': return '#ff3e00';
      case 'nextjs': return '#000000';
      
      // Backend Frameworks
      case 'fastapi': return '#009688';
      case 'django': return '#092e20';
      case 'spring': return '#6db33f';
      case 'laravel': return '#ff2d20';
      case 'rails': return '#d30001';
      
      // Programming Languages
      case 'python': return '#3776ab';
      case 'java': return '#ed8b00';
      case 'go': return '#00add8';
      case 'rust': return '#ce422b';
      case 'php': return '#777bb4';
      case 'ruby': return '#cc342d';
      
      // Mobile Development
      case 'reactnative': return '#00d8ff';
      case 'flutter': return '#02569b';
      case 'swift': return '#fa7343';
      case 'kotlin': return '#7f52ff';
      
      // Cloud Platforms
      case 'aws': return '#ff9900';
      case 'gcp': return '#4285f4';
      case 'azure': return '#0078d4';
      case 'digitalocean': return '#0080ff';
      
      // Databases
      case 'mongodb': return '#47a248';
      case 'redis': return '#dc382d';
      case 'mysql': return '#4479a1';
      case 'sqlite': return '#003b57';
      
      default: return '#6366f1';
    }
  };

  const renderTutorialIcon = (icon: string, color: string) => {
    const commonProps = { className: "w-8 h-8", style: { color } };
    
    switch (icon) {
      // Original icons with custom SVGs
      case 'git':
        return (
          <svg className="w-8 h-8" style={{ color }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="w-8 h-8" style={{ color }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 10.956-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.219-.359-1.219c0-1.141.219-1.994.937-1.994.437 0 .219 1.141.219 1.681 0 1.031-.359 2.401-.539 3.739-.157.937.458 1.681 1.404 1.681 1.687 0 2.981-1.781 2.981-4.354 0-2.283-1.641-3.877-3.984-3.877-2.714 0-4.313 2.042-4.313 4.146 0 .823.312 1.708.703 2.188.078.094.089.175.065.27-.071.298-.229.919-.26 1.048-.041.177-.135.214-.312.129-1.192-.557-1.942-2.298-1.942-3.721 0-3.016 2.188-5.787 6.317-5.787 3.317 0 5.896 2.363 5.896 5.531 0 3.317-2.094 5.98-4.99 5.98-.974 0-1.896-.52-2.208-1.141l-.599 2.283c-.218.854-.806 1.929-1.203 2.581.906.281 1.869.433 2.869.433 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
          </svg>
        );
      case 'react':
      case 'reactnative':
        return (
          <svg className="w-8 h-8" style={{ color }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 8.906c-1.655 0-3 1.345-3 3s1.345 3 3 3 3-1.345 3-3-1.345-3-3-3zm0 4.594c-.88 0-1.594-.714-1.594-1.594s.714-1.594 1.594-1.594 1.594.714 1.594 1.594-.714 1.594-1.594 1.594zm8.906-1.5c0-1.072-.862-1.969-1.925-2.031-.281-1.656-1.053-3.188-2.219-4.375-.719-.719-1.594-1.281-2.531-1.656C13.875 2.844 13 2.125 12.017 2.125S10.156 2.844 9.781 3.938c-.938.375-1.813.938-2.531 1.656-1.166 1.188-1.938 2.719-2.219 4.375C3.969 10.031 3.11 10.928 3.11 12c0 1.072.859 1.969 1.922 2.031.281 1.656 1.053 3.188 2.219 4.375.719.719 1.594 1.281 2.531 1.656.375 1.094 1.25 1.813 2.234 1.813s1.859-.719 2.234-1.813c.938-.375 1.813-.938 2.531-1.656 1.166-1.188 1.938-2.719 2.219-4.375 1.063-.062 1.925-.959 1.925-2.031zm-1.406 0c0 .281-.219.5-.5.5-.031 0-.062 0-.094-.031-.344-1.344-.906-2.594-1.688-3.656.781-1.063 1.344-2.313 1.688-3.656.031 0 .063-.031.094-.031.281 0 .5.219.5.5v6.375z"/>
          </svg>
        );
      
      // Lucide icons for common categories
      case 'docker':
        return <Container {...commonProps} />;
      case 'test':
        return <TestTube {...commonProps} />;
      case 'git-branch':
        return <GitBranch {...commonProps} />;
      case 'server':
      case 'nodejs':
        return <Server {...commonProps} />;
      
      // Frontend Framework icons
      case 'vue':
      case 'angular':
      case 'svelte':
      case 'nextjs':
        return <Layout {...commonProps} />;
      
      // Backend Framework icons
      case 'fastapi':
      case 'django':
      case 'spring':
      case 'laravel':
      case 'rails':
        return <Settings {...commonProps} />;
      
      // Programming Language icons
      case 'python':
      case 'java':
      case 'go':
      case 'rust':
      case 'php':
      case 'ruby':
        return <FileCode {...commonProps} />;
      
      // Mobile Development icons
      case 'flutter':
      case 'swift':
      case 'kotlin':
        return <Smartphone {...commonProps} />;
      
      // Cloud Platform icons
      case 'aws':
      case 'gcp':
      case 'azure':
      case 'digitalocean':
        return <Cloud {...commonProps} />;
      
      // Database icons
      case 'mongodb':
      case 'redis':
      case 'mysql':
      case 'sqlite':
        return <Database {...commonProps} />;
      
      // Default fallback
      default:
        return <BookOpen {...commonProps} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-success/10 text-success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-warning/10 text-warning">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getActionButton = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Button 
            onClick={() => setLocation(`/tutorials/${tutorial.id}`)}
            data-testid={`button-review-${tutorial.id}`}
          >
            Review
          </Button>
        );
      case 'in-progress':
        return (
          <Button 
            onClick={() => setLocation(`/tutorials/${tutorial.id}`)}
            data-testid={`button-continue-${tutorial.id}`}
          >
            Continue
          </Button>
        );
      default:
        return (
          <Button 
            onClick={() => setLocation(`/tutorials/${tutorial.id}`)}
            data-testid={`button-start-${tutorial.id}`}
          >
            Start
          </Button>
        );
    }
  };

  const iconColor = getIconColor(tutorial.icon);
  const progressValue = progress?.progress || 0;
  const status = progress?.status || 'not-started';

  // Calculate stroke-dashoffset for circular progress
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressValue / 100) * circumference;

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200" data-testid={`card-tutorial-${tutorial.id}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${iconColor}10` }}
          >
            {renderTutorialIcon(tutorial.icon, iconColor)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-foreground" data-testid={`text-title-${tutorial.id}`}>
                {tutorial.title}
              </h3>
              {getStatusBadge(status)}
            </div>
            <p className="text-muted-foreground mb-4" data-testid={`text-description-${tutorial.id}`}>
              {tutorial.description}
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground" data-testid={`text-lessons-${tutorial.id}`}>
                  {tutorial.lessonCount} lessons
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground" data-testid={`text-duration-${tutorial.id}`}>
                  {tutorial.duration} minutes
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Progress Circle */}
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                className="text-muted stroke-current"
                strokeWidth="4"
                cx="32"
                cy="32"
                r="28"
                fill="transparent"
              />
              <circle
                className={`stroke-current transition-all duration-300 ${
                  status === 'completed' ? 'text-success' :
                  status === 'in-progress' ? 'text-warning' : 'text-muted'
                }`}
                strokeWidth="4"
                cx="32"
                cy="32"
                r="28"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-foreground" data-testid={`text-progress-${tutorial.id}`}>
                {progressValue}%
              </span>
            </div>
          </div>
          {getActionButton(status)}
        </div>
      </div>
    </Card>
  );
}
