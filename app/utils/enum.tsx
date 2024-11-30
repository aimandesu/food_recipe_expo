export enum Category {
  Popular = "Popular",
  Western = "Western",
  Drinks = "Drinks",
  Local = "Local",
  Dessert = "Dessert",
}

export enum RecipeDetailsTab {
  Ingredients = "Ingredietns",
  Steps = "step",
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}
