import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from 'src/app/modules/models/blog.interface';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {

  blogsArray: Blog[];
  index: number = -1;
  disableInput = false;
  blogForm: any = {
    blog_id: '',
    title: '',
    description: '',
    author: '',
    comment1: '',
    comment2: '',
    comment3: '',
    comment4: '',
    comment5: '',
  }

  constructor (private blogService: BlogService) {
    this.blogsArray = this.blogService.getBlogsArray();
  }

  executeEdit = (blog: Blog) => {
    console.log("Edit blog: ", blog.id);
    this.index = this.blogsArray.findIndex(blogItem => blogItem.id == blog.id);
    this.blogForm = {
      blog_id: this.blogsArray[this.index].id,
      title: this.blogsArray[this.index].title,
      description: this.blogsArray[this.index].description,
      author: this.blogsArray[this.index].author,
      comment1: this.blogsArray[this.index].comments[0],
      comment2: (!this.blogsArray[this.index].comments[1]) ? '' : this.blogsArray[this.index].comments[1],
      comment3: (!this.blogsArray[this.index].comments[2]) ? '' : this.blogsArray[this.index].comments[2],
      comment4: (!this.blogsArray[this.index].comments[3]) ? '' : this.blogsArray[this.index].comments[3],
      comment5: (!this.blogsArray[this.index].comments[4]) ? '' : this.blogsArray[this.index].comments[4],
    }

    if(!this.disableInput){
      this.disableInput = !this.disableInput;
    }
  }

  executeDelete = (blog: Blog) => {
    console.log("Deleting book: ", blog.id);

    if(this.blogService.deleteBlog(blog.id)) {
      console.log(`Blog with id ${blog.id} deleted successfully!`);
    } else{
      console.error(`Error: Blog with id ${blog.id} does not exist.`);
    }

    this.blogsArray = this.blogService.getBlogsArray();
  }

  clearBlogForm = () => {
    this.blogForm = {
      blog_id: '',
      title: '',
      description: '',
      author: '',
      comment1: '',
      comment2: '',
      comment3: '',
      comment4: '',
      comment5: '',
    }
  }

  handleEditAction = () => {

    if(this.blogService.editBlog(this.blogForm)){
      console.log("Blog " + this.blogForm.blog_id + " editted successfully!");
    } else{
      alert(`Error: Blog with id ${this.blogForm.blog_id} does not exist.`);
    }

    this.disableInput = !this.disableInput;
    this.clearBlogForm();
    this.index = -1;
  }

  handleAddAction = () => {
  
    console.warn("Form submmited: ", this.blogForm);
  }
}
