import os
from PIL import Image

# Paths
img1_path = r"C:\Users\ASUS\.gemini\antigravity\brain\cb30582f-984b-4429-99a4-175c797f5ee3\media__1778609777454.jpg"
img2_path = r"C:\Users\ASUS\.gemini\antigravity\brain\cb30582f-984b-4429-99a4-175c797f5ee3\media__1778609777532.jpg"
out_dir = r"d:\Sparsh_website\src\assets\images"

os.makedirs(out_dir, exist_ok=True)

# Image 1 (2 departments, split vertically)
im1 = Image.open(img1_path)
w1, h1 = im1.size
cardiology = im1.crop((0, 0, w1//2, h1))
orthopaedic = im1.crop((w1//2, 0, w1, h1))

cardiology.save(os.path.join(out_dir, "dept_cardiology.jpg"))
orthopaedic.save(os.path.join(out_dir, "dept_orthopaedic.jpg"))

# Image 2 (4 departments, 2x2 grid)
im2 = Image.open(img2_path)
w2, h2 = im2.size
neurology = im2.crop((0, 0, w2//2, h2//2))
gastro = im2.crop((w2//2, 0, w2, h2//2))
nephrology = im2.crop((0, h2//2, w2//2, h2))
surgery = im2.crop((w2//2, h2//2, w2, h2))

neurology.save(os.path.join(out_dir, "dept_neurology.jpg"))
gastro.save(os.path.join(out_dir, "dept_gastroenterology.jpg"))
nephrology.save(os.path.join(out_dir, "dept_nephrology.jpg"))
surgery.save(os.path.join(out_dir, "dept_surgery.jpg"))

print("Cropped and saved 6 images successfully.")
