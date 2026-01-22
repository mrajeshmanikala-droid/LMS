const categories = [
  "Fiction", "Non-Fiction", "Mystery", "Thriller", "Romance", "Science Fiction", "Fantasy", "Biography", "History", "Self-Help", "Horror", "Children's",
  "Poetry", "Drama", "Adventure", "Comedy", "Tragedy", "Philosophy", "Psychology", "Economics", "Politics", "Religion", "Travel", "Cooking", "Art", "Music",
  "Health", "Sports", "Technology", "Environment", "Education", "Law", "Medicine", "Engineering", "Agriculture", "Mythology", "Folklore", "Anthropology"
];

const sampleBooksData = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" },
  { title: "Pride and Prejudice", author: "Jane Austen" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
  { title: "The Da Vinci Code", author: "Dan Brown" },
  { title: "Gone Girl", author: "Gillian Flynn" },
  { title: "The Notebook", author: "Nicholas Sparks" },
  { title: "Dune", author: "Frank Herbert" },
  { title: "Neuromancer", author: "William Gibson" },
  { title: "The Name of the Wind", author: "Patrick Rothfuss" },
  { title: "Steve Jobs", author: "Walter Isaacson" },
  { title: "Sapiens", author: "Yuval Noah Harari" },
  { title: "Educated", author: "Tara Westover" },
  { title: "Atomic Habits", author: "James Clear" },
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "The Power of Now", author: "Eckhart Tolle" },
  { title: "The Road Less Traveled", author: "M. Scott Peck" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
  { title: "The Lean Startup", author: "Eric Ries" },
  { title: "How to Win Friends and Influence People", author: "Dale Carnegie" }
];

function generateISBN() {
  return '978' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
}

function generateDescription(title, author) {
  return `A captivating book titled "${title}" by ${author}, exploring various themes and ideas.`;
}

const sampleBooks = [];
let bookCount = 0;

categories.forEach((category, catIndex) => {
  const booksPerCategory = Math.floor(135 / categories.length) + (catIndex < 135 % categories.length ? 1 : 0);
  for (let i = 0; i < booksPerCategory; i++) {
    const bookData = sampleBooksData[bookCount % sampleBooksData.length];
    const title = bookData.title + (i > 0 ? ` ${i + 1}` : '');
    const author = bookData.author;
    const isbn = generateISBN();
    const description = generateDescription(title, author);
    const availableCopies = Math.floor(Math.random() * 10) + 1;
    const totalCopies = availableCopies + Math.floor(Math.random() * 5);

    sampleBooks.push({
      title,
      author,
      category,
      isbn,
      description,
      availableCopies,
      totalCopies,
      addedBy: "507f1f77bcf86cd799439011"
    });
    bookCount++;
  }
});

const fs = require('fs');
fs.writeFileSync('generated-books.json', JSON.stringify(sampleBooks, null, 2));
console.log('Generated', sampleBooks.length, 'books');
