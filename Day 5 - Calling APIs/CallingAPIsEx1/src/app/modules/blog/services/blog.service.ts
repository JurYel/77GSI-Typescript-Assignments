import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, forkJoin, map, mergeMap, Observable, tap } from 'rxjs';
import { Blog } from '../../models/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  serverUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getBlogs = (): Observable<Blog[]> => {
    
    return this.http.get<Blog[]>(`${this.serverUrl}/blogs`);
  }

  
  createBlog = (blog: Blog) => {
    return this.http.post<Blog>(`${this.serverUrl}/blogs`, blog).pipe(
      tap(x => console.log('created user: ', x)));
  }

  updateBlog = (blog: Blog) => {
    return this.http.put<Blog>(`${this.serverUrl}/blogs/${blog.id}`, blog).pipe(
      tap(x => console.log("updating ", x))
    );
  }

  deleteBlog = (id: any) => {
    return this.http.delete<Blog>(`${this.serverUrl}/blogs/${id}`).pipe(
      tap(x => console.log("deleting: ", x))
    );
  }

  deleteAllBlogs = () => {
    let blogs$ = this.getBlogs();

    return blogs$.pipe(
      mergeMap((blogs) => 
        
        forkJoin(
          blogs.map((blog) => this.http.delete<Blog>(`${this.serverUrl}/blogs/${blog.id}`))
        )
      )
    );
  }
}


