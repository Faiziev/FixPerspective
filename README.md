# FixPerspective

FixPerspective is a free, browser-based tool for correcting perspective distortion in images. It allows users to easily warp, align, and straighten photos with precision using Bezier control points.

![FixPerspective Screenshot](public/og-video.mp4)

## Features

- **Perspective Correction**: Fix skewed images by adjusting control points
- **Bezier Warp Controls**: Precise control over image transformation
- **Crop Functionality**: Crop images to remove unwanted areas
- **High-Quality Export**: Export corrected images in PNG or JPEG format
- **Multi-language Support**: Available in 8 languages:
  - English
  - Spanish (Español)
  - French (Français)
  - German (Deutsch) 
  - Turkish (Türkçe)
  - Russian (Русский)
  - Japanese (日本語)
  - Chinese (中文)
- **Responsive Design**: Works on mobile and desktop devices
- **Dark/Light Mode**: Theme switching for comfortable viewing

## How to Use

1. **Upload an Image**: Click "Select Image" to upload a photo (PNG, JPG, or WEBP up to 10MB)
2. **Adjust Control Points**: Drag the corner points to correct perspective distortion
3. **Crop Image**: Apply the crop to isolate the corrected area
4. **Apply Perspective Correction**: Transform the image according to your adjustments
5. **Export**: Download the high-resolution corrected image in your preferred format

## Technical Details

FixPerspective is built with modern web technologies:

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For responsive styling
- **Canvas API**: For image manipulation
- **Zustand**: For state management
- **Shadcn UI**: For consistent UI components

The app performs perspective transformation using homography matrices calculated from user-defined control points. All image processing is done client-side for privacy and performance.

## Development

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Faiziev/fix-perspective.git
cd fix-perspective

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
# or
pnpm build
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests for bug fixes, new features, or translations.

## License

This project is created by [Faiziev](https://github.com/Faiziev).

## Support

If you find this tool useful, consider supporting the developer:

[<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=faiziev&button_colour=000000&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" alt="Buy Me A Coffee" style="height: 40px;">](https://www.buymeacoffee.com/faiziev)