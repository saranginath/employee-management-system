import { Request, Response } from "express";
import {
    getAuditLogsService, getAuditLogByIdService, getUserAuditLogsService, deleteAuditLogService
} from "./auditLog.service";

export const getAuditLogsController = async (req: Request, res: Response
) => {
    const logs = await getAuditLogsService();
    res.json({
        success: true,
        data: logs
    });
};

export const getAuditLogByIdController = async (req: Request, res: Response) => {
    const log = await getAuditLogByIdService(req.params.id as string);
    res.json({
        success: true,
        data: log
    });
};

export const getUserAuditLogsController =
    async (req: Request, res: Response) => {
        const logs = await getUserAuditLogsService(req.params.userId as string);



        res.json({

            success: true,
            data: logs

        });


    };






export const deleteAuditLogController =
    async (
        req: Request,
        res: Response
    ) => {


        await deleteAuditLogService(
            req.params.id as string
        );



        res.json({

            success: true,
            message:
                "Audit log deleted"

        });


    };