import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {CreatePromptFormComponent} from './create-prompt-form/create-prompt-form.component';
import {ViewPromptsComponent} from './view-prompts/view-prompts.component';

export const routes: Routes = [
  { path: '', component: ViewPromptsComponent },
  { path: 'createPrompt', component: CreatePromptFormComponent }
];
