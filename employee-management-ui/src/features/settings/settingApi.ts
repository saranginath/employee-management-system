import { baseApi } from "../../api/baseApi";


export const settingsApi =
    baseApi.injectEndpoints({

        endpoints: (builder) => ({

            getSettings:

                builder.query({

                    query: () => ({

                        url: "/settings",

                        method: "GET"

                    }),

                    providesTags: ["Settings"]

                }),



            createSettings:

                builder.mutation({

                    query: (data) => ({

                        url: "/settings",

                        method: "POST",

                        body: data

                    }),

                    invalidatesTags: ["Settings"]

                }),



            updateSettings:

                builder.mutation({

                    query: (data) => ({

                        url: "/settings",

                        method: "PATCH",

                        body: data

                    }),

                    invalidatesTags: ["Settings"]

                }),



            testEmail:

                builder.mutation({

                    query: (data) => ({

                        url: "/settings/email/test",

                        method: "POST",

                        body: data

                    })

                })


        })

    });


export const {

    useGetSettingsQuery,

    useCreateSettingsMutation,

    useUpdateSettingsMutation,

    useTestEmailMutation


} = settingsApi;