import { Card } from "@/components/ui/card";
import Badge from "@/components/Badge";
import { ExternalLink, Github } from "lucide-react";

export default function Profile() {
  // Mock user data - in real app would come from auth context
  const user = {
    displayName: "Jane Student",
    username: "janestudent",
    bio: "Learning CI/CD one step at a time",
    overallProgress: 67,
    completedTutorials: 2,
    deployedProjects: 3
  };

  const achievements = [
    {
      id: "first-commit",
      title: "First Commit",
      description: "Made your first Git commit",
      icon: "git",
      color: "#22c55e",
      earned: true
    },
    {
      id: "workflow-master",
      title: "Workflow Master",
      description: "Created GitHub Actions workflow",
      icon: "workflow",
      color: "#6366f1",
      earned: true
    },
    {
      id: "deployed",
      title: "Deployed",
      description: "First successful deployment",
      icon: "deploy",
      color: "#f59e0b",
      earned: true
    },
    {
      id: "coming-soon",
      title: "???",
      description: "Keep learning to unlock",
      icon: "lock",
      color: "#9ca3af",
      earned: false
    }
  ];

  const recentProjects = [
    {
      id: "1",
      name: "my-first-website",
      description: "A simple HTML website with CSS styling",
      technologies: ["HTML", "CSS"],
      deployedAt: "2 hours ago",
      githubUrl: "https://github.com/janestudent/my-first-website",
      liveUrl: "https://my-first-website-janestudent.vercel.app"
    },
    {
      id: "2",
      name: "todo-app-react",
      description: "Interactive React todo application",
      technologies: ["React", "CSS"],
      deployedAt: "1 day ago",
      githubUrl: "https://github.com/janestudent/todo-app-react",
      liveUrl: "https://todo-app-react-janestudent.vercel.app"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <Card className="p-8 mb-8">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-primary" data-testid="text-avatar">
              {user.displayName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-display-name">
              {user.displayName}
            </h1>
            <p className="text-muted-foreground mb-4" data-testid="text-bio">
              {user.bio}
            </p>
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-2xl font-bold text-foreground" data-testid="text-overall-progress">
                  {user.overallProgress}%
                </span>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground" data-testid="text-completed-tutorials">
                  {user.completedTutorials}
                </span>
                <p className="text-sm text-muted-foreground">Completed Tutorials</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground" data-testid="text-deployed-projects">
                  {user.deployedProjects}
                </span>
                <p className="text-sm text-muted-foreground">Deployed Projects</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <Badge
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              icon={achievement.icon}
              color={achievement.color}
              earned={achievement.earned}
              data-testid={`badge-${achievement.id}`}
            />
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Recent Projects</h2>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <Card key={project.id} className="p-6" data-testid={`project-${project.id}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1" data-testid={`text-project-name-${project.id}`}>
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2" data-testid={`text-project-description-${project.id}`}>
                    {project.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span data-testid={`text-project-deployed-${project.id}`}>
                      Deployed {project.deployedAt}
                    </span>
                    <span>•</span>
                    <span data-testid={`text-project-tech-${project.id}`}>
                      {project.technologies.join(', ')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                    data-testid={`link-project-live-${project.id}`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-project-github-${project.id}`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
