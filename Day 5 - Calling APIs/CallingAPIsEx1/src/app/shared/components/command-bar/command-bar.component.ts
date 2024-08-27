import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from 'src/app/modules/models/blog.interface';
import { Book } from 'src/app/modules/models/book.interface';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})

export class CommandBarComponent {
  @Output() addActionEmitter;
  @Output() deleteAllActionEmitter;

  constructor() {
    this.addActionEmitter = new EventEmitter<Boolean>();
    this.deleteAllActionEmitter = new EventEmitter<Boolean>();
  }

  sendAddAction = () => {
    this.addActionEmitter.emit(true);
    // console.log(this.actionItem);
  }

  sendDeleteAllAction = () => {
    this.deleteAllActionEmitter.emit(true);
  }
}
