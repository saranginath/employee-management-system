export interface Leave {
  _id: string;

  type: "casual" | "sick" | "earned" | "unpaid";

  startDate: string;

  endDate: string;

  reason: string;

  status: "pending" | "approved" | "rejected" | "cancelled";

  employee?: {
    firstName: string;

    lastName: string;

    email: string;
  };

  rejectionReason?: string;
}
