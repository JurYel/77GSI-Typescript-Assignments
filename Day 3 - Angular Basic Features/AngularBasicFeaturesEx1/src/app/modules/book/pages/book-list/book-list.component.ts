import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from 'src/app/modules/models/book.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {

  booksArray: Book[];
  bookForm: any = {
    book_id: '',
    book_name: '',
    author1: '',
    author2: '',
    author3: '',
    isbn: ''
  };
  index: number = -1;
  disableInput = false;

  constructor(private bookService: BookService, 
              private formBuilder: FormBuilder){
    this.booksArray = this.bookService.getBooksArray();
  }

 executeEdit = (book: Book) => {
  console.log("Edit book: ", book.id);
  this.index = this.booksArray.findIndex(bookItem => bookItem.id == book.id);
  this.bookForm = {
      book_id: this.booksArray[this.index].id,
      book_name: this.booksArray[this.index].name,
      author1: this.booksArray[this.index].authors[0],
      author2: (!this.booksArray[this.index].authors[1]) ? '' : this.booksArray[this.index].authors[1],
      author3: (!this.booksArray[this.index].authors[2]) ? '' : this.booksArray[this.index].authors[2],
      isbn: this.booksArray[this.index].isbn
    }

    if(!this.disableInput){
      this.disableInput = !this.disableInput;
    }
  }

 executeDelete = (book: Book) => {
  console.log("Deleting book: ", book.id);
  if(this.bookService.deleteBook(book.id)){
    console.log(`Book with id ${book.id} deleted successfully.`);
  } else {
    console.error(`Error: Book with id ${book.id} does not exist.`);
  }

  this.booksArray = this.bookService.getBooksArray();
 }

 clearBookForm = () => {
  this.bookForm = {
    book_id: '',
    book_name: '',
    author1: '',
    author2: '',
    author3: '',
    isbn: ''
  }
 }

 handleEditAction = () => {
  
  if(this.bookService.editBook(this.bookForm)){
    
    console.log("Book " + this.bookForm.book_id + " editted successfully!");
  } else {
    alert(`Error: Book with id ${this.bookForm.book_id} does not exist.`);
  }

  this.clearBookForm();
  this.disableInput = !this.disableInput;
  this.index = -1;
 }

 handleAddAction = () => {
  
  console.log("form submit");

  console.warn("Form submmited: ", this.bookForm);
 }
}
