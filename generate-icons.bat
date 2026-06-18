@echo off
REM Icon generation helper for Windows
REM This script generates PNG icons from the SVG placeholder
REM Requires ImageMagick: Download from https://imagemagick.org/script/download.php

echo.
echo Generating PWA Icons...
echo.

REM Check if convert (ImageMagick) is available
where convert >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ImageMagick not found. Please install it:
    echo   Download from: https://imagemagick.org/script/download.php
    echo   Make sure to check "Add ImageMagick to system PATH" during installation
    echo.
    pause
    exit /b 1
)

echo Generating 192x192 icons...
convert -background none -density 192 -resize 192x192 public\icon-placeholder.svg public\icon-192.png
convert -background none -density 192 -resize 192x192 public\icon-placeholder.svg public\icon-192-maskable.png

echo Generating 512x512 icons...
convert -background none -density 512 -resize 512x512 public\icon-placeholder.svg public\icon-512.png
convert -background none -density 512 -resize 512x512 public\icon-placeholder.svg public\icon-512-maskable.png

echo Generating screenshots...
convert -background none -density 192 -resize 192x192 public\icon-placeholder.svg public\screenshot-192.png
convert -background none -density 512 -resize 512x512 public\icon-placeholder.svg public\screenshot-512.png

echo.
echo Icons generated successfully!
echo.
echo NOTE: These are placeholder icons. For production:
echo   1. Create your own logo/icon
echo   2. Export as PNG at 192x192 and 512x512
echo   3. For maskable icons, keep content in center 40%%
echo   4. Or use an online tool: https://www.pwabuilder.com/imageGenerator
echo.
pause
