import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from 'src/app/modules/models/blog.interface';
import { Book } from 'src/app/modules/models/book.interface';

@Component({
  selector: 'app-item-command-bar',
  templateUrl: './item-command-bar.component.html',
  styleUrls: ['./item-command-bar.component.css']
})
export class ItemCommandBarComponent {
  @Input('objectInput') objectItem: Blog | Book | undefined;
  
  @Output() addActionEmitter;
  @Output() deleteActionEmitter;

  constructor() {
    this.addActionEmitter = new EventEmitter<Blog | Book>();
    this.deleteActionEmitter = new EventEmitter<Blog | Book>();
  }

  sendEditAction = () => {
    this.addActionEmitter.emit(this.objectItem);
    console.log(this.objectItem);
  }

  sendDeleteAction = () => {
    this.deleteActionEmitter.emit(this.objectItem);
  }

}