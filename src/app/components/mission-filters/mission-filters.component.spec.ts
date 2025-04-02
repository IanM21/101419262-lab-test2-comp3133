import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionFiltersComponent } from './mission-filters.component';

describe('MissionFiltersComponent', () => {
  let component: MissionFiltersComponent;
  let fixture: ComponentFixture<MissionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
