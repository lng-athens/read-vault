const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const { connectDB } = require('../configs/database');

const AddBook = expressAsyncHandler(async (req, res) => {
    const bookDetails = req.body;

    const db = await connectDB();
    const bookCollection = db.collection('books');
    const filter = {isbn: bookDetails.isbn};

    const book = await bookCollection.findOne(filter);
    if (book) {
        res.status(400);
        throw new Error('A book with the same title or ISBN already exists');
    }

    const newBook = new Book(bookDetails);
    const addBookResult = await bookCollection.insertOne(newBook);
    if (!addBookResult.acknowledged || !addBookResult.insertedId) {
        res.status(500);
        throw new Error('Failed to add book');
    }

    res.status(201).send({message: 'Book has been added successfully'});
});

module.exports = {
    AddBook
};