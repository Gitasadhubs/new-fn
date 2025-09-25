import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MonacoEditor from "@/components/MonacoEditor";
import LivePreview from "@/components/LivePreview";
import Console from "@/components/Console";
import { Save, Github, Download, Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface FileTab {
  name: string;
  language: string;
  content: string;
}

export default function Workspace() {
  const { toast } = useToast();
  const [activeFile, setActiveFile] = useState(0);
  const [files, setFiles] = useState<FileTab[]>([
    {
      name: "index.html",
      language: "html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to CI/CD!</h1>
        <p>This is my first project with Git.</p>
        <button id="clickMe">Click Me!</button>
    </div>
    <script src="app.js"></script>
</body>
</html>`
    },
    {
      name: "style.css",
      language: "css",
      content: `.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #0ea5a4;
  margin-bottom: 1rem;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #5b5beb;
}`
    },
    {
      name: "app.js",
      language: "javascript",
      content: `document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('clickMe');
    
    button.addEventListener('click', function() {
        alert('Hello from AutoFlow Learn! 🚀');
        console.log('Button clicked at:', new Date().toLocaleTimeString());
    });
    
    console.log('App initialized successfully');
});`
    }
  ]);

  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "$ git init",
    "Initialized empty Git repository in /workspace/.git/",
    "$ git add .",
    "$ git commit -m \"Initial commit\"",
    "[main (root-commit) a1b2c3d] Initial commit",
    " 3 files changed, 25 insertions(+)",
    " create mode 100644 app.js",
    " create mode 100644 index.html",
    " create mode 100644 style.css"
  ]);

  // Load code from localStorage if coming from tutorial
  useEffect(() => {
    const savedCode = localStorage.getItem('workspaceCode');
    const savedLanguage = localStorage.getItem('workspaceLanguage');
    
    if (savedCode && savedLanguage) {
      // Create a new file or update existing one based on language
      const fileName = savedLanguage === 'bash' ? 'commands.sh' : 
                     savedLanguage === 'yaml' ? 'workflow.yml' :
                     savedLanguage === 'html' ? 'index.html' :
                     savedLanguage === 'css' ? 'style.css' :
                     savedLanguage === 'javascript' ? 'app.js' : 'code.txt';
      
      // Add or update the file
      setFiles(prev => {
        const existingIndex = prev.findIndex(f => f.name === fileName);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex].content = savedCode;
          return updated;
        } else {
          return [...prev, { name: fileName, language: savedLanguage, content: savedCode }];
        }
      });
      
      // Clear localStorage
      localStorage.removeItem('workspaceCode');
      localStorage.removeItem('workspaceLanguage');
      
      toast({
        title: "Code loaded",
        description: "Tutorial code has been loaded into the workspace."
      });
    }
  }, [toast]);

  const pushToGitHubMutation = useMutation({
    mutationFn: async (data: { projectName: string; files: Record<string, string>; commitMessage: string }) => {
      const response = await apiRequest("POST", "/api/push", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      setConsoleOutput(prev => [
        ...prev,
        `$ git push origin main`,
        `Enumerating objects: 5, done.`,
        `Counting objects: 100% (5/5), done.`,
        `Writing objects: 100% (3/3), 1.2 KiB | 1.2 MiB/s, done.`,
        `Total 3 (delta 0), reused 0 (delta 0)`,
        `To ${data.repositoryUrl}`,
        `   a1b2c3d..b3c4d5e  main -> main`,
        `✓ Deployed to: ${data.deployUrl}`
      ]);
    },
    onError: (error: any) => {
      toast({
        title: "Push failed",
        description: error.message || "Failed to push to GitHub",
        variant: "destructive"
      });
    }
  });

  const exportMutation = useMutation({
    mutationFn: async (data: { projectName: string; files: Record<string, string> }) => {
      const response = await apiRequest("POST", "/api/export", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Export ready",
        description: "Your project has been exported as a ZIP file."
      });
    },
    onError: () => {
      toast({
        title: "Export failed",
        description: "Failed to export project",
        variant: "destructive"
      });
    }
  });

  const handleFileChange = (content: string) => {
    setFiles(prev => {
      const updated = [...prev];
      updated[activeFile].content = content;
      return updated;
    });
  };

  const handleSave = () => {
    localStorage.setItem('workspaceFiles', JSON.stringify(files));
    toast({
      title: "Saved",
      description: "Your workspace has been saved locally."
    });
  };

  const handlePushToGitHub = () => {
    const filesObj = files.reduce((acc, file) => {
      acc[file.name] = file.content;
      return acc;
    }, {} as Record<string, string>);

    pushToGitHubMutation.mutate({
      projectName: "autoflow-project",
      files: filesObj,
      commitMessage: "Update from AutoFlow Learn workspace"
    });
  };

  const handleExport = () => {
    const filesObj = files.reduce((acc, file) => {
      acc[file.name] = file.content;
      return acc;
    }, {} as Record<string, string>);

    exportMutation.mutate({
      projectName: "autoflow-project",
      files: filesObj
    });
  };

  const handleAddFile = () => {
    const fileName = prompt("Enter file name (e.g., script.js, style.css):");
    if (fileName) {
      const extension = fileName.split('.').pop()?.toLowerCase();
      const language = extension === 'js' ? 'javascript' :
                      extension === 'css' ? 'css' :
                      extension === 'html' ? 'html' :
                      extension === 'json' ? 'json' :
                      extension === 'md' ? 'markdown' : 'text';
      
      setFiles(prev => [...prev, {
        name: fileName,
        language,
        content: ''
      }]);
      setActiveFile(files.length);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Workspace Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-foreground" data-testid="text-workspace-title">
              Workspace
            </h1>
            {/* File Tabs */}
            <div className="flex space-x-1">
              {files.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFile(index)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    index === activeFile
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`tab-${file.name}`}
                >
                  {file.name}
                </button>
              ))}
              <button
                onClick={handleAddFile}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                data-testid="button-add-file"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              data-testid="button-save"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePushToGitHub}
              disabled={pushToGitHubMutation.isPending}
              data-testid="button-push-github"
            >
              <Github className="w-4 h-4 mr-2" />
              {pushToGitHubMutation.isPending ? 'Pushing...' : 'Push to GitHub'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={exportMutation.isPending}
              data-testid="button-export"
            >
              <Download className="w-4 h-4 mr-2" />
              Export ZIP
            </Button>
          </div>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="flex-1 flex">
        {/* Left: Code Editor */}
        <div className="w-1/2 flex flex-col border-r border-border">
          <MonacoEditor
            language={files[activeFile]?.language || 'html'}
            value={files[activeFile]?.content || ''}
            onChange={handleFileChange}
            data-testid="monaco-editor"
          />
        </div>

        {/* Right: Preview and Console */}
        <div className="w-1/2 flex flex-col">
          {/* Preview Area */}
          <div className="flex-1 flex flex-col">
            <LivePreview files={files} />
          </div>
          
          {/* Console Output */}
          <Console output={consoleOutput} />
        </div>
      </div>
    </div>
  );
}
