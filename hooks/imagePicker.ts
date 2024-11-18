import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export const pickAndSaveImage = async () => {
  try {
    // Request permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return null;
    }

    // Pick the image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Create a unique filename
      const filename = `${
        FileSystem.documentDirectory
      }recipes/${Date.now()}.jpg`;

      // Ensure directory exists
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}recipes/`,
        { intermediates: true }
      );

      // Copy the image to app's local storage
      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: filename,
      });

      return filename; // Return the local path
    }

    return null;
  } catch (error) {
    console.error("Error picking image:", error);
    return null;
  }
};
