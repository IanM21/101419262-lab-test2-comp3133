import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { fetchSpaceXDataById } from '../../services/apiService';
import { SpaceXApiResponse } from '../../models/API';

@Component({
  selector: 'app-mission-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-details.component.html',
  styleUrl: './mission-details.component.css'
})
export class MissionDetailsComponent implements OnInit {
  mission: SpaceXApiResponse | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const id = params['id'];
      
      if (!id) {
        this.error = 'No mission ID provided';
        this.loading = false;
        return;
      }

      try {
        this.loading = true;
        this.mission = await fetchSpaceXDataById(id);
        this.loading = false;
      } catch (err) {
        this.error = `Failed to load mission with ID: ${id}`;
        this.loading = false;
        console.error('Error loading mission details:', err);
      }
    });
  }


  goBack() {
    this.router.navigate(['/']);
  }
}