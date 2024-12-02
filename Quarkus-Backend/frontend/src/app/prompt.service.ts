import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface PromptModel {
  id: number,
  content: string
}


@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor(private http: HttpClient) {}

  prompt: PromptModel[] = [];

  getAllPrompts(): Observable<PromptModel[]> {
    return this.http.get<PromptModel[]>('http://localhost:8080/api/andromeda/list/');
  }





}
