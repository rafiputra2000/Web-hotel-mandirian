export interface Book {
    id: number;
    status: "reserved" | "checked-in" | "checked-out";
    roomNumber: string;
    duration: number;
    guestCount: number;
    reservee: Guest;
}

export interface Guest {
    id: number;
    name: string;
    email: string;
    phone: string;
}

