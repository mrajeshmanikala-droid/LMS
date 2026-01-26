const mongoose = require('mongoose');
const { BookModel } = require('./model/BookModel');
require('dotenv').config();

const sampleBooks = [
  // ==================== FICTION ====================
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    isbn: "9780743273565",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of Nick Carraway.",
    availableCopies: 5,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    price: 15.99
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    isbn: "9780061120084",
    description: "A powerful story about racial injustice and childhood innocence in the American South during the 1930s.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    price: 12.99
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    isbn: "9780316769488",
    description: "A controversial novel about teenage rebellion and alienation, narrated by the iconic Holden Caulfield.",
    availableCopies: 2,
    totalCopies: 3,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
    price: 14.99
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    isbn: "9780062315007",
    description: "A magical story about Santiago, a young shepherd who travels from Spain to Egypt in search of treasure and discovers the true meaning of life.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400",
    price: 12.99
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    category: "Fiction",
    isbn: "9780060883287",
    description: "A landmark novel of magical realism following seven generations of the Buendía family in the fictional town of Macondo.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400",
    price: 16.99
  },

  // ==================== SCIENCE FICTION ====================
  {
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    isbn: "9780441172719",
    description: "An epic science fiction saga about politics, religion, and ecology on the desert planet Arrakis, home to the most valuable substance in the universe.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    price: 16.99
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Science Fiction",
    isbn: "9780451524935",
    description: "A dystopian masterpiece about totalitarian control, surveillance, and the power of language in a nightmarish future society.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
    price: 13.99
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Science Fiction",
    isbn: "9780060850524",
    description: "A chilling vision of a future society controlled through genetic engineering, conditioning, and a drug called soma.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400",
    price: 14.99
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    category: "Science Fiction",
    isbn: "9780345391803",
    description: "A comedic science fiction adventure following Arthur Dent's journey through space after Earth's destruction.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400",
    price: 12.99
  },
  {
    title: "Foundation",
    author: "Isaac Asimov",
    category: "Science Fiction",
    isbn: "9780553293357",
    description: "The first book in Asimov's legendary series about the fall of the Galactic Empire and the Foundation's mission to preserve knowledge.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400",
    price: 15.99
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Science Fiction",
    isbn: "9780593135204",
    description: "A lone astronaut must save Earth from disaster in this thrilling space adventure about science, friendship, and survival.",
    availableCopies: 7,
    totalCopies: 8,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400",
    price: 16.99
  },
  {
    title: "Ender's Game",
    author: "Orson Scott Card",
    category: "Science Fiction",
    isbn: "9780812550702",
    description: "A young genius is recruited to a military academy in space to prepare for an alien invasion in this Hugo and Nebula award winner.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400",
    price: 14.99
  },

  // ==================== FANTASY ====================
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    isbn: "9780590353427",
    description: "The first book in the beloved series following Harry Potter's discovery that he's a wizard and his first year at Hogwarts.",
    availableCopies: 8,
    totalCopies: 10,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400",
    price: 18.99
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    isbn: "9780547928227",
    description: "Bilbo Baggins embarks on an unexpected adventure with a wizard and thirteen dwarves to reclaim a kingdom from a dragon.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
    price: 14.99
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    isbn: "9780618260584",
    description: "The epic first volume of Tolkien's masterpiece, following Frodo's journey to destroy the One Ring.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=400",
    price: 19.99
  },
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    category: "Fantasy",
    isbn: "9780553593716",
    description: "The first book in the epic A Song of Ice and Fire series, featuring political intrigue, war, and magic in the Seven Kingdoms.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    price: 17.99
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    category: "Fantasy",
    isbn: "9780756404741",
    description: "Kvothe, a legendary figure, tells the story of his life from humble beginnings to becoming the most notorious wizard of his age.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    price: 15.99
  },
  {
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    category: "Fantasy",
    isbn: "9780765365279",
    description: "The first book in the Stormlight Archive, an epic fantasy set in a world of magical storms and ancient knights.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?w=400",
    price: 18.99
  },

  // ==================== MYSTERY & THRILLER ====================
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    category: "Mystery",
    isbn: "9780307474278",
    description: "A thriller involving secret societies, hidden messages in famous artwork, and a quest for the Holy Grail.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400",
    price: 14.99
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "Thriller",
    isbn: "9780307588371",
    description: "A twisted psychological thriller about a marriage gone wrong and the dark secrets that surface when a wife disappears.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?w=400",
    price: 13.99
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    isbn: "9781250301697",
    description: "A psychological thriller about a famous painter who shoots her husband and then never speaks again.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    price: 13.99
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    category: "Mystery",
    isbn: "9780307454546",
    description: "A journalist and a brilliant hacker investigate a decades-old disappearance in this explosive thriller.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    price: 15.99
  },
  {
    title: "Murder on the Orient Express",
    author: "Agatha Christie",
    category: "Mystery",
    isbn: "9780062693662",
    description: "Detective Hercule Poirot investigates a murder on a snowbound train in this classic whodunit.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?w=400",
    price: 11.99
  },
  {
    title: "The Girl on the Train",
    author: "Paula Hawkins",
    category: "Thriller",
    isbn: "9781594634024",
    description: "A psychological thriller about a woman who becomes entangled in a missing person investigation.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400",
    price: 14.99
  },

  // ==================== ROMANCE ====================
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    isbn: "9780141439518",
    description: "A timeless romantic novel about Elizabeth Bennet and Mr. Darcy, exploring themes of love, class, and personal growth.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400",
    price: 11.99
  },
  {
    title: "The Notebook",
    author: "Nicholas Sparks",
    category: "Romance",
    isbn: "9781455582877",
    description: "A beautiful love story spanning decades, about a couple whose romance is tested by time and circumstance.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400",
    price: 12.99
  },
  {
    title: "Outlander",
    author: "Diana Gabaldon",
    category: "Romance",
    isbn: "9780440212560",
    description: "A World War II nurse is transported back to 18th century Scotland where she falls for a Highland warrior.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    price: 16.99
  },
  {
    title: "Me Before You",
    author: "Jojo Moyes",
    category: "Romance",
    isbn: "9780143124542",
    description: "A heartwarming and heartbreaking love story about a young woman who becomes a caregiver for a quadriplegic man.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
    price: 13.99
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    category: "Romance",
    isbn: "9780142424179",
    description: "Two teenagers with cancer fall in love in this beautiful, heart-wrenching story about life, death, and love.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?w=400",
    price: 12.99
  },

  // ==================== BIOGRAPHY & MEMOIR ====================
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    isbn: "9781451648539",
    description: "The authorized biography of Steve Jobs, co-founder of Apple Inc., based on exclusive interviews.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=400",
    price: 19.99
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    category: "Biography",
    isbn: "9781524763138",
    description: "The intimate memoir of former First Lady Michelle Obama, reflecting on her journey from Chicago to the White House.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    price: 19.99
  },
  {
    title: "Educated",
    author: "Tara Westover",
    category: "Memoir",
    isbn: "9780399590504",
    description: "A powerful memoir about a woman who grows up in a survivalist family in Idaho and eventually earns a PhD from Cambridge.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
    price: 15.99
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "Biography",
    isbn: "9780553296983",
    description: "The moving diary of a young Jewish girl hiding from the Nazis during World War II.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
    price: 10.99
  },
  {
    title: "Long Walk to Freedom",
    author: "Nelson Mandela",
    category: "Biography",
    isbn: "9780316548182",
    description: "The autobiography of Nelson Mandela, chronicling his extraordinary journey from prisoner to president.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    price: 17.99
  },
  {
    title: "Einstein: His Life and Universe",
    author: "Walter Isaacson",
    category: "Biography",
    isbn: "9780743264747",
    description: "A comprehensive biography of Albert Einstein, exploring his genius, personal life, and impact on science.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    price: 18.99
  },

  // ==================== HISTORY ====================
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    isbn: "9780062316097",
    description: "A sweeping narrative of human history from the Stone Age to the modern age, exploring how we became Earth's dominant species.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400",
    price: 17.99
  },
  {
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    isbn: "9780393354324",
    description: "A groundbreaking exploration of why certain civilizations triumphed over others throughout history.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400",
    price: 16.99
  },
  {
    title: "A People's History of the United States",
    author: "Howard Zinn",
    category: "History",
    isbn: "9780062397348",
    description: "American history told from the perspective of workers, women, people of color, and other marginalized groups.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1604882356667-83a650c9a2a5?w=400",
    price: 15.99
  },
  {
    title: "The Silk Roads",
    author: "Peter Frankopan",
    category: "History",
    isbn: "9781101912379",
    description: "A new history of the world, told through the networks of trade routes that connected East and West.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1502189562704-87e622a34c85?w=400",
    price: 18.99
  },

  // ==================== SELF-HELP ====================
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    isbn: "9780735211292",
    description: "A practical guide to building good habits and breaking bad ones through small, incremental changes.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400",
    price: 16.99
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    category: "Self-Help",
    isbn: "9781982137274",
    description: "A principle-centered approach to personal and professional effectiveness that has influenced millions.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400",
    price: 14.99
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    category: "Self-Help",
    isbn: "9780671027032",
    description: "The timeless classic on human relations and communication that has helped millions succeed.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400",
    price: 12.99
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Self-Help",
    isbn: "9781577314806",
    description: "A guide to spiritual enlightenment and living in the present moment.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=400",
    price: 15.99
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Self-Help",
    isbn: "9781585424337",
    description: "The classic guide to success and wealth based on studying the habits of the most successful people.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    price: 11.99
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Self-Help",
    isbn: "9780062457714",
    description: "A counterintuitive approach to living a good life by focusing on what truly matters.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    price: 14.99
  },

  // ==================== PSYCHOLOGY ====================
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    isbn: "9780374275631",
    description: "A groundbreaking book about the two systems that drive the way we think and make decisions.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    price: 18.99
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    category: "Psychology",
    isbn: "9780812981605",
    description: "An exploration of the science behind why habits exist and how they can be changed.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    price: 15.99
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    category: "Psychology",
    isbn: "9780807014295",
    description: "A psychiatrist's account of finding meaning in the midst of suffering during the Holocaust.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
    price: 12.99
  },
  {
    title: "Influence: The Psychology of Persuasion",
    author: "Robert B. Cialdini",
    category: "Psychology",
    isbn: "9780062937650",
    description: "A classic exploration of the psychology behind why people say yes and how to apply these insights.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    price: 16.99
  },

  // ==================== BUSINESS & FINANCE ====================
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    isbn: "9781612680194",
    description: "The #1 personal finance book about financial literacy, investing, and building wealth.",
    availableCopies: 8,
    totalCopies: 10,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    price: 14.99
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    isbn: "9780307887894",
    description: "A methodology for developing businesses and products through validated learning and experimentation.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    price: 16.99
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    category: "Business",
    isbn: "9780066620992",
    description: "A study of what transforms good companies into truly great ones based on years of research.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
    price: 17.99
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    category: "Finance",
    isbn: "9780060555665",
    description: "The definitive book on value investing, considered the stock market bible by Warren Buffett.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    price: 22.99
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    isbn: "9780804139298",
    description: "Notes on startups and how to build the future, from PayPal co-founder Peter Thiel.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400",
    price: 15.99
  },

  // ==================== PHILOSOPHY ====================
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    category: "Philosophy",
    isbn: "9780812968255",
    description: "The private writings of the Roman Emperor, offering timeless wisdom on Stoic philosophy.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400",
    price: 10.99
  },
  {
    title: "The Republic",
    author: "Plato",
    category: "Philosophy",
    isbn: "9780140455113",
    description: "Plato's masterpiece exploring justice, the ideal state, and the nature of reality.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    price: 12.99
  },
  {
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    category: "Philosophy",
    isbn: "9780140449235",
    description: "Nietzsche's critique of traditional morality and exploration of the will to power.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
    price: 13.99
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    category: "Philosophy",
    isbn: "9781599869773",
    description: "The ancient Chinese military treatise that remains influential in business and strategy today.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400",
    price: 9.99
  },

  // ==================== HORROR ====================
  {
    title: "It",
    author: "Stephen King",
    category: "Horror",
    isbn: "9781501142970",
    description: "A terrifying tale of an ancient evil that preys on children in Derry, Maine, and the group who must stop it.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1509248961725-aec71f28f1e1?w=400",
    price: 17.99
  },
  {
    title: "The Shining",
    author: "Stephen King",
    category: "Horror",
    isbn: "9780307743657",
    description: "A family becomes trapped in an isolated hotel for the winter, where supernatural forces drive the father to violence.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400",
    price: 14.99
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    category: "Horror",
    isbn: "9780141439846",
    description: "The classic Gothic novel that introduced Count Dracula and defined the vampire genre.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1509248961725-aec71f28f1e1?w=400",
    price: 11.99
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    category: "Horror",
    isbn: "9780141439471",
    description: "The Gothic masterpiece about a scientist who creates a monster and must face the consequences.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
    price: 10.99
  },
  {
    title: "House of Leaves",
    author: "Mark Z. Danielewski",
    category: "Horror",
    isbn: "9780375703768",
    description: "A mind-bending horror novel about a house that is larger on the inside than on the outside.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
    price: 16.99
  },

  // ==================== POETRY ====================
  {
    title: "The Complete Poems of Emily Dickinson",
    author: "Emily Dickinson",
    category: "Poetry",
    isbn: "9780316184137",
    description: "The definitive collection of all 1,775 poems by the legendary American poet.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?w=400",
    price: 18.99
  },
  {
    title: "Leaves of Grass",
    author: "Walt Whitman",
    category: "Poetry",
    isbn: "9780140421996",
    description: "Whitman's groundbreaking collection of poetry celebrating democracy, nature, and the human body.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400",
    price: 14.99
  },
  {
    title: "Milk and Honey",
    author: "Rupi Kaur",
    category: "Poetry",
    isbn: "9781449474256",
    description: "A collection of poetry about survival, the experience of violence, abuse, love, loss, and femininity.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400",
    price: 12.99
  },

  // ==================== CHILDREN'S ====================
  {
    title: "Charlotte's Web",
    author: "E.B. White",
    category: "Children's",
    isbn: "9780064400558",
    description: "The beloved story of a pig named Wilbur and his friendship with a spider named Charlotte.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    price: 8.99
  },
  {
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    category: "Children's",
    isbn: "9780399226908",
    description: "A classic picture book following a caterpillar as he eats his way through various foods before becoming a butterfly.",
    availableCopies: 8,
    totalCopies: 10,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400",
    price: 7.99
  },
  {
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    category: "Children's",
    isbn: "9780064431781",
    description: "A boy named Max sails to an island of Wild Things and becomes their king.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    price: 8.99
  },
  {
    title: "Matilda",
    author: "Roald Dahl",
    category: "Children's",
    isbn: "9780142410370",
    description: "A young genius with telekinetic powers stands up to cruel adults in this beloved children's classic.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    price: 9.99
  },
  {
    title: "The Cat in the Hat",
    author: "Dr. Seuss",
    category: "Children's",
    isbn: "9780394800011",
    description: "Two children spend a rainy day with the mischievous Cat in the Hat and his companions Thing 1 and Thing 2.",
    availableCopies: 7,
    totalCopies: 8,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=400",
    price: 8.99
  },

  // ==================== TECHNOLOGY ====================
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    isbn: "9780132350884",
    description: "A handbook of agile software craftsmanship, teaching the principles of writing clean, maintainable code.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    price: 29.99
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas and Andrew Hunt",
    category: "Technology",
    isbn: "9780135957059",
    description: "A guide to becoming a better programmer through practical tips and techniques.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
    price: 34.99
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Technology",
    isbn: "9780596517748",
    description: "A guide to the best features of JavaScript and how to use them effectively.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
    price: 25.99
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    category: "Technology",
    isbn: "9780201633610",
    description: "The classic book on software design patterns that every programmer should read.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    price: 39.99
  },
  {
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    category: "Technology",
    isbn: "9780984782857",
    description: "The complete guide to preparing for technical interviews at top tech companies.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400",
    price: 35.99
  },

  // ==================== TRAVEL ====================
  {
    title: "Into the Wild",
    author: "Jon Krakauer",
    category: "Travel",
    isbn: "9780385486804",
    description: "The true story of Chris McCandless, a young man who ventured into the Alaskan wilderness and never returned.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
    price: 14.99
  },
  {
    title: "A Walk in the Woods",
    author: "Bill Bryson",
    category: "Travel",
    isbn: "9780767902526",
    description: "A humorous account of hiking the Appalachian Trail with an old friend.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
    price: 13.99
  },
  {
    title: "Eat, Pray, Love",
    author: "Elizabeth Gilbert",
    category: "Travel",
    isbn: "9780143038412",
    description: "A woman's journey of self-discovery through Italy, India, and Indonesia after a painful divorce.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    price: 14.99
  },

  // ==================== COOKING ====================
  {
    title: "The Joy of Cooking",
    author: "Irma S. Rombauer",
    category: "Cooking",
    isbn: "9781501169717",
    description: "The definitive American cookbook with thousands of recipes for home cooks.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
    price: 35.99
  },
  {
    title: "Salt, Fat, Acid, Heat",
    author: "Samin Nosrat",
    category: "Cooking",
    isbn: "9781476753836",
    description: "Mastering the elements of good cooking through understanding the four essential elements.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    price: 28.99
  },
  {
    title: "Mastering the Art of French Cooking",
    author: "Julia Child",
    category: "Cooking",
    isbn: "9780375413407",
    description: "The classic cookbook that brought French cuisine to American home kitchens.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400",
    price: 32.99
  },

  // ==================== HEALTH & FITNESS ====================
  {
    title: "Why We Sleep",
    author: "Matthew Walker",
    category: "Health",
    isbn: "9781501144325",
    description: "A groundbreaking exploration of sleep and its vital importance to our health and well-being.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400",
    price: 16.99
  },
  {
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    category: "Health",
    isbn: "9780143127741",
    description: "How trauma affects the body and innovative treatments for recovery.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    price: 17.99
  },
  {
    title: "Born to Run",
    author: "Christopher McDougall",
    category: "Health",
    isbn: "9780307279187",
    description: "The story of the Tarahumara Indians of Mexico and their extraordinary running abilities.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400",
    price: 15.99
  },

  // ==================== SPORTS ====================
  {
    title: "The Boys in the Boat",
    author: "Daniel James Brown",
    category: "Sports",
    isbn: "9780143125471",
    description: "The true story of the American rowing team that stunned the world at the 1936 Olympics.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=400",
    price: 14.99
  },
  {
    title: "Moneyball",
    author: "Michael Lewis",
    category: "Sports",
    isbn: "9780393324815",
    description: "How the Oakland A's revolutionized baseball using data analytics and statistics.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=400",
    price: 15.99
  },

  // ==================== ART & DESIGN ====================
  {
    title: "The Story of Art",
    author: "E.H. Gombrich",
    category: "Art",
    isbn: "9780714832470",
    description: "One of the most famous and popular books on art ever written, covering the history of art.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400",
    price: 35.99
  },
  {
    title: "Ways of Seeing",
    author: "John Berger",
    category: "Art",
    isbn: "9780140135152",
    description: "A revolutionary way of looking at art that changed how people understand visual culture.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
    price: 14.99
  },

  // ==================== RELIGION & SPIRITUALITY ====================
  {
    title: "The Bhagavad Gita",
    author: "Eknath Easwaran",
    category: "Religion",
    isbn: "9781586380199",
    description: "A translation and commentary of the ancient Hindu scripture on duty and devotion.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    price: 12.99
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    category: "Spirituality",
    isbn: "9780553208849",
    description: "A spiritual journey following a young man's quest for enlightenment in ancient India.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400",
    price: 11.99
  },
  {
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    category: "Spirituality",
    isbn: "9781878424310",
    description: "A practical guide to personal freedom based on ancient Toltec wisdom.",
    availableCopies: 6,
    totalCopies: 7,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
    price: 10.99
  },

  // ==================== ADDITIONAL BOOKS (to reach 100) ====================
  {
    title: "Watchmen",
    author: "Alan Moore",
    category: "Graphic Novel",
    isbn: "9781401245252",
    description: "A groundbreaking graphic novel that redefined the superhero genre with complex themes and morality.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400",
    price: 19.99
  },
  {
    title: "Freakonomics",
    author: "Steven D. Levitt",
    category: "Economics",
    isbn: "9780060731335",
    description: "A rogue economist explores the hidden side of everything using data and unconventional thinking.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    price: 14.99
  },
  {
    title: "This Is Your Brain on Music",
    author: "Daniel J. Levitin",
    category: "Music",
    isbn: "9780452288522",
    description: "A neuroscientist explores why we love music and how it affects our brains.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
    price: 15.99
  },
  {
    title: "A Streetcar Named Desire",
    author: "Tennessee Williams",
    category: "Drama",
    isbn: "9780811216029",
    description: "A Pulitzer Prize-winning play about fading Southern belle Blanche DuBois and her descent into madness.",
    availableCopies: 3,
    totalCopies: 4,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400",
    price: 11.99
  },
  {
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    category: "Adventure",
    isbn: "9780141321004",
    description: "The classic tale of pirates, buried treasure, and adventure on the high seas.",
    availableCopies: 5,
    totalCopies: 6,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?w=400",
    price: 9.99
  },
  {
    title: "Mythology",
    author: "Edith Hamilton",
    category: "Mythology",
    isbn: "9780446574754",
    description: "The definitive collection of Greek, Roman, and Norse mythology retold with clarity and passion.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=400",
    price: 13.99
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy: Restaurant at the End of the Universe",
    author: "Douglas Adams",
    category: "Humor",
    isbn: "9780345391810",
    description: "The second book in the Hitchhiker's series, continuing Arthur Dent's comedic space adventures.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    price: 12.99
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    category: "Classic",
    isbn: "9780141439556",
    description: "A passionate tale of love and revenge on the Yorkshire moors, considered one of English literature's greatest novels.",
    availableCopies: 4,
    totalCopies: 5,
    addedBy: "507f1f77bcf86cd799439011",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400",
    price: 10.99
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
    console.log('\nBooks added by category:');

    const categories = [...new Set(sampleBooks.map(b => b.category))];
    categories.forEach(cat => {
      const count = sampleBooks.filter(b => b.category === cat).length;
      console.log(`  ${cat}: ${count} books`);
    });

  } catch (error) {
    console.error('Error adding sample books:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the script
addSampleBooks();
