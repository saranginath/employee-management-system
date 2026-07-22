import { Document, Types } from "mongoose";


export interface IAuditLog extends Document {
    user: Types.ObjectId;
    action:
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "LOGIN"
    | "LOGOUT";
    module: string;
    description: string;
    oldData?: Record<string, any>;
    newData?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
}