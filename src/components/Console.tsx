import { useEffect, useRef } from "react";

interface ConsoleProps {
  output: string[];
}

export default function Console({ output }: ConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div 
      ref={consoleRef}
      className="h-32 bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto border-t border-border"
      data-testid="console-output"
    >
      {output.map((line, index) => (
        <div key={index} className={line.startsWith('$') ? 'text-green-400' : 'text-gray-400'}>
          {line}
        </div>
      ))}
    </div>
  );
}
