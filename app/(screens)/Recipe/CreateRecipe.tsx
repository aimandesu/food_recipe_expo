import React from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  RecipesState,
  saveRecipeAsync,
  clearAllData,
} from "../../store/recipe/RecipeSlice";
import { pickAndSaveImage } from "@/hooks/imagePicker";
import {
  FoodRecipe,
  RecipeDetails,
  FoodRecipeSchema,
  RecipeDetailsSchema,
} from "../../store/scheme/FoodRecipeScheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// type FormFields = z.infer<typeof RecipeDetailsSchema>;

type FormFields = {
  tag: string;
  name: string;
  ingredients: string;
  instructions: string;
};

const CreateRecipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes: RecipesState = useSelector(
    (state: RootState) => state.recipes
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      tag: "",
      name: "",
      ingredients: "",
      instructions: "",
    },
    // resolver: zodResolver(RecipeDetailsSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const imagePath = await pickAndSaveImage();
      if (!imagePath) {
        alert("Failed to pick image");
        return;
      }

      const newRecipe: FoodRecipe = {
        tag: data.tag,
        recipes: [
          {
            name: data.name,
            ingredients: [""],
            instructions: [""],
            image: imagePath,
          },
        ],
      };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await dispatch(saveRecipeAsync(newRecipe)).unwrap();
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  };

  const handleClearStorage = async () => {
    try {
      await dispatch(clearAllData()).unwrap();
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Tag</Text>
      <Controller
        control={control}
        name="tag"
        rules={{ required: "Tag is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Enter tag (e.g., Malay)"
          />
        )}
      />
      {errors.tag && <Text style={styles.error}>{errors.tag.message}</Text>}

      <Text style={styles.label}>Recipe Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Enter recipe name"
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>Ingredients (comma-separated)</Text>
      <Controller
        control={control}
        name="ingredients"
        rules={{ required: "Ingredients are required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="e.g., Pasta, Tomato Sauce, Ground Beef"
          />
        )}
      />
      {errors.ingredients && (
        <Text style={styles.error}>{errors.ingredients.message}</Text>
      )}

      <Text style={styles.label}>Instructions (comma-separated)</Text>
      <Controller
        control={control}
        name="instructions"
        rules={{ required: "Instructions are required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="e.g., Cook pasta, Add sauce, Mix with beef"
          />
        )}
      />
      {errors.instructions && (
        <Text style={styles.error}>{errors.instructions.message}</Text>
      )}

      <Button
        disabled={isSubmitting}
        title={isSubmitting ? "Loading.." : "Submit"}
        onPress={handleSubmit(onSubmit)}
      />
      <Button title="Clear All Data" onPress={handleClearStorage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default CreateRecipe;
