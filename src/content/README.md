# Project Content Management System

This portfolio uses a file-based content management system for projects. Each project can have its own dedicated page with rich markdown content and images.

## Folder Structure

```
src/content/projects/
├── project-alpha/
│   ├── content.md
│   └── images/
│       ├── preview.jpg
│       ├── components.jpg
│       └── tokens.jpg
├── digital-portfolio/
│   ├── content.md
│   └── images/
│       ├── homepage.jpg
│       ├── mobile.jpg
│       └── typography.jpg
└── your-new-project/
    ├── content.md
    └── images/
        └── screenshot.jpg
```

## Adding a New Project

### 1. Update projects.js
Add your project to the `projects` array in `src/data/projects.js`:

```javascript
{
  id: 4,
  name: 'Your New Project',
  tech: 'React, Node.js, MongoDB',
  link: null,
  route: '/projects/your-new-project',
  hasPage: true,
  contentPath: 'your-new-project'
}
```

### 2. Create Content Folder
Create a new folder: `src/content/projects/your-new-project/`

### 3. Add Markdown Content
Create `content.md` in your project folder:

```markdown
# Your New Project
## Subtitle here

Your project description goes here. You can use all standard markdown features:

- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)

## Images
![Screenshot](./images/screenshot.jpg)

## Technologies Used
- React
- Node.js
- MongoDB

## Features
- Feature 1
- Feature 2
- Feature 3
```

### 4. Add Images
Place your images in the `images/` subfolder and reference them in markdown as:
```markdown
![Alt text](./images/filename.jpg)
```

## Markdown Features Supported

- **Headings** (H1-H6)
- **Paragraphs** with automatic line breaks
- **Lists** (ordered and unordered)
- **Links** (both internal and external)
- **Images** with alt text
- **Bold** and *italic* text
- `Code blocks` and syntax highlighting
- **Blockquotes**
- Line breaks and spacing

## Tips

1. **Image Optimization**: Compress your images before adding them to keep the site fast
2. **Alt Text**: Always include descriptive alt text for images
3. **File Names**: Use lowercase and hyphens for file names (e.g., `my-project.jpg`)
4. **Content Structure**: Use H2 headers for main sections, H3 for subsections
5. **Links**: External links automatically open in new tabs

## Example Content Structure

```markdown
# Project Title
## Subtitle

Brief description of the project...

## Overview
Detailed project overview...

## Technologies Used
- Technology 1
- Technology 2

## Key Features
- Feature 1
- Feature 2

## Images
![Main Screenshot](./images/main.jpg)
![Detail View](./images/detail.jpg)

## Links
- [Live Demo](https://example.com)
- [GitHub Repository](https://github.com/user/repo)
```

This system makes it easy to manage your project content while keeping everything organized and maintainable!
