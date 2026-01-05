// Sample book data (can be fetched from an API later)
const books = [
  { id: 'BK001', title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 19.99, category: 'Classic' },
  { id: 'BK002', title: "Atomic Habits", author: "James Clear", price: 24.99, category: 'Self-Help' },
];
let orders = {
        id: "BK12345",
        total: 49.99,
        status: 'pending',
        items: [
          {
            item_id: "1001",
            item_name: "Atomic Habits",
            price: 24.99,
            item_brand: "Rakuta",
            item_category: "Books",
            item_variant: "English Literature",
            quantity: 1
          },
          {
            item_id: "1002",
            item_name: "Deep Work",
            price: 19.99,
            item_brand: "Rakuta",
            item_category: "Books",
            item_variant: "English Literature",
            quantity: 1
          }
        ]
      };


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
    const response = await fetch("https://trackingservice-47621202522.us-west1.run.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "purchase",
        page: window.location.pathname,
        orders,
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
