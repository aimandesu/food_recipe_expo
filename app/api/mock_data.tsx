export const mockData = [
  {
    tag: "dessert",
    recipes: [
      {
        name: "Chocolate Lava Cake",
        image: require("../../assets/recipe/chocolate_lava_cake.jpg"),
        ingredients: ["chocolate", "eggs", "butter", "sugar", "flour"],
        instructions: [
          "Preheat oven to 450°F.",
          "Grease ramekins with butter.",
          "Melt chocolate and butter in a double boiler.",
          "Whisk in eggs and sugar until smooth.",
          "Fold in flour.",
          "Divide batter into ramekins.",
          "Bake for 8-10 minutes.",
          "Serve immediately.",
        ],
      },
      {
        name: "Tiramisu",
        image: require("../../assets/recipe/tiramisu.jpg"),
        ingredients: [
          "mascarpone cheese",
          "eggs",
          "sugar",
          "coffee",
          "ladyfingers",
          "cocoa powder",
        ],
        instructions: [
          "Whip mascarpone, egg yolks, and sugar until smooth.",
          "In a separate bowl, beat egg whites until stiff peaks form.",
          "Fold egg whites into mascarpone mixture.",
          "Dip ladyfingers in coffee and arrange in a baking dish.",
          "Spread mascarpone mixture over ladyfingers.",
          "Dust with cocoa powder.",
          "Refrigerate for at least 6 hours before serving.",
        ],
      },
      {
        name: "Apple Pie",
        image: require("../../assets/recipe/apple_pie.jpg"),
        ingredients: [
          "apples",
          "sugar",
          "cinnamon",
          "flour",
          "butter",
          "pie crust",
        ],
        instructions: [
          "Preheat oven to 375°F.",
          "Peel, core, and slice apples.",
          "Toss apples with sugar, cinnamon, and flour.",
          "Roll out bottom pie crust and place in a pie dish.",
          "Fill with apple mixture.",
          "Roll out top crust and place over filling.",
          "Crimp and seal edges.",
          "Cut slits in the top crust.",
          "Bake for 45-55 minutes until golden brown.",
        ],
      },
    ],
  },
  {
    tag: "western",
    recipes: [
      {
        name: "Chili Con Carne",
        image: require("../../assets/recipe/chili_corn_carne.jpg"),
        ingredients: [
          "ground beef",
          "onion",
          "garlic",
          "chili powder",
          "cumin",
          "tomatoes",
          "beans",
        ],
        instructions: [
          "Brown ground beef in a large pot.",
          "Add onion and garlic, and cook until softened.",
          "Stir in chili powder, cumin, and tomatoes.",
          "Simmer for 30 minutes.",
          "Add beans and simmer for another 15 minutes.",
          "Season with salt and pepper to taste.",
          "Serve with cornbread or tortillas.",
        ],
      },
      {
        name: "Chicken Fried Steak",
        image: require("../../assets/recipe/chicken_fried_stick.jpg"),
        ingredients: [
          "cube steak",
          "flour",
          "eggs",
          "breadcrumbs",
          "oil",
          "country gravy",
        ],
        instructions: [
          "Pound cube steak to tenderize.",
          "Dredge in flour, then dip in beaten eggs, and finally coat in breadcrumbs.",
          "Heat oil in a skillet over medium-high heat.",
          "Fry steak for 3-4 minutes per side until golden brown.",
          "Make country gravy by whisking together the remaining flour and milk.",
          "Simmer until thickened.",
          "Serve steak with country gravy on top.",
        ],
      },
      {
        name: "Beef Brisket",
        image: require("../../assets/recipe/beef_brisket.jpg"),
        ingredients: [
          "beef brisket",
          "barbecue sauce",
          "brown sugar",
          "garlic",
          "onion",
          "spices",
        ],
        instructions: [
          "Preheat oven to 325°F.",
          "Season brisket with salt, pepper, and your favorite spices.",
          "Place brisket in a roasting pan and cover with barbecue sauce, brown sugar, garlic, and onion.",
          "Cover and bake for 3-4 hours, until tender.",
          "Remove brisket from oven and let rest for 15 minutes.",
          "Slice against the grain and serve with the cooking liquid.",
        ],
      },
    ],
  },
  {
    tag: "Italian",
    recipes: [
      {
        name: "Spaghetti Carbonara",
        image: require("../../assets/recipe/spaggeti_carbonara.jpg"),
        ingredients: [
          "spaghetti",
          "eggs",
          "parmesan cheese",
          "bacon",
          "garlic",
          "black pepper",
        ],
        instructions: [
          "Cook spaghetti according to package instructions.",
          "In a bowl, whisk together eggs and parmesan cheese.",
          "In a skillet, cook bacon until crispy.",
          "Add minced garlic to the bacon and cook for 1 minute.",
          "Drain spaghetti and add to the skillet with the bacon and garlic.",
          "Remove from heat and quickly stir in the egg mixture.",
          "Serve immediately, topped with freshly ground black pepper.",
        ],
      },
      {
        name: "Margherita Pizza",
        image: require("../../assets/recipe/margeritta_pizza.jpg"),
        ingredients: [
          "pizza dough",
          "tomato sauce",
          "mozzarella cheese",
          "fresh basil",
          "olive oil",
          "salt",
        ],
        instructions: [
          "Preheat oven to 450°F.",
          "Roll out pizza dough on a lightly floured surface.",
          "Spread tomato sauce evenly over the dough.",
          "Tear or slice mozzarella cheese and arrange on top of the sauce.",
          "Tear or chop fresh basil leaves and sprinkle over the cheese.",
          "Drizzle with olive oil and season with salt.",
          "Bake for 12-15 minutes until the crust is golden brown and the cheese is melted.",
        ],
      },
      {
        name: "Lasagna",
        image: require("../../assets/recipe/lasagna.jpg"),
        ingredients: [
          "ground beef",
          "onion",
          "garlic",
          "tomatoes",
          "lasagna noodles",
          "ricotta cheese",
          "mozzarella cheese",
          "parmesan cheese",
        ],
        instructions: [
          "Preheat oven to 375°F.",
          "In a skillet, cook ground beef, onion, and garlic until browned.",
          "Add tomatoes and simmer for 30 minutes.",
          "Cook lasagna noodles according to package instructions.",
          "In a baking dish, layer noodles, beef mixture, ricotta, mozzarella, and parmesan.",
          "Repeat layers until all ingredients are used up.",
          "Cover with foil and bake for 45 minutes.",
          "Remove foil and bake for another 15 minutes.",
        ],
      },
    ],
  },
];
