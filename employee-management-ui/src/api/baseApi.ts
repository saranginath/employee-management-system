import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";


import type { RootState } from "./store";

import {
    setAccessToken,
    logout
} from "../features/auth/authSlice";

const baseQuery =
    fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth
                .accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    });





const baseQueryWithReauth = async (args: any, api: any, extra: any
) => {


    let result =
        await baseQuery(
            args,
            api,
            extra
        );



    if (result.error?.status === 401) {


        const refreshResult =
            await baseQuery(

                {
                    url: "/auth/refresh-token",
                    method: "POST"
                },

                api,

                extra

            );



        if (refreshResult.data) {


            const token =
                (refreshResult.data as any)
                    .accessToken;



            api.dispatch(

                setAccessToken(token)

            );
            result =
                await baseQuery(
                    args,
                    api,
                    extra
                );
        }
        else {
            api.dispatch(
                logout()
            );
        }
    }
    return result;

}





export const baseApi = createApi({

    reducerPath: "api",


    baseQuery:
        baseQueryWithReauth,

    tagTypes: [
        "Auth",
        "Employee",
        "Department",
        "Attendance",
        "Leave",
        "Settings",
        "Dashboard",
        "Profile"
    ],


    endpoints: () => ({})


});