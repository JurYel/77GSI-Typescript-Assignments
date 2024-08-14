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

  editBook = (updatedBook: any): boolean => {
    if(this.books.some(book => book.id == updatedBook.book_id)) {
      let index: number = this.books.findIndex(book => book.id == updatedBook.book_id);
      const newBook: Book =  {
        id: updatedBook.book_id,
        name: updatedBook.book_name,
        authors: [updatedBook.author1, 
                  (updatedBook.author2 !== '') ? updatedBook.author2 : '',
                  (updatedBook.author3 !== '') ? updatedBook.author3 : ''
        ],
        isbn: updatedBook.isbn
      }

      newBook.authors = newBook.authors.filter(author => author !== '');
      console.log(newBook);
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
}
