import { Component } from '@angular/core';
import { Book } from 'src/app/modules/models/book.interface';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  booksArray: Book[]
  constructor(private bookService: BookService,
              private router: Router
  ) {
    this.booksArray = this.bookService.getBooksArray();
  }

  executeAddAction = () => {
    this.router.navigate(['/book/form/add/1']);
  }

  executeEditAction = (book: Book) => {
    console.log("Edit book: ", book.id);
    console.log("Current book: ", book);
    // this.router.navigate(['/book/form'], {queryParams: {edit: 1}});
    this.router.navigate(['/book/form/edit/' + book.id]);
  }

  executeDeleteAction = (book: Book) => {
    console.log("Deleting book: ", book.id);
    if(confirm("Are you sure you want to delete this book?")){
      if(this.bookService.deleteBook(book.id)){
        alert(`Book with id ${book.id} deleted successfully.`);
      } else {
        alert(`Error: Book with id ${book.id} does not exist.`);
      }
  
      this.booksArray = this.bookService.getBooksArray();
    }
    
  }

  executeDeleteAllAction = () => {
    if(confirm("Are you sure you want to delete all books?")){
      this.bookService.deleteAll();
      this.booksArray = this.bookService.getBooksArray();
    }
  }
}
