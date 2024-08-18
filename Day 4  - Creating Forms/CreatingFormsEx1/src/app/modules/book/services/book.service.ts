import { Injectable } from '@angular/core';
import { Book } from '../../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [
    {
      id: 1001,
      name: 'Atomic Habits',
      authors: ['James Clear'],
      isbn: '97589181'
    },
    {
      id: 1002,
      name: 'Pride and Prejudice',
      authors: ['Jane Austen', 'Austen Jane'],
      isbn: '87927841',
    },
    {
     id: 1003,
     name: 'Moby-Dick',
     authors: ['Herman Melville', 'Alex Guthenberg', 'Ella Watson'],
     isbn: '97828374'
    }
  ]

  constructor() { }

  getBooksArray = () => {
    return this.books;
  }

  addBook = (newBook: Book): boolean => {
    if(!this.books.some(book => book.id == newBook.id)) {
      this.books.push(newBook);
      return true;
    }

    return false;
  }

  editBook = (updatedBook: Book): boolean => {
    if(this.books.some(book => book.id == updatedBook.id)) {
      let index: number = this.books.findIndex(book => book.id == updatedBook.id);
      const newBook: Book =  {
        id: updatedBook.id,
        name: updatedBook.name,
        authors: [updatedBook.authors[0], 
                  (!updatedBook.authors[1]) ? '' : updatedBook.authors[1],
                  (!updatedBook.authors[2]) ? '' : updatedBook.authors[2],
                  (!updatedBook.authors[3]) ? '' : updatedBook.authors[3],
                  (!updatedBook.authors[4]) ? '' : updatedBook.authors[4],
                  (!updatedBook.authors[5]) ? '' : updatedBook.authors[5],
                  (!updatedBook.authors[6]) ? '' : updatedBook.authors[6],
                  (!updatedBook.authors[7]) ? '' : updatedBook.authors[7],
                  (!updatedBook.authors[8]) ? '' : updatedBook.authors[8],
                  (!updatedBook.authors[9]) ? '' : updatedBook.authors[9],
                  (!updatedBook.authors[10]) ? '' : updatedBook.authors[10]
        ],
        isbn: updatedBook.isbn
      }

      newBook.authors = newBook.authors.filter(author => author !== '');
      console.log("Updated Book: ", newBook);
      this.books[index] = newBook;
      
      return true;
    }

    return false;
  }

  deleteBook = (bookID: number): boolean => {
    if(this.books.some(book => book.id == bookID)){
      this.books = this.books.filter(book => book.id != bookID);
      return true;
    }

    return false;
  }

  deleteAll = () => {
    this.books = [];
  }
}

