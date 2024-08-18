import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from 'src/app/modules/models/blog.interface';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit{

  commentFormArray: FormArray
  blogForm: FormGroup;
  buttonName: string = "";
  blogsArray: Blog[];
  constructor (private fb: FormBuilder,
               private blogService: BlogService,
               private activatedRoute: ActivatedRoute,
               private router: Router
  ) {
    this.blogForm = this.fb.group({
      id: [24001, [Validators.required]],
      title: ["RAG Architecture: Advanced RAG", [Validators.required, Validators.minLength(2)]],
      description: ["Advanced RAG for better LLM generation", [Validators.required, Validators.minLength(5)]],
      author: ["Andrew Karpathy", [Validators.required, Validators.minLength(2)]],
      comments: this.fb.array([
        "Awesome work Andrew!",
        "Exceptional!",
        "Interesting, I'll give it a try.",
        "Oh wow, never thought about this."
      ])
    });
    this.commentFormArray = this.blogForm.controls['comments'] as FormArray;
    this.blogsArray = this.blogService.getBlogsArray();
  }

  addComment = () => {
    this.commentFormArray.controls.push(new FormControl(''));
  }

  capitalize = (action: string) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  }

  get comments() {
    return this.blogForm.controls['comments'] as FormArray;
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((data) => {
        this.buttonName = this.capitalize(data['action']) + " Blog";
        this.blogForm.reset();

        if(data['action'] === 'edit') {
          const blog: Blog | undefined = this.blogsArray.find(item => item.id == parseInt(data['id']));

          // Update values individually (had issues with setValue)
          this.blogForm.patchValue({id: blog?.id ?? null});
          this.blogForm.patchValue({title: blog?.title ?? null});
          this.blogForm.patchValue({author: blog?.author ?? null});

          // Using get method, update comments array in FormGroup
          this.comments.clear();
          this.comments.push(new FormControl(blog?.comments[0] ?? null));
          this.comments.push(((!blog?.comments[1])? new FormControl('') : new FormControl(blog?.comments[1])) ?? null);
          this.comments.push(((!blog?.comments[2])? new FormControl('') : new FormControl(blog?.comments[2])) ?? null);
          this.comments.push(((!blog?.comments[3])? new FormControl('') : new FormControl(blog?.comments[3])) ?? null);
          this.comments.push(((!blog?.comments[4])? new FormControl('') : new FormControl(blog?.comments[4])) ?? null);
        
          // Update the comments form array
          this.commentFormArray = this.blogForm.controls['comments'] as FormArray;
          
          // Disable id field, must be not editable to avoid id conflicts
          this.blogForm.get('id')?.disable();
        }
        
      });
  }

  // Handle on submit event
  onSubmit = () => {
    const updatedBlog: Blog = this.blogForm.getRawValue();
    if(this.buttonName.includes('Edit')) {
      if(this.blogService.editBlog(updatedBlog)) {
        alert(`The book ${updatedBlog.title} with id ${updatedBlog.id} has been updated.`);
        this.blogForm.reset();
        this.router.navigate(['/blog']);
      } else {
        alert(`Error: Blog with id ${updatedBlog.id} does not exist.`);
      }
    } else {
      console.log("Adding blog: ", updatedBlog);

      if(this.blogService.addBlog(updatedBlog)){
        alert("New blog added successfully!");
        this.router.navigate(['/blog']);
      } else {
        alert("Blog with id " + updatedBlog.id + " already exists.");
      }
    }
    
  }
}
