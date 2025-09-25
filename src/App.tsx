import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Tutorials from "@/pages/Tutorials";
import TutorialDetail from "@/pages/TutorialDetail";
import Workspace from "@/pages/Workspace";
import Profile from "@/pages/Profile";
import About from "@/pages/About";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/tutorials" component={Tutorials} />
      <Route path="/tutorials/:id" component={TutorialDetail} />
      <Route path="/workspace" component={Workspace} />
      <Route path="/profile" component={Profile} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
