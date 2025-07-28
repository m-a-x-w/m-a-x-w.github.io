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

# Content Management System

This project now uses Vue SFC (Single File Components) for content instead of Markdown files. This provides better performance, rich component capabilities, and type safety.

## Adding New Content

### Adding a New Blog Post

1. **Create the Vue component** in `src/content/blogs/`:
   ```vue
   <!-- src/content/blogs/YourBlogPost.vue -->
   <template>
     <article class="blog-article">
       <header class="blog-header">
         <h1>{{ title }}</h1>
         <time :datetime="date">{{ formattedDate }}</time>
         <p>{{ excerpt }}</p>
       </header>
       <!-- Your content here -->
     </article>
   </template>
   
   <script setup>
   // Your blog data and logic
   </script>
   ```

2. **Register the component** in `src/content/index.js`:
   ```javascript
   export const blogComponents = {
     'your-blog-slug': () => import('./blogs/YourBlogPost.vue')
   }
   ```

3. **Add to blog data** in `src/data/blogs.js`:
   ```javascript
   {
     id: 2,
     title: 'Your Blog Title',
     date: '2025-01-15',
     slug: 'your-blog-slug',
     excerpt: 'Brief description...',
     component: getBlogComponent('your-blog-slug')
   }
   ```

### Adding a New Project

1. **Create the Vue component** in `src/content/projects/`:
   ```vue
   <!-- src/content/projects/YourProject.vue -->
   <template>
     <article class="project-article">
       <!-- Your project content -->
       <ProjectDemo 
         title="Demo Title"
         :tech="techStack"
         github-url="https://github.com/..."
       />
     </article>
   </template>
   ```

2. **Register and add to data** following the same pattern as blogs.

## Available Components

### Shared Components
- `CodeBlock` - Syntax highlighted code blocks
- `ImageGallery` - Responsive image galleries with lightbox
- `ProjectDemo` - Project demonstration containers

### Usage Examples

```vue
<CodeBlock 
  language="javascript"
  title="Example Code"
  :code="codeString"
/>

<ImageGallery 
  :images="[{src: 'path.jpg', alt: 'Description', caption: 'Caption'}]"
  :columns="2"
/>

<ProjectDemo 
  title="Live Demo"
  :tech="['Vue.js', 'Node.js']"
  live-url="https://demo.com"
  github-url="https://github.com/..."
>
  <p>Demo description content</p>
</ProjectDemo>
```

## Benefits of This System

- **Performance**: Components are compiled and optimized
- **Rich Content**: Custom Vue components for interactive elements
- **Type Safety**: Can gradually add TypeScript
- **Maintainability**: Everything in the Vue ecosystem
- **SEO**: Still generates static HTML
- **Development**: Hot reload, component development tools

## Migration Notes

- Removed `marked` dependency
- Old markdown files are preserved but no longer used
- Content is now defined directly in Vue components
- Styling is scoped and component-based

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
