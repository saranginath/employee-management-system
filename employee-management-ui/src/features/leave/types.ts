export type LeaveType =
    | "casual"
    | "sick"
    | "earned"
    | "unpaid";


export type LeaveStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "cancelled";



export interface Employee {

    _id: string;

    firstName: string;

    lastName: string;

    email: string;

}



export interface Leave {


    _id: string;


    employee: Employee | string;


    startDate: string;


    endDate: string;


    type: LeaveType;


    reason: string;


    status: LeaveStatus;


    approvedBy?: Employee | string | null;


    rejectionReason?: string | null;


    createdAt: string;


    updatedAt: string;

}





export interface ApplyLeaveRequest {


    startDate: string;


    endDate: string;


    type: LeaveType;


    reason: string;


}





export interface UpdateLeaveRequest {


    startDate?: string;


    endDate?: string;


    type?: LeaveType;


    reason?: string;


}





export interface RejectLeaveRequest {


    id: string;


    rejectionReason: string;

}





export interface LeaveBalance {


    casual: {

        allocated: number;

        used: number;

        remaining: number;

    };


    sick: {

        allocated: number;

        used: number;

        remaining: number;

    };


    earned: {

        allocated: number;

        used: number;

        remaining: number;

    };


    unpaid?: {

        allocated: number;

        used: number;

        remaining: number;

    };

}