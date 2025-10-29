# Cloudinary Integration Setup

This guide explains how to set up Cloudinary for image uploads in the real estate platform.

## What is Cloudinary?

Cloudinary is a cloud-based image and video management service that provides:
- Image upload and storage
- Automatic image optimization
- Image transformations (resize, crop, format conversion)
- CDN delivery for fast loading

## Setup Instructions

### 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. After registration, you'll be taken to your dashboard

### 2. Get Your Credentials

From your Cloudinary dashboard, you'll find:
- **Cloud Name**: Your unique cloud identifier
- **API Key**: Your public API key
- **API Secret**: Your private API secret (keep this secure!)

### 3. Configure Environment Variables

Add these variables to your `backend/.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace the placeholder values with your actual Cloudinary credentials.

### 4. Features Implemented

The integration includes:

#### Backend Features:
- **CloudinaryService**: Handles image uploads and transformations
- **File Upload Endpoints**: Accept multipart/form-data for property images
- **Image Optimization**: Automatic WebP conversion and quality optimization
- **Organized Storage**: Images stored in `/properties` folder

#### Frontend Features:
- **ImageUpload Component**: Drag-and-drop image upload interface
- **File Validation**: Type and size validation before upload
- **Preview System**: Immediate image previews
- **Error Handling**: User-friendly error messages

#### Image Transformations:
- Resize to 800x600 pixels
- Crop to fill the frame
- Auto quality optimization
- WebP format conversion for better performance

### 5. Usage

#### Creating Properties with Images:
1. Navigate to Admin → Properties
2. Click "Add Property"
3. Fill in property details
4. Upload images using the image upload component
5. Images are automatically uploaded to Cloudinary during property creation

#### API Endpoints:
- `POST /api/properties` - Create property with images
- `POST /api/properties/upload-images/:id` - Add images to existing property

### 6. File Limits

- **Maximum files per upload**: 10 images
- **File size limit**: 5MB per image
- **Supported formats**: JPEG, PNG, WebP
- **Output format**: WebP (optimized)

### 7. Security Notes

- API secrets are server-side only
- File validation on both client and server
- Secure upload URLs with authentication
- Automatic image optimization reduces bandwidth

### 8. Troubleshooting

#### Common Issues:

**"Invalid credentials" error:**
- Check your environment variables are correct
- Ensure no extra spaces in the values
- Verify your Cloudinary account is active

**Upload fails:**
- Check file size (must be under 5MB)
- Verify file format (JPEG, PNG, WebP only)
- Ensure you're authenticated as admin/realtor

**Images not displaying:**
- Check the Cloudinary URLs in the database
- Verify your cloud name is correct
- Check browser console for CORS errors

### 9. Free Tier Limits

Cloudinary free tier includes:
- 25 GB storage
- 25 GB monthly bandwidth
- 1,000 transformations per month

For production use, consider upgrading to a paid plan.

### 10. Alternative Configuration

If you prefer not to use Cloudinary, you can:
1. Comment out the Cloudinary service
2. Implement local file storage
3. Use other cloud storage services (AWS S3, Google Cloud Storage)

The system is designed to be flexible and can work with different storage backends.