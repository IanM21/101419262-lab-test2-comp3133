import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchSpaceXData } from '../../services/apiService';
import { SpaceXApiResponse } from '../../models/API';
import { MissionFilterComponent } from '../mission-filter/mission-filter.component';

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule, MissionFilterComponent],
  templateUrl: './mission-list.component.html',
  styleUrl: './mission-list.component.css'
})
export class MissionListComponent implements OnInit {
  allMissions: SpaceXApiResponse[] = [];
  filteredMissions: SpaceXApiResponse[] = [];
  loading: boolean = true;
  error: string | null = null;
  yearFilter: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      this.loading = true;
      this.allMissions = await fetchSpaceXData();
      this.filteredMissions = [...this.allMissions];
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load mission data';
      this.loading = false;
      console.error('Error loading missions:', err);
    }
  }

  onYearFilterChange(year: string) {
    this.yearFilter = year;
    this.applyYearFilter();
  }

  private applyYearFilter() {
    if (!this.yearFilter) {
      this.filteredMissions = [...this.allMissions];
      return;
    }

    this.filteredMissions = this.allMissions.filter(mission => 
      mission.launch_year.includes(this.yearFilter)
    );
  }

  viewMissionDetails(mission: SpaceXApiResponse) {
    this.router.navigate(['/mission', mission.flight_number]);
  }
}