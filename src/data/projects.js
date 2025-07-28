// Projects data - Easy to edit and maintain
export const projects = [
  {
    id: 1,
    name: 'Project Alpha',
    tech: 'Design system for web applications',
    link: null, // External URL if available
    route: '/projects/project-alpha', // Internal route for project page
    hasPage: true, // Set to true to create a dedicated page
    contentPath: 'project-alpha' // Folder name in src/content/projects/
  },
  {
    id: 2,
    name: 'Digital Portfolio', 
    tech: 'Typography-focused portfolio site',
    link: null,
    route: '/projects/digital-portfolio',
    hasPage: true,
    contentPath: 'digital-portfolio'
  },
  {
    id: 3,
    name: 'Research Initiative',
    tech: 'Design and emerging technologies', 
    link: null,
    route: null, // No dedicated page yet
    hasPage: false,
    contentPath: null
  }
]

// How the folder system works:
// Each project with hasPage: true should have:
// src/content/projects/{contentPath}/
//   ├── content.md (markdown content)
//   ├── images/ (project images)
//   └── meta.json (optional metadata)

// To add a new project:
// 1. Add project to array above with contentPath
// 2. Create folder: src/content/projects/{contentPath}/
// 3. Add content.md file with your markdown content
// 4. Add images to the images/ subfolder
// 5. Reference images in markdown as: ![Alt text](./images/filename.jpg)
