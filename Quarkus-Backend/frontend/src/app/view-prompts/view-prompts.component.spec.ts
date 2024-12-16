import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromptsComponent } from './view-prompts.component';

describe('ViewPromptsComponent', () => {
  let component: ViewPromptsComponent;
  let fixture: ComponentFixture<ViewPromptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPromptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPromptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
