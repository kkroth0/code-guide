import { FileText, BookOpen, Code, Settings, Zap, Shield, Users, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const docTypes: DocType[] = [
  {
    id: "readme",
    name: "README",
    icon: FileText,
    description: "Main project documentation"
  },
  {
    id: "api",
    name: "API Docs",
    icon: Code,
    description: "API reference and endpoints"
  },
  {
    id: "guide",
    name: "User Guide",
    icon: BookOpen,
    description: "Step-by-step tutorials"
  },
  {
    id: "setup",
    name: "Installation",
    icon: Settings,
    description: "Setup and configuration"
  },
  {
    id: "features",
    name: "Features",
    icon: Zap,
    description: "Key features overview"
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    description: "Security guidelines"
  },
  {
    id: "contributing",
    name: "Contributing",
    icon: Users,
    description: "Contribution guidelines"
  },
  {
    id: "changelog",
    name: "Changelog",
    icon: GitBranch,
    description: "Version history"
  }
];

interface DocumentSidebarProps {
  activeDoc: string;
  onDocSelect: (docId: string) => void;
}

export function DocumentSidebar({ activeDoc, onDocSelect }: DocumentSidebarProps) {
  return (
    <div className="w-72 bg-doc-sidebar border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-doc-text mb-2">Documentation Types</h2>
        <p className="text-sm text-doc-text-muted">
          Select a documentation type to preview
        </p>
      </div>
      
      <div className="flex-1 p-4 space-y-2">
        {docTypes.map((docType) => {
          const IconComponent = docType.icon;
          const isActive = activeDoc === docType.id;
          
          return (
            <button
              key={docType.id}
              onClick={() => onDocSelect(docType.id)}
              className={cn(
                "w-full p-4 rounded-lg text-left transition-all duration-200 group",
                "hover:bg-doc-sidebar-hover hover:shadow-sm",
                isActive && "bg-primary text-primary-foreground shadow-card"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "flex-shrink-0 p-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary-foreground/20" 
                    : "bg-accent group-hover:bg-primary/10"
                )}>
                  <IconComponent className={cn(
                    "h-5 w-5",
                    isActive 
                      ? "text-primary-foreground" 
                      : "text-primary group-hover:text-primary"
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "font-medium text-sm mb-1",
                    isActive 
                      ? "text-primary-foreground" 
                      : "text-doc-text group-hover:text-doc-text"
                  )}>
                    {docType.name}
                  </h3>
                  <p className={cn(
                    "text-xs leading-relaxed",
                    isActive 
                      ? "text-primary-foreground/80" 
                      : "text-doc-text-muted group-hover:text-doc-text-muted"
                  )}>
                    {docType.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}