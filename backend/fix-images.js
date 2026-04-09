const mongoose = require('mongoose');
require('dotenv').config();
const { BookModel } = require('./model/BookModel');

async function fix() {
  await mongoose.connect(process.env.MONGO_URI);
  const result = await BookModel.updateOne(
    { title: 'The Bhagavad Gita' },
    { $set: { coverImage: '/uploads/bhagavad-gita-cover.png' } }
  );
  console.log('Updated:', result.modifiedCount ? 'YES' : 'NO');
  const book = await BookModel.findOne({ title: 'The Bhagavad Gita' }, 'title coverImage');
  console.log(book.title, '=>', book.coverImage);
  await mongoose.connection.close();
}
fix();
