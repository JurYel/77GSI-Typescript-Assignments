import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, tap } from 'rxjs';
import { Book } from '../../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  serverUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getBooks = (): Observable<Book[]> => {

    return this.http.get<Book[]>(`${this.serverUrl}/books`);
  }

  createBook = (book: Book) => {

    return this.http.post<Book>(`${this.serverUrl}/books`, book).pipe(
      tap(x => console.log("creating: ", x))
    );
  }

  updateBook = (book: Book) => {
    return this.http.put<Book>(`${this.serverUrl}/books/${book.id}`, book).pipe(
      tap(x => console.log("updating: ", x))
    );
  }

  deleteBook = (id: any) => {
    return this.http.delete<Book>(`${this.serverUrl}/books/${id}`).pipe(
      tap(x => console.log("deleting: ", x))
    );
  }

  deleteAllBooks = () => {
    let books$ = this.getBooks();
    return books$.pipe(
      mergeMap((books) => 
        // Using `forkJoin() to execute all operations in parallel
        forkJoin(
          books.map((book) => this.http.delete<Book>(`${this.serverUrl}/books/${book.id}`))
        )
      )
    );
  }
}
