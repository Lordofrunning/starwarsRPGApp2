import os
from PIL import Image

# Define folders
input_folder = "yellowOG"
output_folder = "yellow"

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Loop through all .jpg or .jpeg files
for filename in os.listdir(input_folder):
    if filename.lower().endswith(".jpg") or filename.lower().endswith(".jpeg"):
        input_path = os.path.join(input_folder, filename)

        # Convert .jpg filename to .png
        base_name = os.path.splitext(filename)[0]
        output_filename = base_name + ".png"
        output_path = os.path.join(output_folder, output_filename)

        # Open image and convert to RGBA to add transparency
        image = Image.open(input_path).convert("RGBA")
        pixels = image.load()

        width, height = image.size

        # Change black pixels to transparent, leave others alone
        for x in range(width):
            for y in range(height):
                r, g, b, a = pixels[x, y]
                # if (r, g, b) == (0, 0, 0):
                #     pixels[x, y] = (0, 0, 0, 0)  # Fully transparent
                # else:
                #     pixels[x, y] = (r, g, b, 255)  # Fully opaque
                if (r > 150 and g > 150 and b > 150):#(r, g, b) == (0, 0, 0) and(a > 0)
                    pixels[x, y] = (255, 255, 255, 0)  # Change white to transparency

        # Save as PNG to preserve transparency
        image.save(output_path, "PNG")
        print(f"Converted and processed: {filename} -> {output_filename}")

print("✅ All JPG images converted to PNG with transparency.")
