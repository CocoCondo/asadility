import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRoomComponent } from './crear-room.component';

describe('CrearRoomComponent', () => {
  let component: CrearRoomComponent;
  let fixture: ComponentFixture<CrearRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearRoomComponent]
    });
    fixture = TestBed.createComponent(CrearRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
