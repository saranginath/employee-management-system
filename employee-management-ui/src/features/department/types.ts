export interface Department {

    _id: string;

    name: string;

    code: string;

    description?: string;

    manager?: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    } | null;

    status: "active" | "inactive";

    createdAt?: string;

    updatedAt?: string;

}



export interface CreateDepartmentRequest {

    name: string;

    code: string;

    description?: string;

    manager?: string;

    status?: "active" | "inactive";

}



export interface UpdateDepartmentRequest {

    id: string;

    data: Partial<CreateDepartmentRequest>;

}