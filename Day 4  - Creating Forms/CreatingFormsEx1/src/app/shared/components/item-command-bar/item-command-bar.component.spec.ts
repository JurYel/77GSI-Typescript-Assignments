import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCommandBarComponent } from './item-command-bar.component';

describe('ItemCommandBarComponent', () => {
  let component: ItemCommandBarComponent;
  let fixture: ComponentFixture<ItemCommandBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCommandBarComponent]
    });
    fixture = TestBed.createComponent(ItemCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
