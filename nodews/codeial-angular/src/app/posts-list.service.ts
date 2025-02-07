import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsListService {

  constructor(private http: HttpClient) {
    
  }

  getPosts(): Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/v1/posts');
  }
}
