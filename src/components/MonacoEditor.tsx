import { useEffect, useRef } from "react";

interface MonacoEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  'data-testid'?: string;
}

export default function MonacoEditor({ language, value, onChange, 'data-testid': testId }: MonacoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    const loadMonaco = async () => {
      try {
        // Configure Monaco Environment for Vite - simple fallback approach
        (window as any).MonacoEnvironment = {
          getWorker: function () {
            // Return a simple worker that falls back to main thread
            return {
              postMessage: () => {},
              terminate: () => {},
              addEventListener: () => {}
            };
          }
        };

        // Dynamically import Monaco Editor
        const monaco = await import('monaco-editor');
        
        if (editorRef.current && !monacoRef.current) {
          // Configure Monaco
          monaco.editor.defineTheme('autoflow-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
              'editor.background': '#1e1e1e',
              'editor.foreground': '#ffffff',
            }
          });

          // Create editor
          monacoRef.current = monaco.editor.create(editorRef.current, {
            value,
            language,
            theme: 'autoflow-dark',
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            tabSize: 2,
          });

          // Set up change listener
          monacoRef.current.onDidChangeModelContent(() => {
            onChange(monacoRef.current.getValue());
          });
        }
      } catch (error) {
        console.error('Failed to load Monaco Editor:', error);
      }
    };

    loadMonaco();

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
        monacoRef.current = null;
      }
    };
  }, []);

  // Update editor when language or value changes
  useEffect(() => {
    if (monacoRef.current) {
      const currentValue = monacoRef.current.getValue();
      console.log('Monaco value update:', { currentValue: currentValue.substring(0, 50), newValue: value.substring(0, 50), language });
      if (currentValue !== value) {
        try {
          // Use editor.setValue for more reliable updates
          monacoRef.current.setValue(value);
          console.log('Monaco value updated successfully');
        } catch (error) {
          console.error('Monaco setValue error:', error);
        }
      }
    }
  }, [value, language]); // Include language in dependency to trigger update

  useEffect(() => {
    if (monacoRef.current) {
      const model = monacoRef.current.getModel();
      if (model) {
        console.log('Monaco language update:', language);
        // Import Monaco dynamically to access it
        import('monaco-editor').then(monaco => {
          try {
            monaco.editor.setModelLanguage(model, language);
            console.log('Monaco language updated successfully');
          } catch (error) {
            console.error('Monaco language update error:', error);
          }
        });
      }
    }
  }, [language]);

  return (
    <div className="flex-1 relative" data-testid={testId}>
      <div ref={editorRef} className="w-full h-full" />
    </div>
  );
}
