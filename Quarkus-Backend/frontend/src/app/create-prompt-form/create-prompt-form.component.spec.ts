import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePromptFormComponent } from './create-prompt-form.component';

describe('CreatePromptFormComponent', () => {
  let component: CreatePromptFormComponent;
  let fixture: ComponentFixture<CreatePromptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePromptFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePromptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
