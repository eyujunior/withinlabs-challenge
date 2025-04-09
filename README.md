# E-Commerce Product Catalog

A high-performance Next.js e-commerce application featuring product listings, search/filtering, and cart management. Achieved perfect Lighthouse scores across all metrics.

## 🔗 Deployment

-   **Live Demo**: [Vercel Deployment](https://withinlabs-challenge.vercel.app/)
-   **Source Code**: [GitHub Repository](https://github.com/eyujunior/withinlabs-challenge/)

## Architecture Decisions

### Framework Choices

-   **Next.js (App Router)**:
    -   Used the new App Router (instead of Pages Router) as it's the recommended approach for:
        -   Improved file-based routing with nested layouts
        -   Built-in React Server Components support
        -   Better data fetching patterns
        -   Streaming and Suspense support
-   **Tailwind CSS**: For rapid UI development with utility-first styling
-   **Zustand**: Lightweight state management for client-side cart state

### Performance Excellence

-   **Perfect Lighthouse Scores (100%)**:
    -   Performance
    -   Accessibility
    -   Best Practices
    -   SEO
-   Optimized through:
    -   Server-side rendering for critical pages
    -   Efficient image loading
    -   Minimal client-side JavaScript

## Testing Approach

**Planned Test Implementation** (Future Scope):

-   Unit tests for components using Jest + React Testing Library
-   State management tests for cart operations

_Note: Testing infrastructure would be implemented given additional development time_

## Dependencies

```json
"dependencies": {
  "next": "^14",
  "react": "^18",
  "react-dom": "^18",
  "zustand": "^4",
  "react-toastify": "^9",
  "tailwindcss": "^3"
}
```
