import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../models/category.model';
import {BackendUrlService} from '../backend-url/backend-url.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL: string;
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient, private backendURL: BackendUrlService) {
    this.apiURL = backendURL.getBackendUrl();
  }

  fetchCategories(): void {
    this.http.get<Category[]>(`${this.apiURL}category`)
      .pipe(
        tap((category) => this.categoriesSubject.next(category)),
        catchError((error) => {
          console.error('error while fetching categories', error);
          throw error;
        })
      )
      .subscribe();
  }
}
