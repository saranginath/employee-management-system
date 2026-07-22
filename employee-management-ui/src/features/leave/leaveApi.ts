import { baseApi } from "../../api/baseApi";

import type { Leave, ApplyLeaveRequest } from "./types";

export const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLeave: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Leave;
      },
      ApplyLeaveRequest
    >({
      query: (data) => ({
        url: "/leave",

        method: "POST",

        body: data,
      }),

      invalidatesTags: ["Leave"],
    }),

    getLeaves: builder.query<
      {
        success: boolean;
        data: Leave[];
      },
      void
    >({
      query: () => "/leave",

      providesTags: ["Leave"],
    }),

    cancelLeave: builder.mutation<any, string>({
      query: (id) => ({
        url: `/leave/${id}/cancel`,

        method: "PATCH",
      }),

      invalidatesTags: ["Leave"],
    }),

    getPendingLeaves: builder.query<
      {
        success: boolean;
        data: Leave[];
      },
      void
    >({
      query: () => "/leave/pending",
    }),

    approveLeave: builder.mutation<any, string>({
      query: (id) => ({
        url: `/leave/${id}/approve`,

        method: "PATCH",
      }),
    }),

    rejectLeave: builder.mutation<
      any,
      {
        id: string;
        reason: string;
      }
    >({
      query: ({ id, reason }) => ({
        url: `/leave/${id}/reject`,

        method: "PATCH",

        body: {
          rejectionReason: reason,
        },
      }),
    }),
  }),
});

export const {
  useCreateLeaveMutation,

  useGetLeavesQuery,

  useCancelLeaveMutation,

  useGetPendingLeavesQuery,

  useApproveLeaveMutation,

  useRejectLeaveMutation,
} = leaveApi;
