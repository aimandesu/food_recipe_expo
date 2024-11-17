import { z } from "zod";

// Define the schema for RecipeDetails
const RecipeDetailsSchema = z.object({
  name: z.string().default(""),
  image: z.string().default(""),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
});

// Define the schema for FoodRecipe
export const FoodRecipeSchema = z.object({
  tag: z.string(),
  recipes: z.array(RecipeDetailsSchema),
});

// Type inference (automatically generates TypeScript types from schema)
type RecipeDetails = z.infer<typeof RecipeDetailsSchema>;
export type FoodRecipe = z.infer<typeof FoodRecipeSchema>;
