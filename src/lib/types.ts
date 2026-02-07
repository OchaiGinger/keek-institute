export type ApiResponse = {
  status: "success" | "error";
  message: string;
};

export enum AccountStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export interface Student {
  id: string;
  userId: string;
  registrationNumber?: string | null;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string; // From the User relation
  onboarded: boolean;
  status: AccountStatus;
  // Add other fields as needed
}
