import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {PromptModel, PromptService} from '../prompt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-prompts',
    imports: [
        NgForOf
    ],
  templateUrl: './view-prompts.component.html',
  styleUrl: './view-prompts.component.css'
})
export class ViewPromptsComponent {
  title = 'Andromeda';

  private _prompts: PromptModel[] = []

  constructor(public promptservice: PromptService, private router: Router) {}

  createNewPrompt() {
    this.router.navigate(['/createPrompt']);
  }

  ngOnInit(): void {
    this.promptservice.getAllPrompts().subscribe((prompts: PromptModel[]) => {
      this._prompts = prompts;
    });
  }

  get prompts(): PromptModel[] {
    return this._prompts;
  }

}
