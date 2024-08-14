import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from 'src/app/modules/models/blog.interface';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent {

  @Input('blogInput') blog : Blog | undefined;

  @Output() editActionEmitter = new EventEmitter<Blog>();
  @Output() deleteActionEmitter = new EventEmitter<Blog>();

  sendEditAction = () => {
    this.editActionEmitter.emit(this.blog);
  }

  sendDeleteAction = () => {
    this.deleteActionEmitter.emit(this.blog);
  }
}
