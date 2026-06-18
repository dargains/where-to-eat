#!/bin/bash
# Icon generation helper
# This script generates PNG icons from the SVG placeholder
# Requires ImageMagick: brew install imagemagick (Mac) or apt-get install imagemagick (Linux)

echo "⚙️  Generating PWA Icons..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Please install it:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Generate icons from SVG
echo "📦 Generating 192x192 icons..."
convert -background none -density 192 -resize 192x192 public/icon-placeholder.svg public/icon-192.png
convert -background none -density 192 -resize 192x192 public/icon-placeholder.svg public/icon-192-maskable.png

echo "📦 Generating 512x512 icons..."
convert -background none -density 512 -resize 512x512 public/icon-placeholder.svg public/icon-512.png
convert -background none -density 512 -resize 512x512 public/icon-placeholder.svg public/icon-512-maskable.png

echo "🖼️  Generating screenshots..."
convert -background none -density 192 -resize 192x192 public/icon-placeholder.svg public/screenshot-192.png
convert -background none -density 512 -resize 512x512 public/icon-placeholder.svg public/screenshot-512.png

echo "✅ Icons generated successfully!"
echo ""
echo "📝 NOTE: These are placeholder icons. For production:"
echo "   1. Create your own logo/icon"
echo "   2. Export as PNG at 192x192 and 512x512"
echo "   3. For maskable icons, keep content in center 40%"
echo "   4. Or use an online tool: https://www.pwabuilder.com/imageGenerator"
