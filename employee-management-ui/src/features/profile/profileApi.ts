import { baseApi } from "../../api/baseApi";
import type { UserProfile } from "./types";


export const profileApi =
    baseApi.injectEndpoints({

        endpoints: (builder) => ({


            getProfile: builder.query<
                {
                    success: boolean;
                    data: UserProfile
                },
                void
            >({

                query: () => "/profile",

                providesTags: ["Profile"]

            }),



            updateProfile: builder.mutation({

                query: (data) => ({

                    url: "/profile",

                    method: "PATCH",

                    body: data

                }),

                invalidatesTags: ["Profile"]

            }),



            uploadProfilePicture:
                builder.mutation({

                    query: (formData) => ({

                        url: "/profile/picture",

                        method: "PATCH",

                        body: formData

                    }),

                    invalidatesTags: ["Profile"]

                }),



            changePassword:
                builder.mutation({

                    query: (data) => ({

                        url: "/profile/change-password",

                        method: "PATCH",

                        body: data

                    })

                })

        })


    });


export const {

    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadProfilePictureMutation,
    useChangePasswordMutation

} = profileApi;