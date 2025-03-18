//This TripDetails interface specifies the types for: 
// currentLocation, pickupLocation, dropoffLocation, and currentCycleUsed
export interface TripDetails {
    currentLocation: string;
    pickupLocation: string;
    dropoffLocation: string;
    currentCycleUsed?: string;
  }