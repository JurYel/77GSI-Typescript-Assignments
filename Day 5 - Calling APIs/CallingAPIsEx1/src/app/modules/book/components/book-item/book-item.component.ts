import { Component, Input } from '@angular/core';
import { Book } from 'src/app/modules/models/book.interface';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {

  @Input('bookInput') book: Book | undefined;
}
