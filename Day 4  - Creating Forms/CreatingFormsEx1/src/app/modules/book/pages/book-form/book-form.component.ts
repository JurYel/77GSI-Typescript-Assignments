import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/modules/models/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit{

  authorFormArray: FormArray
  bookForm: FormGroup
  buttonName: string = "";
  booksArray: Book[];
  constructor (private fb: FormBuilder,
               private bookService: BookService,
               private activatedRoute: ActivatedRoute,
               private router: Router
  ) {
    this.bookForm = this.fb.group({
      id: [1001, [Validators.required]],
      name: ['Atomic Habits', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([
        new FormControl('James Clear'),
        new FormControl(''),
        new FormControl('')
      ]),
      isbn: ['97589181', Validators.required]
    })
    this.authorFormArray = this.bookForm.controls['authors'] as FormArray;
    this.booksArray = this.bookService.getBooksArray();
  }

  capitalize = (action: string) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  }

  get authors() {
    return this.bookForm.controls['authors'] as FormArray;
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((data) => {
        this.buttonName = this.capitalize(data['action']) + " Book";
        this.bookForm.reset();

        if(data['action'] === 'edit') {
          const book: Book | undefined = this.booksArray.find(item => item.id == parseInt(data['id']));
          // console.log(book);
          
          // this.bookForm.setValue({
          //   id: book?.id ?? null,
          //   name: book?.name ?? null,
          //   authors: this.fb.array([
          //     new FormControl(book?.authors[0] ?? null),
          //     ((!book?.authors[1])? new FormControl('') : new FormControl(book.authors[1])) ?? null,
          //     ((!book?.authors[2])? new FormControl('') : new FormControl(book.authors[2])) ?? null
          //   ]),
          //   isbn: book?.isbn ?? null
          // })

          // Update values individually (had issues with setValue)
          this.bookForm.patchValue({id: book?.id ?? null});
          this.bookForm.patchValue({name: book?.name ?? null});
          this.bookForm.patchValue({isbn: book?.isbn ?? null});
          
          // Using get method, update authors FormArray
          this.authors.clear();
          this.authors.push(new FormControl(book?.authors[0] ?? null));
          this.authors.push(((!book?.authors[1])? new FormControl('') : new FormControl(book.authors[1])) ?? null);
          this.authors.push(((!book?.authors[2])? new FormControl('') : new FormControl(book.authors[2])) ?? null);
          // this.bookForm.patchValue({
          //   authors: this.fb.array([
          //     new FormControl(book?.authors[0] ?? null),
          //     ((!book?.authors[1])? new FormControl('') : new FormControl(book.authors[1])) ?? null,
          //     ((!book?.authors[2])? new FormControl('') : new FormControl(book.authors[2])) ?? null
          //   ])
          // });
          this.authorFormArray = this.bookForm.controls['authors'] as FormArray;
          
          this.bookForm.get('id')?.disable();
        }
        
      });

      // console.log(this.activatedRoute.snapshot.params);
  }

  addAuthor = () => {
    this.authorFormArray.controls.push(new FormControl(''));
  }

  removeAuthor = (index: number) => {
    if(this.authorFormArray.at(index).getRawValue() !== ''){
      if(confirm("Are you sure you want to remove this author?")){
        this.authorFormArray.removeAt(index);
      }
    }
  }

  onSubmit = () => {
    const updatedBook: Book = this.bookForm.getRawValue();

    if(this.buttonName.includes('Edit')) {
      if(this.bookService.editBook(updatedBook)){
        alert(`The book ${updatedBook.name} with id ${updatedBook.id} has been updated.`);
        this.bookForm.reset();
        this.router.navigate(['/book']);
      } else {
        alert(`Error: Book with id ${updatedBook.id} does not exist.`);
      }
    } else {
      console.log("Adding new book");

      if(this.bookService.addBook(updatedBook)) {
        alert("New book added successfully!");
        this.router.navigate(['/book']);
      } else{
        alert("Book with id " + updatedBook.id + " already exists.");
      }
    }
    
  }
}
