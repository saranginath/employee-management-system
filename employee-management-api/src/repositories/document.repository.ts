import { Document } from "../models/document.model";

export const createDocumentRepo = (data: any) => {
  return Document.create(data);
};

export const getDocumentsRepo = (filter: any = {}) => {
  return Document.find(filter)
    .populate("employee", "firstName lastName email")
    .populate("uploadedBy", "firstName lastName email");
};

export const getDocumentByIdRepo = (id: string) => {
  return Document.findById(id).populate("employee").populate("uploadedBy");
};

export const updateDocumentRepo = (id: string, data: any) => {
  return Document.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteDocumentRepo = (id: string) => {
  return Document.findByIdAndDelete(id);
};
