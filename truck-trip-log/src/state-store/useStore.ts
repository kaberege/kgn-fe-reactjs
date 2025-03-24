import { create } from 'zustand';
import { TripState } from '../types-store/types';

  // Set global states
export const useTripStore = create<TripState>((set) => ({
    currentLocation: '',
    pickupLocation: '',
    dropoffLocation: '',
    currentCycleUsed: '',
    currentLocationName: '',
    pickupLocationName: '',
    dropoffLocationName: '',
    setTripDetails: (tripData) => set(tripData),
}));
