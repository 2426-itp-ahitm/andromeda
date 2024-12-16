import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface PromptModel {
  id: number,
  content: string
  user: UserModel
}

interface PromptDTO {
  userId: number;
  content: string;
}

export interface UserModel {
  id: number,
  username: string
}


@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor(private http: HttpClient) {}

  prompt: PromptModel[] = [];

  getAllPrompts(): Observable<PromptModel[]> {
    return this.http.get<PromptModel[]>('http://localhost:8080/api/andromeda/prompts/listAll');
  }

  addPrompt(promptDTO: PromptDTO, url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, promptDTO, { headers });
  }

}
