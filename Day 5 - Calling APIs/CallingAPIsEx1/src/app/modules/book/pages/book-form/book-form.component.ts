import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/modules/models/book.interface';
import { BookService } from '../../services/book.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit{

  authorFormArray: FormArray
  bookForm: FormGroup
  buttonName: string = "";
  booksArray$: Observable<Book[]>;
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
    this.booksArray$ = this.bookService.getBooks();
  }

  capitalize = (action: string) => {
    return action.charAt(0).toUpperCase() + action.slice(1);
  }

  get authors() {
    return this.bookForm.controls['authors'] as FormArray;
  }

  checkIfBookExists = (bookId: number): Observable<boolean> => {
    return this.booksArray$.pipe(
      map(books => books.some(book => book.id == bookId))
    );
  }

  getBookById = (bookId: number): Observable<Book | undefined> => {
    return this.booksArray$.pipe(
      map(books => books.find(book => book.id == bookId))
    );
  }
 
  ngOnInit(): void {
      this.activatedRoute.params.subscribe((data) => {
        this.buttonName = this.capitalize(data['action']) + " Book";
        this.bookForm.reset();

        if(data['action'] === 'edit') {
          this.getBookById(parseInt(data['id'])).subscribe(book => {

            // Updated values individually (had issues with setValue)
            this.bookForm.patchValue({id: book?.id ?? null});
            this.bookForm.patchValue({name: book?.name ?? null});
            this.bookForm.patchValue({isbn: book?.isbn ?? null});
            
            // Using get method, update authors FormArray
            this.authors.clear();
            
            let shouldContinue = true;
            book?.authors.forEach((author) => {
              if(shouldContinue) {
                if(author == undefined || author === '') {
                  shouldContinue = false;
                } else {
                  this.authors.push(new FormControl(author));
                }
              }
            })

            this.authorFormArray = this.bookForm.controls['authors'] as FormArray;
            
            this.bookForm.get('id')?.disable();
           
          })
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
    } else {
      this.authorFormArray.removeAt(index);
    }
  }

  onSubmit = () => {
    const newBook: Book = this.bookForm.getRawValue();

    if(this.buttonName.includes('Edit')) {
      this.checkIfBookExists(newBook.id).subscribe(exists => {
        if(exists) {
          this.bookService.updateBook(newBook).subscribe({
            error: error => {
              console.error("Put error: ", error);
            }
          });

          alert(`The book ${newBook.name} with id ${newBook.id} has been updated.`);
          this.bookForm.reset();
          this.router.navigate(['/book']);
        } else {
          alert(`Error: Book with id ${newBook.id} does not exist.`);
        }
      });
    } else {
      this.checkIfBookExists(newBook.id).subscribe(exists => {
        if(!exists) {
          this.bookService.createBook(newBook).subscribe({
            error: error => {
              console.error("Post Error: ", error);
            }
          });
          
          alert("New book added successfully!");
          this.router.navigate(['/book']);
        } else {
          alert("Book with id " + newBook.id + " already exists.");
        }
      });
    }
  }
}
