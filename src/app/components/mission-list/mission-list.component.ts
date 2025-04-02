import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchSpaceXData, fetchSpaceXDataById } from '../../services/apiService';
import { SpaceXApiResponse } from '../../models/API';

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-list.component.html',
  styleUrl: './mission-list.component.css'
})
export class MissionListComponent implements OnInit {
  missions: SpaceXApiResponse[] = [];
  selectedMission: SpaceXApiResponse | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      this.loading = true;
      this.missions = await fetchSpaceXData();
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load mission data';
      this.loading = false;
      console.error('Error loading missions:', err);
    }
  }

  async selectMission(mission: SpaceXApiResponse) {
    try {
      if (this.selectedMission?.flight_number === mission.flight_number) {
        this.selectedMission = null;
        return;
      }
      
      const fullMissionData = await fetchSpaceXDataById(mission.flight_number.toString());
      this.selectedMission = fullMissionData;
    } catch (err) {
      console.error('Error fetching mission details:', err);
    }
  }

  closeMissionDetails() {
    this.selectedMission = null;
  }

  viewMissionDetails(mission: SpaceXApiResponse) {
    this.router.navigate(['/mission', mission.flight_number]);
  }
}