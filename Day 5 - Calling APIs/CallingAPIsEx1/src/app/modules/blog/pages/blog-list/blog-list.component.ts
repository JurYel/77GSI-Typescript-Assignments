import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from 'src/app/modules/models/blog.interface';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs$: Observable<Blog[]>;
  constructor(private blogService: BlogService,
              private router: Router
  ) {

    this.blogs$ = this.blogService.getBlogs();

  }

  ngOnInit(): void {
      
    if(this.blogs$.pipe(
      map(data => data.some(item => item.id == 24005))
    ).subscribe(exists => console.log(exists))) {
      console.log("24001 exists");
    }
  }

  checkIfBlogExists = (blogId: number): Observable<boolean> => {
    return this.blogs$.pipe(
      map(blogs => blogs.some(blog => blog.id == blogId))
    );
  }

  executeAddAction = () => {
    this.router.navigate(['/blog/form/add/1']);
  }

  executeDeleteAllAction = () => {
    if(confirm("Are you sure you want to delete all blogs?")){
      this.blogService.deleteAllBlogs();
      location.reload();
    }
  }

  executeEditAction = (blog: Blog) => {
    this.router.navigate(['/blog/form/edit/' + blog.id]);
  }

  executeDeleteAction = (blog: Blog) => {
    if(confirm("Are you sure you want to delete this blog?")){
      if(this.blogService.deleteBlog(blog.id).subscribe()){
        alert(`Blog with id ${blog.id} deleted successfully.`);
      } else {
        alert(`Error: Blog with id ${blog.id} does not exist.`);
      }

      this.blogs$ = this.blogService.getBlogs();
    }
  }
}
