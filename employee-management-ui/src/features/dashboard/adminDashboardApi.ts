import { baseApi } from "../../api/baseApi";

export const adminDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/admin",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminDashboardQuery } = adminDashboardApi;
