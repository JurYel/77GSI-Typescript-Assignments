import { Component, Input } from '@angular/core';
import { Blog } from 'src/app/modules/models/blog.interface';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {

  blogsArray: Blog[];

  constructor (private blogService: BlogService,
               private router: Router
  ) {
    this.blogsArray = this.blogService.getBlogsArray();
  }

  executeAddAction = () => {
    this.router.navigate(['/blog/form/add/1']);
  }

  executeEditAction = (blog: Blog) => {
    console.log("Edit blog: ", blog.id);
    console.log("Current blog: ", blog);
    // this.router.navigate(['/book/form'], {queryParams: {edit: 1}});
    this.router.navigate(['/blog/form/edit/' + blog.id]);
  }

  executeDeleteAction = (blog: Blog) => {
    console.log("Deleting book: ", blog.id);
    if(confirm("Are you sure you want to delete this blog?")){
      if(this.blogService.deleteBlog(blog.id)){
        alert(`Book with id ${blog.id} deleted successfully.`);
      } else {
        alert(`Error: Book with id ${blog.id} does not exist.`);
      }

      this.blogsArray = this.blogService.getBlogsArray();
    }
  }

  executeDeleteAllAction = () => {
    if(confirm("Are you sure you want to delete all blogs?")){
      this.blogService.deleteAll();
      this.blogsArray = this.blogService.getBlogsArray();
    }
  }
}
