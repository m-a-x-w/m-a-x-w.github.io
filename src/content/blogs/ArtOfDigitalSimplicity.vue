<template>
  <article class="blog-article">
    <header class="blog-header">
      <h1>{{ title }}</h1>
      <time :datetime="date" class="blog-date">{{ formattedDate }}</time>
      <p class="blog-excerpt">{{ excerpt }}</p>
    </header>

    <div class="blog-content">
      <section>
        <p>In an age of information overload, simplicity has become a superpower. Digital products that embrace minimalism don't just look better—they perform better, load faster, and provide clearer user experiences.</p>
      </section>

      <section>
        <h2>Why Less is More</h2>
        <p>Every element on a screen competes for attention. The more elements you add, the harder it becomes for users to focus on what matters. By removing unnecessary elements, we make the remaining ones more powerful.</p>
        
        <h3>Cognitive Load</h3>
        <p>The human brain can only process so much information at once. Simpler interfaces reduce cognitive load, making them easier to understand and navigate. Users can accomplish their goals without getting distracted or overwhelmed.</p>
        
        <h3>Performance Benefits</h3>
        <p>Simpler designs typically mean:</p>
        <ul>
          <li>Faster loading times</li>
          <li>Better mobile performance</li>
          <li>Easier maintenance</li>
          <li>More accessible experiences</li>
        </ul>
      </section>

      <section>
        <h2>Principles of Digital Simplicity</h2>
        
        <h3>Focus on Purpose</h3>
        <p>Every element should serve the user's goal. If it doesn't help them complete their task, consider removing it.</p>
        
        <h3>Hierarchy Through Typography</h3>
        <p>Instead of relying on colors and decorations, use typography to create visual hierarchy. Size, weight, and spacing can guide users through content effectively.</p>
        
        <h3>Meaningful White Space</h3>
        <p>White space isn't wasted space—it's a tool for organization and emphasis. It helps users process information and creates a sense of elegance.</p>
      </section>

      <section>
        <h2>Real-World Examples</h2>
        <p>Companies like Apple, Google, and Stripe have built their design languages around simplicity. Their interfaces feel effortless because they've removed friction and focused on core functionality.</p>
      </section>

      <section>
        <h2>Implementation Strategies</h2>
        <ol>
          <li><strong>Start with content</strong> - Design around your actual content, not placeholder text</li>
          <li><strong>Remove before adding</strong> - Always try removing elements before adding new ones</li>
          <li><strong>Test with real users</strong> - Simplicity should improve usability, not hinder it</li>
          <li><strong>Embrace constraints</strong> - Limitations often lead to more creative solutions</li>
        </ol>
      </section>

      <section>
        <h2>The Challenge</h2>
        <p>Creating simple designs is paradoxically complex. It requires deep understanding of user needs, careful consideration of every design decision, and the discipline to say no to unnecessary features.</p>
        <p>But the payoff is worth it: cleaner code, happier users, and products that stand the test of time.</p>
      </section>

      <footer class="blog-footer">
        <p><em>Simplicity is the ultimate sophistication. In digital design, this principle guides us toward creating experiences that are both beautiful and functional.</em></p>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const title = "The Art of Digital Simplicity"
const date = "2025-01-10"
const excerpt = "Why less is more in modern web design and user experience."

const formattedDate = computed(() => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
.blog-article {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.7;
  color: #24292f;
}

.blog-header {
  margin-bottom: 3rem;
  text-align: center;
  border-bottom: 1px solid #d1d9e0;
  padding-bottom: 2rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #24292f;
}

.blog-date {
  display: block;
  font-size: 1rem;
  color: #656d76;
  margin-bottom: 1rem;
}

.blog-excerpt {
  font-size: 1.25rem;
  color: #656d76;
  font-style: italic;
  margin: 0;
}

.blog-content {
  font-size: 1.1rem;
}

.blog-content section {
  margin-bottom: 2.5rem;
}

.blog-content h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
  color: #24292f;
}

.blog-content h3 {
  font-size: 1.375rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem 0;
  color: #24292f;
}

.blog-content p {
  margin-bottom: 1.25rem;
}

.blog-content ul,
.blog-content ol {
  margin: 1rem 0 1.5rem 1.5rem;
}

.blog-content li {
  margin-bottom: 0.5rem;
}

.blog-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #d1d9e0;
  text-align: center;
}

.blog-footer p {
  font-size: 1.125rem;
  color: #656d76;
  margin: 0;
}

@media (max-width: 768px) {
  .blog-article {
    padding: 1rem;
  }
  
  .blog-header h1 {
    font-size: 2rem;
  }
  
  .blog-content {
    font-size: 1rem;
  }
  
  .blog-content h2 {
    font-size: 1.5rem;
  }
  
  .blog-content h3 {
    font-size: 1.25rem;
  }
}
</style>
