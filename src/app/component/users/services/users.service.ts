import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ListUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  listUserAPI(): Observable<any> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/comments')
      .pipe(tap((res: Response) => res));
  }
  
  getUserAPI(idUser:number): Observable<any> {
    return this.http
      .get<any>(`https://jsonplaceholder.typicode.com/comments/${idUser}`)
      .pipe(tap((res: Response) => res));
  }

  
  searchUserAPI(email:string): Observable<any> {
    return this.http
      .get<any>(`https://jsonplaceholder.typicode.com/comments?email=${email}`)
      .pipe(tap((res: Response) => res));
  }

  deleteUserAPI(idUser:string): Observable<any> {
    return this.http
      .delete<any>(`https://jsonplaceholder.typicode.com/comments/${idUser}`)
      .pipe(tap((res: Response) => res));
  }

  updateUserAPI(user:ListUser): Observable<any> {
    return this.http
      .put<any>(`https://jsonplaceholder.typicode.com/comments/${user.id}`, user)
      .pipe(tap((res: Response) => res));
  }

  createUserAPI(user:ListUser): Observable<any> {
    return this.http
      .post<any>(`https://jsonplaceholder.typicode.com/comments`, user)
      .pipe(tap((res: Response) => res));
  }


}
