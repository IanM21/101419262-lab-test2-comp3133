export interface SpaceXApiResponse {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  details?: string;
  rocket: {
    rocket_name: string;
    rocket_type: string;
    second_stage?: {
      payloads?: Array<{
        payload_id: string;
        orbit_params?: {
          reference_system?: string;
        };
      }>;
    };
  };
  launch_site?: {
    site_name: string;
    site_name_long: string;
  };
  launch_date_utc?: string;
  launch_success?: boolean;
  launch_failure_details?: {
    time: number;
    altitude: number;
    reason: string;
  };
  crew?: string[];
  ships?: string[];
  timeline?: {
    webcast_liftoff?: number;
  };
  links: {
    mission_patch_small?: string;
    article_link?: string;
    wikipedia?: string;
    video_link?: string;
  };
}