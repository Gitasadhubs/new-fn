import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Users, Zap, Shield, Globe, Github, Heart } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              AutoFlow Learn
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive learning platform for modern software development. Master everything from 
            programming fundamentals to advanced cloud deployment through interactive, hands-on tutorials.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              30+ Comprehensive Tutorials
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Code className="w-4 h-4 mr-2" />
              Interactive Code Editor
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Student-Friendly
            </Badge>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="p-8" data-testid="card-mission">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We believe that learning modern software development shouldn't be overwhelming or intimidating. 
              AutoFlow Learn was created to provide a gentle introduction to complex concepts across all major 
              technologies through interactive tutorials, real-world examples, and immediate feedback. 
              Our goal is to empower the next generation of developers with comprehensive technical skills.
            </p>
          </Card>

          <Card className="p-8" data-testid="card-approach">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Our Approach</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Learn by doing. Each tutorial combines theoretical concepts with hands-on practice 
              using our integrated Monaco Editor workspace. Students write real code, see immediate 
              results, and can push their projects directly to GitHub. This practical approach 
              ensures deep understanding and confidence across all modern development technologies.
            </p>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center" data-testid="card-interactive">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Write, test, and deploy real code with our integrated Monaco Editor workspace
              </p>
            </Card>

            <Card className="p-6 text-center" data-testid="card-progressive">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Progressive Curriculum</h3>
              <p className="text-muted-foreground">
                Carefully structured lessons covering all major technologies from programming fundamentals to cloud deployment
              </p>
            </Card>

            <Card className="p-6 text-center" data-testid="card-secure">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Secure Environment</h3>
              <p className="text-muted-foreground">
                Sandboxed code execution ensures safe learning without security concerns
              </p>
            </Card>

            <Card className="p-6 text-center" data-testid="card-github">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">GitHub Integration</h3>
              <p className="text-muted-foreground">
                Create repositories and deploy projects directly from the learning environment
              </p>
            </Card>

            <Card className="p-6 text-center" data-testid="card-progress">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Visual progress indicators and completion badges to track your learning journey
              </p>
            </Card>

            <Card className="p-6 text-center" data-testid="card-accessible">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Accessible Design</h3>
              <p className="text-muted-foreground">
                Mobile-first responsive design with excellent contrast ratios and intuitive navigation
              </p>
            </Card>
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Comprehensive Technology Coverage
          </h2>
          <div className="space-y-6">
            <Card className="p-6" data-testid="card-curriculum">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-primary">FE</span>
                    </div>
                    <h3 className="font-semibold text-foreground">Frontend Frameworks</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                    <li>React, Vue.js, Angular</li>
                    <li>Svelte, Next.js</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-secondary">BE</span>
                    </div>
                    <h3 className="font-semibold text-foreground">Backend Frameworks</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                    <li>FastAPI, Django, Spring Boot</li>
                    <li>Laravel, Ruby on Rails</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-accent">PL</span>
                    </div>
                    <h3 className="font-semibold text-foreground">Programming Languages</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                    <li>Python, Java, Go, Rust</li>
                    <li>PHP, Ruby</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-primary">MB</span>
                    </div>
                    <h3 className="font-semibold text-foreground">Mobile Development</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                    <li>React Native, Flutter</li>
                    <li>Swift & iOS, Kotlin & Android</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-secondary">CL</span>
                    </div>
                    <h3 className="font-semibold text-foreground">Cloud Platforms</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                    <li>AWS, Google Cloud, Azure</li>
                    <li>DigitalOcean</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-accent">DB</span>
                    </div>
                    <h3 className="font-semibold text-foreground">Databases</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-11">
                    <li>MongoDB, Redis</li>
                    <li>MySQL, SQLite</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Technical Stack Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Built with Modern Technology
          </h2>
          <Card className="p-8" data-testid="card-tech-stack">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Frontend</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• React 18 with TypeScript</li>
                  <li>• Vite for fast development</li>
                  <li>• Tailwind CSS + shadcn/ui</li>
                  <li>• Monaco Editor integration</li>
                  <li>• TanStack Query for data fetching</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Backend</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Express.js with TypeScript</li>
                  <li>• Drizzle ORM with PostgreSQL</li>
                  <li>• Zod for validation</li>
                  <li>• GitHub API integration</li>
                  <li>• Session-based authentication</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Security & Performance</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Iframe sandboxing (implemented)</li>
                  <li>• Input validation with Zod</li>
                  <li>• Session-based authentication</li>
                  <li>• Responsive design</li>
                  <li>• Optimized for accessibility</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-secondary/5" data-testid="card-cta">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Master Modern Development?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their technical skills across 
              all major technologies with AutoFlow Learn's comprehensive curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/tutorials" 
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                data-testid="button-start-learning"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Learning
              </Link>
              <Link 
                href="/workspace" 
                className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
                data-testid="button-try-workspace"
              >
                <Code className="w-5 h-5 mr-2" />
                Try Workspace
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}