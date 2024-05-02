import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";

export const productsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: build => ({
    getDashboardProducts: build.query({
      query: arg => {
        const { page } = arg;
        return {
          url: `/api/products?populate=category,thumbnail&pagination[page]=${page}&pagination[pageSize]=7`,
        };
      },
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Products", id })),
            { type: 'Products', id: 'LIST' }
            ]
          : [{ type: 'Products', id: 'LIST' }],
      }),
    deleteDashboardProducts: build.mutation({
      query(id) {
        return {
          url: `/api/products/${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${CookieService.get("jwt")}`
          }
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }]
    })
  }),
});

export const { useGetDashboardProductsQuery, useDeleteDashboardProductsMutation } = productsApiSlice;