
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({ showLabel = true, className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant="outline"
      size="icon"
      className={`relative ${className}`}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} absolute`} />
      <Moon className={`h-5 w-5 transition-all ${theme === 'light' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} absolute`} />
      {showLabel && isHovered && (
        <span className="absolute top-full mt-1 text-xs whitespace-nowrap bg-background border border-border rounded-md px-2 py-1 shadow-lg">
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </span>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
