const mongoose = require('mongoose');
const { BookModel } = require('./model/BookModel');
require('dotenv').config();

// Book metadata with pages, year, publisher
const bookMetadata = {
    "The Great Gatsby": { pages: 180, publishedYear: 1925, publisher: "Scribner" },
    "To Kill a Mockingbird": { pages: 281, publishedYear: 1960, publisher: "J.B. Lippincott" },
    "The Catcher in the Rye": { pages: 234, publishedYear: 1951, publisher: "Little, Brown" },
    "The Alchemist": { pages: 208, publishedYear: 1988, publisher: "HarperOne" },
    "One Hundred Years of Solitude": { pages: 417, publishedYear: 1967, publisher: "Harper & Row" },
    "Dune": { pages: 688, publishedYear: 1965, publisher: "Chilton Books" },
    "1984": { pages: 328, publishedYear: 1949, publisher: "Secker & Warburg" },
    "Brave New World": { pages: 288, publishedYear: 1932, publisher: "Chatto & Windus" },
    "The Hitchhiker's Guide to the Galaxy": { pages: 224, publishedYear: 1979, publisher: "Pan Books" },
    "Foundation": { pages: 244, publishedYear: 1951, publisher: "Gnome Press" },
    "Project Hail Mary": { pages: 496, publishedYear: 2021, publisher: "Ballantine Books" },
    "Ender's Game": { pages: 324, publishedYear: 1985, publisher: "Tor Books" },
    "Harry Potter and the Sorcerer's Stone": { pages: 309, publishedYear: 1997, publisher: "Bloomsbury" },
    "The Hobbit": { pages: 310, publishedYear: 1937, publisher: "Allen & Unwin" },
    "The Lord of the Rings: The Fellowship of the Ring": { pages: 423, publishedYear: 1954, publisher: "Allen & Unwin" },
    "A Game of Thrones": { pages: 694, publishedYear: 1996, publisher: "Bantam Spectra" },
    "The Name of the Wind": { pages: 662, publishedYear: 2007, publisher: "DAW Books" },
    "The Way of Kings": { pages: 1007, publishedYear: 2010, publisher: "Tor Books" },
    "The Da Vinci Code": { pages: 454, publishedYear: 2003, publisher: "Doubleday" },
    "Gone Girl": { pages: 415, publishedYear: 2012, publisher: "Crown Publishing" },
    "The Silent Patient": { pages: 336, publishedYear: 2019, publisher: "Celadon Books" },
    "The Girl with the Dragon Tattoo": { pages: 465, publishedYear: 2005, publisher: "Norstedts Förlag" },
    "Murder on the Orient Express": { pages: 256, publishedYear: 1934, publisher: "Collins Crime Club" },
    "The Girl on the Train": { pages: 395, publishedYear: 2015, publisher: "Riverhead Books" },
    "Pride and Prejudice": { pages: 279, publishedYear: 1813, publisher: "T. Egerton" },
    "The Notebook": { pages: 214, publishedYear: 1996, publisher: "Warner Books" },
    "Outlander": { pages: 850, publishedYear: 1991, publisher: "Delacorte Press" },
    "Me Before You": { pages: 369, publishedYear: 2012, publisher: "Penguin Books" },
    "The Fault in Our Stars": { pages: 313, publishedYear: 2012, publisher: "Dutton Books" },
    "Steve Jobs": { pages: 656, publishedYear: 2011, publisher: "Simon & Schuster" },
    "Becoming": { pages: 448, publishedYear: 2018, publisher: "Crown Publishing" },
    "Educated": { pages: 334, publishedYear: 2018, publisher: "Random House" },
    "The Diary of a Young Girl": { pages: 283, publishedYear: 1947, publisher: "Contact Publishing" },
    "Long Walk to Freedom": { pages: 656, publishedYear: 1994, publisher: "Little, Brown" },
    "Einstein: His Life and Universe": { pages: 675, publishedYear: 2007, publisher: "Simon & Schuster" },
    "Sapiens: A Brief History of Humankind": { pages: 443, publishedYear: 2011, publisher: "Harper" },
    "Guns, Germs, and Steel": { pages: 480, publishedYear: 1997, publisher: "W.W. Norton" },
    "A People's History of the United States": { pages: 729, publishedYear: 1980, publisher: "Harper & Row" },
    "The Silk Roads": { pages: 636, publishedYear: 2015, publisher: "Bloomsbury" },
    "Atomic Habits": { pages: 320, publishedYear: 2018, publisher: "Avery" },
    "The 7 Habits of Highly Effective People": { pages: 381, publishedYear: 1989, publisher: "Free Press" },
    "How to Win Friends and Influence People": { pages: 291, publishedYear: 1936, publisher: "Simon & Schuster" },
    "The Power of Now": { pages: 236, publishedYear: 1997, publisher: "New World Library" },
    "Think and Grow Rich": { pages: 238, publishedYear: 1937, publisher: "The Ralston Society" },
    "The Subtle Art of Not Giving a F*ck": { pages: 224, publishedYear: 2016, publisher: "HarperOne" },
    "Thinking, Fast and Slow": { pages: 499, publishedYear: 2011, publisher: "Farrar, Straus and Giroux" },
    "The Power of Habit": { pages: 371, publishedYear: 2012, publisher: "Random House" },
    "Man's Search for Meaning": { pages: 184, publishedYear: 1946, publisher: "Beacon Press" },
    "Influence: The Psychology of Persuasion": { pages: 320, publishedYear: 1984, publisher: "Harper Business" },
    "Rich Dad Poor Dad": { pages: 336, publishedYear: 1997, publisher: "Warner Books" },
    "The Lean Startup": { pages: 336, publishedYear: 2011, publisher: "Crown Business" },
    "Good to Great": { pages: 300, publishedYear: 2001, publisher: "HarperBusiness" },
    "The Intelligent Investor": { pages: 640, publishedYear: 1949, publisher: "Harper & Brothers" },
    "Zero to One": { pages: 224, publishedYear: 2014, publisher: "Crown Business" },
    "Meditations": { pages: 256, publishedYear: 180, publisher: "Penguin Classics" },
    "The Republic": { pages: 416, publishedYear: -380, publisher: "Penguin Classics" },
    "Beyond Good and Evil": { pages: 240, publishedYear: 1886, publisher: "Penguin Classics" },
    "The Art of War": { pages: 128, publishedYear: -500, publisher: "Various" },
    "It": { pages: 1138, publishedYear: 1986, publisher: "Viking Press" },
    "The Shining": { pages: 447, publishedYear: 1977, publisher: "Doubleday" },
    "Dracula": { pages: 418, publishedYear: 1897, publisher: "Archibald Constable" },
    "Frankenstein": { pages: 280, publishedYear: 1818, publisher: "Lackington, Hughes" },
    "House of Leaves": { pages: 709, publishedYear: 2000, publisher: "Pantheon Books" },
    "The Complete Poems of Emily Dickinson": { pages: 770, publishedYear: 1955, publisher: "Little, Brown" },
    "Leaves of Grass": { pages: 352, publishedYear: 1855, publisher: "Self-published" },
    "Milk and Honey": { pages: 208, publishedYear: 2014, publisher: "Andrews McMeel" },
    "Charlotte's Web": { pages: 184, publishedYear: 1952, publisher: "Harper & Brothers" },
    "The Very Hungry Caterpillar": { pages: 26, publishedYear: 1969, publisher: "World Publishing" },
    "Where the Wild Things Are": { pages: 48, publishedYear: 1963, publisher: "Harper & Row" },
    "Matilda": { pages: 240, publishedYear: 1988, publisher: "Jonathan Cape" },
    "The Cat in the Hat": { pages: 61, publishedYear: 1957, publisher: "Random House" },
    "Clean Code": { pages: 464, publishedYear: 2008, publisher: "Prentice Hall" },
    "The Pragmatic Programmer": { pages: 352, publishedYear: 1999, publisher: "Addison-Wesley" },
    "JavaScript: The Good Parts": { pages: 176, publishedYear: 2008, publisher: "O'Reilly Media" },
    "Design Patterns": { pages: 395, publishedYear: 1994, publisher: "Addison-Wesley" },
    "Cracking the Coding Interview": { pages: 687, publishedYear: 2015, publisher: "CareerCup" },
    "Into the Wild": { pages: 207, publishedYear: 1996, publisher: "Villard" },
    "A Walk in the Woods": { pages: 276, publishedYear: 1998, publisher: "Broadway Books" },
    "Eat, Pray, Love": { pages: 334, publishedYear: 2006, publisher: "Viking Press" },
    "The Joy of Cooking": { pages: 1200, publishedYear: 1931, publisher: "Scribner" },
    "Salt, Fat, Acid, Heat": { pages: 480, publishedYear: 2017, publisher: "Simon & Schuster" },
    "Mastering the Art of French Cooking": { pages: 684, publishedYear: 1961, publisher: "Knopf" },
    "Why We Sleep": { pages: 368, publishedYear: 2017, publisher: "Scribner" },
    "The Body Keeps the Score": { pages: 464, publishedYear: 2014, publisher: "Viking Press" },
    "Born to Run": { pages: 287, publishedYear: 2009, publisher: "Knopf" },
    "The Boys in the Boat": { pages: 404, publishedYear: 2013, publisher: "Viking Press" },
    "Moneyball": { pages: 317, publishedYear: 2003, publisher: "W.W. Norton" },
    "The Story of Art": { pages: 688, publishedYear: 1950, publisher: "Phaidon Press" },
    "Ways of Seeing": { pages: 166, publishedYear: 1972, publisher: "Penguin Books" },
    "The Bhagavad Gita": { pages: 256, publishedYear: -200, publisher: "Nilgiri Press" },
    "Siddhartha": { pages: 152, publishedYear: 1922, publisher: "New Directions" },
    "The Four Agreements": { pages: 160, publishedYear: 1997, publisher: "Amber-Allen" },
    "Watchmen": { pages: 416, publishedYear: 1987, publisher: "DC Comics" },
    "Freakonomics": { pages: 315, publishedYear: 2005, publisher: "William Morrow" },
    "This Is Your Brain on Music": { pages: 322, publishedYear: 2006, publisher: "Dutton" },
    "A Streetcar Named Desire": { pages: 142, publishedYear: 1947, publisher: "New Directions" },
    "Treasure Island": { pages: 292, publishedYear: 1883, publisher: "Cassell and Company" },
    "Mythology": { pages: 497, publishedYear: 1942, publisher: "Little, Brown" },
    "The Hitchhiker's Guide to the Galaxy: Restaurant at the End of the Universe": { pages: 208, publishedYear: 1980, publisher: "Pan Books" },
    "Wuthering Heights": { pages: 342, publishedYear: 1847, publisher: "Thomas Cautley Newby" }
};

async function updateBooks() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const books = await BookModel.find({});
        console.log(`Found ${books.length} books to update`);

        let updated = 0;
        for (const book of books) {
            const metadata = bookMetadata[book.title];
            if (metadata) {
                await BookModel.updateOne(
                    { _id: book._id },
                    {
                        $set: {
                            pages: metadata.pages,
                            publishedYear: metadata.publishedYear,
                            publisher: metadata.publisher,
                            language: 'English'
                        }
                    }
                );
                updated++;
            } else {
                // For books without specific metadata, generate reasonable defaults
                const randomPages = Math.floor(Math.random() * 300) + 150;
                const randomYear = Math.floor(Math.random() * 50) + 1970;
                await BookModel.updateOne(
                    { _id: book._id },
                    {
                        $set: {
                            pages: randomPages,
                            publishedYear: randomYear,
                            publisher: 'Various Publishers',
                            language: 'English'
                        }
                    }
                );
                updated++;
            }
        }

        console.log(`Updated ${updated} books with pages, year, and publisher info`);
        console.log('Books updated successfully!');

    } catch (error) {
        console.error('Error updating books:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

updateBooks();
