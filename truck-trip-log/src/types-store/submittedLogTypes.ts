
interface DutyTimes {
    [key: string]: number;
}

interface SubmittedLogs {
    driverName: string;
    truckNumber: string;
    carriedProduct: string;
    totalMiles: number;
    date: string;
    drivingHours: DutyTimes;
    offDutyHours: DutyTimes;
    onDutyHours: DutyTimes;
    sleeperBerthHours: DutyTimes;
    isBelowAverage: boolean;
}

export interface SubmittedTripStore {
    logs: SubmittedLogs | null;
    isFormSubmitted: boolean;
    statusMessage: string;
    setLogs: (logs: SubmittedLogs) => void;
    setIsFormSubmitted: (isFormSubmitted: boolean) => void;
    setStatusMessage: (message: string) => void;
    cycleIdHrs: string;
    setCycleIdHrs: (value: string) => void;
    signature: string;
    setSignature: (value: string) => void;
}


