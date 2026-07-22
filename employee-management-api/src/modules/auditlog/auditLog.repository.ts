import { AuditLog } from "./auditLog.model";

export const createAuditLogRepo = (data: any) => {
  return AuditLog.create(data);
};

export const getAuditLogsRepo = () => {
  return AuditLog.find()
    .populate("user", "firstName lastName email role")
    .sort({
      createdAt: -1,
    });
};

export const getAuditLogByIdRepo = (id: string) => {
  return AuditLog.findById(id).populate("user", "firstName lastName email");
};

export const getAuditLogsByUserRepo = (userId: string) => {
  return AuditLog.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

export const deleteAuditLogRepo = (id: string) => {
  return AuditLog.findByIdAndDelete(id);
};
