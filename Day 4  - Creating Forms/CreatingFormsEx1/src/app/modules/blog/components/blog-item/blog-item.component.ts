import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/modules/models/blog.interface';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent {

  @Input('blogInput') blog: Blog | undefined;
  
}
