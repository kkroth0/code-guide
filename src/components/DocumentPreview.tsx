import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Github, Loader2, Copy, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentPreviewProps {
  activeDoc: string;
}

const mockContent = {
  readme: `# Project Name

A modern, scalable web application built with React and TypeScript.

## Features

- 🚀 Fast and responsive
- 🔒 Secure authentication
- 📱 Mobile-friendly design
- 🎨 Beautiful UI components

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Contributing

We welcome contributions! Please see our contributing guidelines.`,

  api: `# API Documentation

## Base URL
\`https://api.example.com/v1\`

## Authentication
Include your API key in the header:
\`Authorization: Bearer YOUR_API_KEY\`

## Endpoints

### GET /users
Returns a list of users.

**Response:**
\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
\`\`\``,

  guide: `# User Guide

## Getting Started

Welcome to our application! This guide will help you get up and running quickly.

### Step 1: Account Setup
1. Visit the signup page
2. Enter your email and password
3. Verify your email address

### Step 2: Configuration
1. Navigate to Settings
2. Configure your preferences
3. Save your changes

### Step 3: Start Using
You're all set! Begin exploring the features.`,

  setup: `# Installation Guide

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

## Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/username/project.git
   cd project
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\``,

  features: `# Features Overview

## Core Features

### 🚀 Performance
- Optimized bundle size
- Lazy loading
- Server-side rendering

### 🎨 Design System
- Consistent UI components
- Dark/light mode support
- Responsive design

### 🔒 Security
- Authentication & authorization
- Data encryption
- Security headers

### 📊 Analytics
- User behavior tracking
- Performance monitoring
- Error reporting`,

  security: `# Security Guidelines

## Overview
Security is our top priority. This document outlines our security practices and guidelines.

## Authentication
- Use strong passwords (12+ characters)
- Enable two-factor authentication
- Regular password updates

## Data Protection
- All data encrypted in transit and at rest
- Regular security audits
- GDPR compliance

## Reporting Vulnerabilities
If you discover a security vulnerability, please email security@example.com`,

  contributing: `# Contributing Guidelines

## Welcome Contributors!

We're excited that you're interested in contributing to our project.

## How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Make your changes**
4. **Write tests**
5. **Submit a pull request**

## Code Style
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic
- Write tests for new features`,

  changelog: `# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2024-01-15
### Added
- New dashboard analytics
- Export functionality
- Mobile app support

### Fixed
- Performance improvements
- Bug fixes in user authentication

## [2.0.0] - 2023-12-01
### Added
- Complete UI redesign
- New API endpoints
- Enhanced security features

### Breaking Changes
- Updated API structure
- New authentication flow`
};

export function DocumentPreview({ activeDoc }: DocumentPreviewProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!githubUrl.trim()) {
      toast({
        title: "GitHub URL Required",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Documentation Generated!",
        description: "Your documentation has been successfully created."
      });
    }, 3000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mockContent[activeDoc as keyof typeof mockContent] || "");
    toast({
      title: "Copied!",
      description: "Content copied to clipboard"
    });
  };

  const getDocTitle = (docType: string) => {
    const titles = {
      readme: "README Documentation",
      api: "API Reference",
      guide: "User Guide",
      setup: "Installation Guide",
      features: "Features Overview",
      security: "Security Documentation",
      contributing: "Contributing Guidelines",
      changelog: "Project Changelog"
    };
    return titles[docType as keyof typeof titles] || "Documentation";
  };

  return (
    <div className="flex-1 bg-doc-bg">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">README Agent</h1>
        <p className="text-primary-foreground/90 text-lg">
          Generate comprehensive documentation for your GitHub projects
        </p>
      </div>

      {/* URL Input Section */}
      <div className="p-6 bg-card border-b border-border">
        <div className="max-w-4xl">
          <label htmlFor="github-url" className="block text-sm font-medium text-doc-text mb-2">
            GitHub Repository URL
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="github-url"
                type="url"
                placeholder="https://github.com/username/repository"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Docs"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="max-w-4xl">
          <Card className="shadow-card">
            {/* Card Header */}
            <div className="border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-doc-text">
                {getDocTitle(activeDoc)}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-doc-text-muted">
                      Analyzing repository and generating documentation...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-doc-text leading-relaxed font-mono bg-muted p-4 rounded-lg overflow-auto">
                    {mockContent[activeDoc as keyof typeof mockContent] || "Select a documentation type to see the preview."}
                  </pre>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}