import {

    createAuditLogRepo,
    getAuditLogsRepo,
    getAuditLogByIdRepo,
    getAuditLogsByUserRepo,
    deleteAuditLogRepo

}
    from "./auditLog.repository";




export const createAuditLogService =
    (data: any) => {


        return createAuditLogRepo(data);


    };





export const getAuditLogsService =
    () => {


        return getAuditLogsRepo();


    };





export const getAuditLogByIdService =
    (id: string) => {


        return getAuditLogByIdRepo(id);


    };





export const getUserAuditLogsService =
    (userId: string) => {


        return getAuditLogsByUserRepo(userId);


    };





export const deleteAuditLogService =
    (id: string) => {


        return deleteAuditLogRepo(id);


    };