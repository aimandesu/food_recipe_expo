import { z } from "zod";

// const ImageRequireSchema = z.custom<number>((data) => {
//   // In React Native, require() returns a number that serves as an image ID
//   return typeof data === "number";
// });

const ImageSchema = z.union([
  z.custom<number>((data) => typeof data === "number"), // For require() type
  z.string().startsWith("file://"), // For local file paths
]);

// Define the schema for RecipeDetails
export const RecipeDetailsSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  image: ImageSchema,
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
});

// Define the schema for FoodRecipe
export const FoodRecipeSchema = z
  .object({
    tag: z.string(),
    // testing_it: z.string(),
    recipes: z.array(RecipeDetailsSchema),
  })
  .transform((data) => {
    return {
      ...data,
      // testingIt: data.testing_it,
    };
  });

// Type inference (automatically generates TypeScript types from schema)
export type RecipeDetails = z.infer<typeof RecipeDetailsSchema>;
export type FoodRecipe = z.infer<typeof FoodRecipeSchema>;
