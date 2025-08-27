export default function selectImage(): Promise<File> {
  return new Promise((resolve, reject) => {
    // Create a hidden file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpeg,.jpg,.png";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (!file) {
        reject("No image selected.");
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        reject("Invalid file type. Only JPEG, JPG, or PNG allowed.");
        return;
      }

      // Validate file size (max 20MB)
      const maxSize = 20 * 1024 * 1024;
      if (file.size > maxSize) {
        reject("File size exceeds 20MB.");
        return;
      }

      resolve(file);
    };

    input.click(); // Open file dialog
  });
}
