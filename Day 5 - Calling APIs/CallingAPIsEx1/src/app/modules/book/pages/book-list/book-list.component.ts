import { AfterViewInit, Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/modules/models/book.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements AfterViewInit {

  books$: Observable<Book[]>;
  constructor (private bookService: BookService,
               private router: Router
  ) {
    this.books$ = this.bookService.getBooks();
  }

  ngAfterViewInit(): void {
    this.books$ = this.bookService.getBooks();

  }

  executeAddAction = () => {
    this.router.navigate(['/book/form/add/1']);
  }

  executeDeleteAllAction = () => {
    if(confirm("Are you sure you want to delete all blogs?")){
      this.bookService.deleteAllBooks().subscribe((data) => console.log("deleted all books", data));
      location.reload();
    }
  }

  executeEditAction = (book: Book) => {
    this.router.navigate(['/book/form/edit/' + book.id]);
  }

  executeDeleteAction = (book: Book) => {
    if(confirm("Are you sure you want to delete this book?")){
      if(this.bookService.deleteBook(book.id).subscribe()){
        alert(`Book with id ${book.id} deleted successfully.`);
      } else {
        alert(`Error: Book with id ${book.id} does not exist.`);
      }

      this.books$ = this.bookService.getBooks();
    }
  }
}
