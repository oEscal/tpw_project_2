import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayersGameComponent } from './add-players-game.component';

describe('AddPlayersGameComponent', () => {
  let component: AddPlayersGameComponent;
  let fixture: ComponentFixture<AddPlayersGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayersGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayersGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
