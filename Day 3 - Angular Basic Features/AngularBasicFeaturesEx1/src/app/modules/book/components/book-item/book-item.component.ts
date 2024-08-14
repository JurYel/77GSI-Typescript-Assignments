import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/modules/models/book.interface';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {

  @Input('bookInput') book: Book | undefined;

  @Output() editActionEmitter = new EventEmitter<Book>();
  @Output() deleteActionEmitter = new EventEmitter<Book>();

  sendEditAction = () => {
    this.editActionEmitter.emit(this.book);
  }

  sendDeleteAction = () => {
    this.deleteActionEmitter.emit(this.book);
  }
}
