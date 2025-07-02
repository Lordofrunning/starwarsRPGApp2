import os
from PIL import Image

# Define folders
input_folder = "forceOG"
output_folder = "force"
# input_folder = "redOG"
# output_folder = "red"

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

def is_white(r, g, b, threshold=40):
    return r > threshold or g > threshold or b > threshold

def is_black(r, g, b, threshold=40):
    return r < threshold or g < threshold or b < threshold

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

        for y in range(height):
            # Scan from left to right
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if is_black(r, g, b):
                    break
                if is_white(r, g, b):
                    pixels[x, y] = (255, 255, 255, 0)  # Transparent

            # Scan from right to left
            for x in range(width - 1, -1, -1):
                r, g, b, a = pixels[x, y]
                if is_black(r, g, b):
                    break
                if is_white(r, g, b):
                    pixels[x, y] = (255, 255, 255, 0)  # Transparent

        # Save as PNG to preserve transparency
        image.save(output_path, "PNG")
        print(f"Converted and processed: {filename} -> {output_filename}")

print("✅ All JPG images converted to PNG with transparency around black objects.")