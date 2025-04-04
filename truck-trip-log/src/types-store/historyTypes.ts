
// Defines types for history logs (retrieved data from the database)
export interface TripLog {
  id: number;
  created_at: string;
  updated_at: string;
  current_cycle_used: number;
  route_estimated_distance: number;
  route_estimated_duration: number;
  current_location_name: string;
  pickup_location_name: string;
  dropoff_location_name: string;
  truck_number: string;
  carried_product_name: string;
  total_daily_miles: number;
  duty_status: string;
  driving_hours_0_11: number;
  driving_hours_12_17: number;
  driving_hours_18_23: number;
  off_duty_hours_0_11: number;
  off_duty_hours_12_17: number;
  off_duty_hours_18_23: number;
  on_duty_hours_0_11: number;
  on_duty_hours_12_17: number;
  on_duty_hours_18_23: number;
  sleeper_berth_hours_0_11: number;
  sleeper_berth_hours_12_17: number;
  sleeper_berth_hours_18_23: number;
}

  // Defines types for history logs and driver's name
export interface TripLogsResponse {
  name: string;
  trip_logs: TripLog[];
}