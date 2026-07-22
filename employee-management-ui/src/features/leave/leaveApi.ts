import { baseApi } from "../../api/baseApi";

export const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyLeave: builder.mutation({
      query: (data) => ({
        url: "/leave",

        method: "POST",

        body: data,
      }),

      invalidatesTags: ["Leave"],
    }),

    getLeaves: builder.query({
      query: () => ({
        url: "/leave",

        method: "GET",
      }),

      providesTags: ["Leave"],
    }),

    updateLeave: builder.mutation({
      query: ({ id, data }) => ({
        url: `/leave/${id}`,

        method: "PATCH",

        body: data,
      }),

      invalidatesTags: ["Leave"],
    }),

    cancelLeave: builder.mutation({
      query: (id) => ({
        url: `/leave/${id}/cancel`,

        method: "PATCH",
      }),

      invalidatesTags: ["Leave"],
    }),

    approveLeave: builder.mutation({
      query: (id) => ({
        url: `/leave/${id}/approve`,

        method: "PATCH",
      }),

      invalidatesTags: ["Leave"],
    }),

    rejectLeave: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/leave/${id}/reject`,

        method: "PATCH",

        body: {
          reason,
        },
      }),

      invalidatesTags: ["Leave"],
    }),

    getLeaveBalance: builder.query({
      query: () => ({
        url: "/leave/balance",

        method: "GET",
      }),
    }),

    getLeaveHistory: builder.query({
      query: () => ({
        url: "/leave/history",

        method: "GET",
      }),

      providesTags: ["Leave"],
    }),

    getPendingLeaves: builder.query({
      query: () => ({
        url: "/leave/pending",

        method: "GET",
      }),

      providesTags: ["Leave"],
    }),

    getLeaveCalendar: builder.query({
      query: ({
        start,
        end,
      }: {
        start?: string;
        end?: string;
      } = {}) => {
        let url = "/leave/calendar";

        if (start && end) {
          url += `?start=${start}&end=${end}`;
        }

        return {
          url,

          method: "GET",
        };
      },

      providesTags: ["Leave"],
    }),
  }),
});

export const {
  useApplyLeaveMutation,

  useGetLeavesQuery,

  useUpdateLeaveMutation,

  useCancelLeaveMutation,

  useApproveLeaveMutation,

  useRejectLeaveMutation,

  useGetLeaveBalanceQuery,

  useGetLeaveHistoryQuery,

  useGetPendingLeavesQuery,

  useGetLeaveCalendarQuery,
} = leaveApi;
