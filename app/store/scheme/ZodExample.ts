// import { z } from 'zod';

// //claude
// const MenuStatSchema = z.object({
//   baseModel: z.literal('MenuStat').transform(str => str),
//   id: z.string(),
//   totalSold: z.number().transform(val => val),
//   averageRating: z.number().transform(val => val),
//   totalReviews: z.number().transform(val => val)
// }).transform(data => data);

// const DietaryTagSchema = z.object({
//   baseModel: z.literal('DietaryTag').transform(str => str),
//   id: z.string(),
//   name: z.string(),
//   sequence: z.number()
// }).transform(data => data);

// const MenuCategorySchema = z.object({
//   baseModel: z.literal('MenuCategory').transform(str => str),
//   id: z.string(),
//   name: z.string(),
//   description: z.string(),
//   sequence: z.number(),
//   isActive: z.boolean().transform(val => val)
// }).transform(data => data);

// const MenuSchema = z.object({
//   baseModel: z.literal('Menu').transform(str => str),
//   id: z.string(),
//   code: z.string(),
//   mealName: z.string().transform(str => str),
//   price: z.number(),
//   description: z.string(),
//   prepTime: z.number().transform(val => val),
//   isPublished: z.boolean().transform(val => val),
//   hasSoldOut: z.boolean().transform(val => val),
//   menuImage: z.string().nullable(),
//   menuStat: MenuStatSchema,
//   menuDietaryTags: z.array(DietaryTagSchema),
//   menuCategories: z.array(MenuCategorySchema)
// }).transform(data => data);

// // If you need the full API response schema
// const ApiResponseSchema = z.object({
//   status: z.string(),
//   message: z.string(),
//   meta: z.object({
//     merchantId: z.string().transform(str => str),
//     description: z.string(),
//     timestamp: z.string(),
//     memoryUsage: z.string().transform(str => str),
//     memoryPeak: z.string().transform(str => str),
//     execution: z.string()
//   }),
//   data: z.array(MenuSchema)
// }).transform(data => data);

// type Menu = z.infer<typeof MenuSchema>;
// type ApiResponse = z.infer<typeof ApiResponseSchema>;

// export {
//   MenuSchema,
//   ApiResponseSchema,
//   type Menu,
//   type ApiResponse
// };

// //gemini
// import { z } from 'zod';

// const MenuStatSchema = z.object({
//   baseModel: z.literal('MenuStat'),
//   id: z.string(),
//   totalSold: z.number(),
//   averageRating: z.number(),
//   totalReviews: z.number()
// });

// const DietaryTagSchema = z.object({
//   baseModel: z.literal('DietaryTag'),
//   id: z.string(),
//   name: z.string(),
//   sequence: z.number()
// });

// const MenuCategorySchema = z.object({
//   baseModel: z.literal('MenuCategory'),
//   id: z.string(),
//   name: z.string(),
//   description: z.string(),
//   sequence: z.number(),
//   isActive: z.boolean()
// });

// const MenuSchema = z.object({
//   baseModel: z.literal('Menu'),
//   id: z.string(),
//   code: z.string(),
//   mealName: z.string(),
//   price: z.number(),
//   description: z.string(),
//   prepTime: z.number(),
//   isPublished: z.boolean(),
//   hasSoldOut: z.boolean(),
//   menuImage: z.string().nullable(),
//   menuStat: MenuStatSchema,
//   menuDietaryTags: z.array(DietaryTagSchema),
//   menuCategories: z.array(MenuCategorySchema)
// });

// // If you need the full API response schema
// const ApiResponseSchema = z.object({
//   status: z.string(),
//   message: z.string(),
//   meta: z.object({
//     merchantId: z.string(),
//     description: z.string(),
//     timestamp: z.string(),
//     memoryUsage: z.string(),
//     memoryPeak: z.string(),
//     execution: z.string()
//   }),
//   data: z.array(MenuSchema)
// });

// type Menu = z.infer<typeof MenuSchema>;
// type ApiResponse = z.infer<typeof ApiResponseSchema>;

// export {
//   MenuSchema,
//   ApiResponseSchema,
//   type Menu,
//   type ApiResponse
// };
