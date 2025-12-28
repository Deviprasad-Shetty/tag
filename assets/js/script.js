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

document.addEventListener('DOMContentLoaded', renderBooks);