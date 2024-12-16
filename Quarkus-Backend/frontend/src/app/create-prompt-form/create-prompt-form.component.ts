import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../prompt.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-prompt-form',
  templateUrl: './create-prompt-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./create-prompt-form.component.css']
})
export class CreatePromptFormComponent {

  newPrompt = {
    content: '',
    username: '',
    userId: 0,
  };

  url: string = 'http://localhost:8080/api/andromeda/addPrompt';

  constructor(public promptservice: PromptService, private router: Router) {}

  goBack() {
    this.router.navigate(['']);
  }


  setUserId(username: string) {
    switch (username) {
      case 'Brionka':
        this.newPrompt.userId = 2;
        break;
      case 'Friedolin':
        this.newPrompt.userId = 3;
        break;
      case 'Ursula':
        this.newPrompt.userId = 4;
        break;
      default:
        this.newPrompt.userId = 0;
    }
  }

  // Methode zum Absenden des Formulars
  submitPrompt() {
    this.setUserId(this.newPrompt.username)
    if (!this.newPrompt.content || this.newPrompt.userId === 0) {
      console.error('Fehler: Bitte alle Felder ausfüllen.');
      return;
    }

    this.promptservice.addPrompt(this.newPrompt, this.url).subscribe(
      (response) => {
        console.log('Prompt erfolgreich gesendet!', response);
      },
      (error) => {
        console.error('Fehler beim Senden des Prompts:', error);
      }
    );
  }
}
