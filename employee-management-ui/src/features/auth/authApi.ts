import { baseApi } from "../../api/baseApi";
import type { LoginResponse, RegisterRequest, RegisterResponse } from "./types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, {
            email: string,
            password: string
        }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials
            })
        }),
        registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (data) => ({
                url: '/auth/register',
                method: "POST",
                body: data
            })
        })

    })
})



export const { useLoginMutation, useRegisterUserMutation } = authApi