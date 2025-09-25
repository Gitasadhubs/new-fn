import { Card } from "@/components/ui/card";
import { Shield, Zap, Cloud, Lock } from "lucide-react";

interface BadgeProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  'data-testid'?: string;
}

export default function Badge({ title, description, icon, color, earned, 'data-testid': testId }: BadgeProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'git':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
          </svg>
        );
      case 'workflow':
        return <Zap className="w-6 h-6" />;
      case 'deploy':
        return <Cloud className="w-6 h-6" />;
      case 'lock':
        return <Lock className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <Card 
      className={`p-4 text-center transition-all duration-200 ${
        earned 
          ? 'hover:shadow-md cursor-pointer' 
          : 'opacity-50 border-dashed'
      }`}
      data-testid={testId}
    >
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
          earned ? '' : 'bg-muted'
        }`}
        style={earned ? { backgroundColor: `${color}10` } : {}}
      >
        <div style={earned ? { color } : { color: '#9ca3af' }}>
          {getIcon(icon)}
        </div>
      </div>
      <h3 className={`font-medium text-sm mb-1 ${earned ? 'text-foreground' : 'text-muted-foreground'}`}>
        {title}
      </h3>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </Card>
  );
}
