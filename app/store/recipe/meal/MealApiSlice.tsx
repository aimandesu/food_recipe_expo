import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchMealSchema } from "../../scheme/SearchFoodScheme";

export const SearchAPIslice = createApi({
  reducerPath: "mealS",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/",
  }),
  endpoints: (builder) => {
    return {
      getMeals: builder.query({
        query: (keyword: string) => `json/v1/1/search.php?s=${keyword}`,
        transformResponse: (response: unknown) => {
          console.log("run only once please");

          const parsedResponse = SearchMealSchema.parse(response);
          return parsedResponse;
        },
      }),
    };
  },
});

export const { useGetMealsQuery } = SearchAPIslice;
