import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
private esercizio:string='/esercizio'
  constructor(private http:HttpClient) { }
}
