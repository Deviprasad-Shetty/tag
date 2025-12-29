// Sample book data (can be fetched from an API later)
const books = [
  { id: 'BK001', title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 19.99, category: 'Classic' },
  { id: 'BK002', title: "Atomic Habits", author: "James Clear", price: 24.99, category: 'Self-Help' },
];

// Render books to the homepage
function renderBooks() {
  const booksGrid = document.querySelector('.books-grid');
  booksGrid.innerHTML = books.map(book => `
    <div class="book-card">
      <h4>${book.title}</h4>
      <p>by ${book.author}</p>
      <p class="price">$${book.price}</p>
      <button class="btn btn-primary" onclick="addToCart('${book.id}')">Add to Cart</button>
    </div>
  `).join('');
}

// Simple cart functionality
function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  alert(`Added ${book.title} to cart!`);

  // Later: Use localStorage or a cart state manager
}
// Track page views and events
const trackEvent = async (eventName, data = {}) => {
  try {
    const response = await fetch("https://api.your-analytics-service.com/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        page: window.location.pathname,
        ...data,
      }),
    });
    console.log(`Tracked: ${eventName}`, await response.json());
  } catch (error) {
    console.error("Tracking error:", error);
  }
};

// Track pageview on load
document.addEventListener("DOMContentLoaded", () => {
  trackEvent("pageview");
});

// Example: Track button clicks
document.querySelectorAll(".track-click").forEach((button) => {
  button.addEventListener("click", () => {
    trackEvent("button_click", { id: button.id });
  });
});

document.addEventListener('DOMContentLoaded', renderBooks);