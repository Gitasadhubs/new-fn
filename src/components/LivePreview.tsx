import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface FileTab {
  name: string;
  language: string;
  content: string;
}

interface LivePreviewProps {
  files: FileTab[];
}

export default function LivePreview({ files }: LivePreviewProps) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [htmlContent, setHtmlContent] = useState<string>("");

  const refreshPreview = () => {
    setLastUpdate(Date.now());
  };

  const escapeRegex = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const escapeScript = (content: string) => {
    return content.replace(/<\/script>/gi, '<\\/script>');
  };

  useEffect(() => {
    // Find HTML file
    const htmlFile = files.find(file => file.name.endsWith('.html'));
    
    let content = "";
    
    if (htmlFile) {
      content = htmlFile.content;
      
      // Replace CSS and JS file references with inline content
      files.forEach(file => {
        if (file.name.endsWith('.css')) {
          const escapedFileName = escapeRegex(file.name);
          const linkRegex = new RegExp(`<link[^>]*href=["']${escapedFileName}["'][^>]*>`, 'gi');
          content = content.replace(linkRegex, `<style>${file.content}</style>`);
        } else if (file.name.endsWith('.js')) {
          const escapedFileName = escapeRegex(file.name);
          const scriptRegex = new RegExp(`<script[^>]*src=["']${escapedFileName}["'][^>]*></script>`, 'gi');
          content = content.replace(scriptRegex, `<script>${escapeScript(file.content)}</script>`);
        }
      });

      // Add security CSP meta tag to existing HTML - robust insertion
      const headRegex = /<head[^>]*>/i;
      if (headRegex.test(content)) {
        content = content.replace(headRegex, (match) => `${match}
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; script-src 'unsafe-inline';">`);
      } else {
        // No head tag found, wrap in minimal trusted shell
        content = `
        <html>
          <head>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
          </head>
          <body>
            ${content}
          </body>
        </html>
        `;
      }
    } else {
      // No HTML file, show a basic preview
      content = `
        <html>
          <head>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
            <style>
              body { font-family: Arial, sans-serif; padding: 2rem; text-align: center; }
              .preview-note { color: #666; margin-bottom: 2rem; }
              .file-content { background: #f5f5f5; border-radius: 0.5rem; padding: 1rem; margin: 1rem 0; text-align: left; }
              pre { margin: 0; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="preview-note">
              <h2>File Preview</h2>
              <p>Add an HTML file to see a live preview</p>
            </div>
            ${files.map(file => `
              <div class="file-content">
                <strong>${file.name}:</strong>
                <pre>${file.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
              </div>
            `).join('')}
          </body>
        </html>
      `;
    }
    
    setHtmlContent(content);
  }, [files, lastUpdate]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-muted px-4 py-2 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Preview</span>
          <Button
            size="sm"
            variant="outline"
            onClick={refreshPreview}
            className="h-7 px-2"
            data-testid="button-refresh-preview"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Run
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-white">
        <iframe
          className="w-full h-full border-0"
          title="Live Preview"
          sandbox="allow-scripts"
          srcDoc={htmlContent}
          data-testid="preview-iframe"
        />
      </div>
    </div>
  );
}
