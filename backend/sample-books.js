const mongoose = require('mongoose');
const { BookModel } = require('./model/BookModel');
require('dotenv').config();

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    isbn: "9780743273565",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    availableCopies: 5,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011", // Replace with actual admin user ID

    price: 15.99
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    isbn: "9780061120084",
    description: "A powerful story about racial injustice and childhood innocence in the American South.",
    availableCopies: 3,
    totalCopies: 3,
    addedBy: "507f1f77bcf86cd799439011",

    price: 12.99
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    isbn: "9780451524935",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
    availableCopies: 4,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",

    price: 13.99
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    isbn: "9780141439518",
    description: "A romantic novel about Elizabeth Bennet and Mr. Darcy, exploring themes of love, marriage, and social class.",
    availableCopies: 6,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",

    price: 11.99
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    isbn: "9780316769488",
    description: "A controversial novel about teenage rebellion and alienation.",
    availableCopies: 2,
    totalCopies: 2,
    addedBy: "507f1f77bcf86cd799439011"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    isbn: "9780590353427",
    description: "The first book in the Harry Potter series, following a young wizard's adventures at Hogwarts.",
    availableCopies: 8,
    totalCopies: 8,
    addedBy: "507f1f77bcf86cd799439011",

    price: 18.99
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    isbn: "9780441172719",
    description: "A science fiction epic about politics, religion, and ecology on the desert planet Arrakis.",
    availableCopies: 4,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",

    price: 16.99
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    category: "Mystery",
    isbn: "9780307474278",
    description: "A thriller involving secret societies, hidden messages, and a quest for the Holy Grail.",
    availableCopies: 5,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZGF2aW5jaUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0I0MjQyNDtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSJ1cmwoI2RhdmluY2lHcmFkaWVudCkiIHJ4PSI4IiByeT0iOCIvPgogIDxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjI3MCIgaGVpZ2h0PSI0MjAiIGZpbGw9IiNmZmZmZmYiIHJ4PSI0IiByeT0iNCIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz4KCiAgPHRleHQgeD0iMTUwIiB5PSI3NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzJjM2U1MCI+VGhlIERhIFZpbmNpPC90ZXh0PgogIDx0ZXh0IHg9IjE1MCIgeT0iOTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCBzZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMyYzNlNTAiPkNvZGU8L3RleHQ+CiAgPHRleHQgeD0iMTUwIiB5PSIxMTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCBzZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdmOGM4ZCI+YnkgRGFuIEJyb3duPC90ZXh0PgoKICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyMDAiIHI9IjQwIiBmaWxsPSIjQjQyNDI0IiBvcGFjaXR5PSIwLjMiLz4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyMDAiIHI9IjI1IiBmaWxsPSIjQjQyNDI0IiBvcGFjaXR5PSIwLjUiLz4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyMDAiIHI9IjE1IiBmaWxsPSIjQjQyNDI0IiBvcGFjaXR5PSIwLjciLz4KCiAgPHJlY3QgeD0iNjAiIHk9IjMzMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2VjZjBmMSIgcng9IjE1IiByeT0iMTUiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjM0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMzQ0OTVlIj5NWVNURVJZPC90ZXh0PgogIDx0ZXh0IHg9IjE1MCIgeT0iNDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTVhNWE2Ij5JU0JOOiA5NzgtMC0zMDc0NzQyNzg8L3RleHQ+CiAgPHJlY3QgeD0iMTAwIiB5PSI0MTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmOGY5ZmEiIHJ4PSI0IiByeT0iNCIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iNDMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiBmb250LXNpemU9IjEwIiBmaWxsPSIjN2Y4YzhkIj5EYW4gQnJvd248L3RleHQ+Cjwvc3ZnPgo=",
    price: 14.99
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    isbn: "9781451648539",
    description: "An authorized biography of Steve Jobs, co-founder of Apple Inc.",
    availableCopies: 3,
    totalCopies: 3,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic3RldmVqb2JzR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSJ1cmwoI3N0ZXZlam9ic0dyYWRpZW50KSIgcng9IjgiIHJ5PSI4Ii8+CgogIDxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjI3MCIgaGVpZ2h0PSI0MjAiIGZpbGw9IiNmZmZmZmYiIHJ4PSI0IiByeT0iNCIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz4KCiAgPHRleHQgeD0iMTUwIiB5PSI4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjM2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzJjM2U1MCI+U3RldmUgSm9iczwvdGV4dD4KICA8dGV4dCB4PSIxNTAiIHk9IjExNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjN2Y4YzhkIj5ieSBXYWx0ZXIgSXNhYWNzb248L3RleHQ+CgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjIwMCIgcj0iNDAiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuMyIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjIwMCIgcj0iMjUiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuNSIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjIwMCIgcj0iMTUiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuNyIvPgoKICA8cmVjdCB4PSI2MCIgeT0iMzMwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZWNmMGYxIiByeD0iMTUiIHJ5PSIxNSIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMzQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiBmb250LXNpemU9IjEyIiBmaWxsPSIjMzQ0OTVlIj5CSU9HUkFQ0hZPC90ZXh0PgogIDx0ZXh0IHg9IjE1MCIgeT0iNDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTVhNWE2Ij5JU0JOOiA5NzgtMS00NTE2NDg1Mzk8L3RleHQ+CiAgPHJlY3QgeD0iMTAwIiB5PSI0MTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmOGY5ZmEiIHJ4PSI0IiByeT0iNCIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iNDMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiBmb250LXNpemU9IjEwIiBmaWxsPSIjN2Y4YzhkIj5XYWx0ZXIgSXNhYWNzb248L3RleHQ+Cjwvc3ZnPgo=",
    price: 19.99
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    isbn: "9780062316097",
    description: "A sweeping narrative of human history from the Stone Age to the modern age.",
    availableCopies: 4,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "data:image/svg+xml;base64,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",
    price: 17.99
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    isbn: "9780735211292",
    description: "A practical guide to building good habits and breaking bad ones through small, incremental changes.",
    availableCopies: 6,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
  }
];

async function addSampleBooks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing books
    await BookModel.deleteMany({});
    console.log('Cleared existing books');

    // Add sample books
    const books = await BookModel.insertMany(sampleBooks);
    console.log(`Added ${books.length} sample books`);

    console.log('Sample books added successfully!');
    console.log('Please add the corresponding image files to backend/uploads/ directory:');
    console.log('- great-gatsby.jpg');
    console.log('- to-kill-a-mockingbird.jpg');
    console.log('- 1984.jpg');
    console.log('- pride-and-prejudice.jpg');
    console.log('- catcher-in-the-rye.jpg');
    console.log('- harry-potter.jpg');

  } catch (error) {
    console.error('Error adding sample books:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the script
addSampleBooks();
