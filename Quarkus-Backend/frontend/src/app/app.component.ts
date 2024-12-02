import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PromptModel, PromptService} from './prompt.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Andromeda';

  private _prompts: PromptModel[] = []

  constructor(public promptservice: PromptService) {}

  ngOnInit(): void {
    this.promptservice.getAllPrompts().subscribe((prompts: PromptModel[]) => {
      this._prompts = prompts;
    });
  }

  get prompts(): PromptModel[] {
    return this._prompts;
  }

}
