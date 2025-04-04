//This TripDetails interface specifies the types for: 
// currentLocation, pickupLocation, dropoffLocation, and currentCycleUsed
export interface TripDetails {
  currentLocation: string;
  pickupLocation: string;
  dropoffLocation: string;
  currentCycleUsed: string;
}

// Defining coords of searched location
export interface LocationData {
  lat: string;
  lng: string;
}

// Types for Trip details (useZustand.ts)
export interface TripState {
  currentLocation: string;
  pickupLocation: string;
  dropoffLocation: string;
  currentCycleUsed: string;
  currentLocationName: string;
  pickupLocationName: string;
  dropoffLocationName: string;
  setTripDetails: (tripData: {
    currentLocation: string;
    pickupLocation: string;
    dropoffLocation: string;
    currentCycleUsed: string;
    currentLocationName: string;
    pickupLocationName: string;
    dropoffLocationName: string;
  }) => void;
}

// Define prop types for RouteDetails
export interface RouteDetailsProps {
  error: string | null;
  loading: boolean;
  fetchRoute: () => void;
  routeDistance: number | null;
  routeDuration: number | null;
  currentCycleUsed: string;
}

// Defines hours worked in different time periods of the day
export interface DutyHours {
  '0:00-11:59': number; // Hours worked from 0:00 to 11:59
  '12:00-17:59': number; // Hours worked from 12:00 to 17:59
  '18:00-23:59': number; // Hours worked from 18:00 to 23:59
  [key: string]: number; // Allows additional time periods
}

// Defines the duty hours for driving, off-duty, and on-duty
export interface DutyTimes {
  drivingHours: DutyHours; // Driving hours for different periods
  offDutyHours: DutyHours; // Off-duty hours for different periods
  onDutyHours: DutyHours; // On-duty hours for different periods
  sleeperBerthHours: DutyHours; //  Sleeper-BerthHours hours for different periods
  [key: string]: DutyHours; // Allows additional categories (e.g., 'driving', 'offDuty')
}

// Holds the basic information about a driver
export interface DriverDetails {
  name: string; // Driver's name
  truckNumber: string; // Driver's truck number
  product: string; // Product being carried
  miles: number; // Total miles for today
}

