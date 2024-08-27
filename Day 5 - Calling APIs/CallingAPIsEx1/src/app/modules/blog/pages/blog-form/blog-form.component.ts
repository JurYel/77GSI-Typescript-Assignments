import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from 'src/app/modules/models/blog.interface';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit{

  commentFormArray: FormArray
  blogForm: FormGroup;
  buttonName: string = "";
  blogsArray$: Observable<Blog[]>;

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
    this.blogsArray$ = this.blogService.getBlogs()
  }

  addComment = () => {
    this.commentFormArray.controls.push(new FormControl(''));
  }

  removeComment = (index: number) => {
    if(this.commentFormArray.at(index).getRawValue() !== ''){
      if(confirm("Are you sure to want to remove this comment?")) {
        this.commentFormArray.removeAt(index);
      }
    } else {
      this.commentFormArray.removeAt(index);
    }
  }

  capitalize = (action: string) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  }

  checkIfBlogExists = (blogId: number): Observable<boolean> => {
    return this.blogsArray$.pipe(
      map(blogs => blogs.some(blog => blog.id == blogId))
    );
  }

  getBlogById = (blogId: number): Observable<Blog | undefined> => {
    return this.blogsArray$.pipe(
      map(blogs => blogs.find(blog => blog.id == blogId))
    );
  } 


  get comments() {
    return this.blogForm.controls['comments'] as FormArray;
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((data) => {
        this.buttonName = this.capitalize(data['action']) + " Blog";
        this.blogForm.reset();

        if(data['action'] === 'edit'){
          this.getBlogById(parseInt(data['id'])).subscribe(blog => {

          // Update values individually (had issues with setValue)
          this.blogForm.patchValue({id: blog?.id ?? null});
          this.blogForm.patchValue({title: blog?.title ?? null});
          this.blogForm.patchValue({description: blog?.description ?? null});
          this.blogForm.patchValue({author: blog?.author ?? null});

          // Using get method, update comments array in FormGroup
          this.comments.clear();
    
          let shouldContinue = true;
          blog?.comments.forEach((comment) => {
            if(shouldContinue) {
              if(comment == undefined || comment === ''){
                shouldContinue = false;
              } else {
                this.comments.push(new FormControl(comment));
              }
            }
          });

          // Update the comments form array
          this.commentFormArray = this.blogForm.controls['comments'] as FormArray;
          
          // Disable id field, must be not editable to avoid id conflicts
          this.blogForm.get('id')?.disable();
          });
        }
      });
  }

  // Handle on submit event
  onSubmit = () => {
    const newBlog: Blog = this.blogForm.getRawValue();

    if(this.buttonName.includes('Add')) {

      this.checkIfBlogExists(newBlog.id).subscribe(exists => {
        if(!exists) {
          this.blogService.createBlog(newBlog).subscribe({
            error: error => {
              console.error("Post Error: ", error);
            }
          });
          alert("New blog added successfully!");
          this.router.navigate(['/blog']);
        } else {
          alert("Blog with id " + newBlog.id + " already exists.");
        }
      })
    } else {
      this.checkIfBlogExists(newBlog.id).subscribe(exists => {
        if(exists) {
          this.blogService.updateBlog(newBlog).subscribe({
            error: error => {
              console.error("Put Error: ", error);
            }
          });
          alert(`The blog ${newBlog.title} with id ${newBlog.id} has been updated.`);
          this.blogForm.reset();
          this.router.navigate(['/blog']);
        } else {
          alert(`Error: Blog with id ${newBlog.id} does not exist.`);
        }
      })
    }
    
  }
}
