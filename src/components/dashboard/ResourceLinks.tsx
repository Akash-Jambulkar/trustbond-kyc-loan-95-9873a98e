
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Webhook, Code, FileQuestion, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ResourceLinksProps {
  isActive: (path: string) => boolean;
  handleLinkClick?: () => void;
}

const ResourceLinks: React.FC<ResourceLinksProps> = ({ isActive, handleLinkClick }) => {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">Resources</h2>
      <div className="space-y-1">
        <Button
          variant={isActive('/resources/documentation') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
        >
          <Link to="/resources/documentation">
            <BookOpen className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </Button>
        <Button
          variant={isActive('/resources/api') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
        >
          <Link to="/resources/api">
            <Webhook className="mr-2 h-4 w-4" />
            API Reference
          </Link>
        </Button>
        <Button
          variant={isActive('/resources/api-directory') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
        >
          <Link to="/resources/api-directory">
            <Code className="mr-2 h-4 w-4" />
            API Directory
          </Link>
        </Button>
        <Button
          variant={isActive('/resources/whitepaper') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
        >
          <Link to="/resources/whitepaper">
            <FileQuestion className="mr-2 h-4 w-4" />
            Whitepaper
          </Link>
        </Button>
        <Button
          variant={isActive('/resources/community') ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
          onClick={handleLinkClick}
        >
          <Link to="/resources/community">
            <MessageSquare className="mr-2 h-4 w-4" />
            Community
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ResourceLinks;
