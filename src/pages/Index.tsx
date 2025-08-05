import { useState } from "react";
import { DocumentSidebar } from "@/components/DocumentSidebar";
import { DocumentPreview } from "@/components/DocumentPreview";

const Index = () => {
  const [activeDoc, setActiveDoc] = useState("readme");

  return (
    <div className="min-h-screen bg-gradient-bg flex">
      <DocumentSidebar 
        activeDoc={activeDoc} 
        onDocSelect={setActiveDoc} 
      />
      <DocumentPreview activeDoc={activeDoc} />
    </div>
  );
};

export default Index;
