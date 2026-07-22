import { baseApi } from "../../api/baseApi";

export const employeeDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeDashboard: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/employee",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEmployeeDashboardQuery } = employeeDashboardApi;
