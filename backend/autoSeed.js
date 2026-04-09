/**
 * Auto-Seeder: Automatically syncs book data on server startup.
 * 
 * HOW IT WORKS:
 * - On every server start, it checks if the books in the database match the seed data.
 * - If a book (by ISBN) doesn't exist, it inserts it.
 * - If a book exists but has a different coverImage/price/description, it updates it.
 * - It NEVER deletes books added by admins/librarians through the app.
 * - This means you can change book data in seedData.js, deploy, and it auto-syncs.
 */

const { BookModel } = require('./model/BookModel');
const seedBooks = require('./seedData');

async function autoSeed() {
  try {
    console.log('🔄 Auto-seeder: Checking book data...');
    
    let inserted = 0;
    let updated = 0;
    let unchanged = 0;

    for (const seedBook of seedBooks) {
      // Find by ISBN (unique identifier)
      const existing = await BookModel.findOne({ isbn: seedBook.isbn });

      if (!existing) {
        // Book doesn't exist — insert it
        await BookModel.create(seedBook);
        inserted++;
      } else {
        // Book exists — check if anything changed
        const fieldsToSync = ['title', 'author', 'category', 'description', 'coverImage', 'price'];
        const updates = {};
        let hasChanges = false;

        for (const field of fieldsToSync) {
          if (seedBook[field] !== undefined && seedBook[field] !== existing[field]) {
            updates[field] = seedBook[field];
            hasChanges = true;
          }
        }

        if (hasChanges) {
          await BookModel.updateOne({ isbn: seedBook.isbn }, { $set: updates });
          updated++;
        } else {
          unchanged++;
        }
      }
    }

    console.log(`✅ Auto-seeder complete: ${inserted} inserted, ${updated} updated, ${unchanged} unchanged`);
  } catch (error) {
    console.error('❌ Auto-seeder error:', error.message);
    // Don't crash the server if seeding fails
  }
}

module.exports = { autoSeed };
