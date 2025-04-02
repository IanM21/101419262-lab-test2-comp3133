import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mission-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mission-filter.component.html',
  styleUrl: './mission-filter.component.css'
})
export class MissionFilterComponent {
  @Output() yearChange = new EventEmitter<string>();
  yearFilter: string = '';

  onYearFilterChange() {
    this.yearChange.emit(this.yearFilter);
  }

  clearFilter() {
    this.yearFilter = '';
    this.yearChange.emit('');
  }
}