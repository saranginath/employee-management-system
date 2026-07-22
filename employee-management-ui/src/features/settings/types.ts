export interface Settings {

    _id: string;

    companyName: string;

    companyLogo?: string;

    companyEmail?: string;

    companyPhone?: string;

    address?: string;


    currency: string;

    timezone: string;


    workingHours: {

        startTime: string;

        endTime: string;

        workingDays: string[];

        weeklyOff: string[];

        lateAfterMinutes: number;

    };


    leavePolicy: {

        casualLeave: number;

        sickLeave: number;

        earnedLeave: number;

        carryForward: boolean;

        maxCarryForward: number;

    };


    notifications: {

        email: boolean;

        push: boolean;

    };


    emailSettings: {

        smtpHost: string;

        smtpPort: number;

        secure: boolean;

        username: string;

        password: string;

        senderName: string;

        senderEmail: string;

    };

}