import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManagerDashboard: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/manager",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetManagerDashboardQuery } = dashboardApi;
