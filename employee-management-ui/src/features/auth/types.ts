export interface User {
    _id: string;
    name: string;
    email: string;
    role: | "admin" | "manager" | "employee";
    isEmailVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: User,
        accessToken: string;
        refreshToken: string;
    }
}
export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: "admin" | "manager" | "employee";
        isEmailVerified: boolean;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    };
}