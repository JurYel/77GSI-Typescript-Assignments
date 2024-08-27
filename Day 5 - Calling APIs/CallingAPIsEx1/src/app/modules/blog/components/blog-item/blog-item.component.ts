import { Component, Input } from '@angular/core';
import { Blog } from 'src/app/modules/models/blog.interface';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent {

  @Input('blogInput') blog: Blog | undefined;
}
