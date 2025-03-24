import { create } from 'zustand';
import { SubmittedTripStore } from '../types-store/submittedLogTypes';

export const useDriverStore = create<SubmittedTripStore>((set) => ({
    // Driver logs state
    logs: null,
    isFormSubmitted: false,
    statusMessage: '',
    cycleIdHrs: '',
    signature: "",
    setSignature: (signature) => set({ signature }),
    setCycleIdHrs: (cycleIdHrs) => set({ cycleIdHrs }),
    setLogs: (logs) => set({ logs }),
    setIsFormSubmitted: (isFormSubmitted) => set({ isFormSubmitted }),
    setStatusMessage: (message) => set({ statusMessage: message }),
}));
