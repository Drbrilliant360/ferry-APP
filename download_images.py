import os
import requests
from PIL import Image
from io import BytesIO

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Image URLs and their corresponding filenames
images = {
    'pweza.jpg': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    'changu.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    'kolekole.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    'nguru.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    'taasi.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    'chewa.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    'kambale.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    'dagaa.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    'kobe.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    'mgebuka.jpg': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'
}

def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            # Open the image
            img = Image.open(BytesIO(response.content))
            
            # Resize the image to a standard size (e.g., 400x300)
            img = img.resize((400, 300), Image.Resampling.LANCZOS)
            
            # Save the image
            img.save(os.path.join('images', filename))
            print(f'Successfully downloaded {filename}')
        else:
            print(f'Failed to download {filename}. Status code: {response.status_code}')
    except Exception as e:
        print(f'Error downloading {filename}: {str(e)}')

# Download all images
for filename, url in images.items():
    download_image(url, filename)

print('Download process completed!') 