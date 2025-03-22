//This TripDetails interface specifies the types for: 
// currentLocation, pickupLocation, dropoffLocation, and currentCycleUsed
export interface TripDetails {
    currentLocation: string;
    pickupLocation: string;
    dropoffLocation: string;
    currentCycleUsed: string;
  }

   // Defining coords of searched location
 export  interface LocationData {
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