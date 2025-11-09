using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Server.Services.CloudinaryService
{
    public interface ICloudinaryService
    {
        string GetImageUrl(string publicId, int? width = null, int? height = null, string? transformation = null);
        Task<string> UploadImageAsync(IFormFile file, string folder = "products");
        Task<bool> DeleteImageAsync(string publicId);
    }

    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(IConfiguration configuration)
        {
            var cloudName = configuration["Cloudinary:CloudName"];
            var apiKey = configuration["Cloudinary:ApiKey"];
            var apiSecret = configuration["Cloudinary:ApiSecret"];

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(account);
        }

        /// <summary>
        /// Generates a Cloudinary URL for an image based on its public ID
        /// </summary>
        public string GetImageUrl(string publicId, int? width = null, int? height = null, string? transformation = null)
        {
            if (string.IsNullOrEmpty(publicId))
                return string.Empty;

            var transformParams = new Transformation();

            if (width.HasValue)
                transformParams = transformParams.Width(width.Value);

            if (height.HasValue)
                transformParams = transformParams.Height(height.Value);

            // Default quality and format optimization
            transformParams = transformParams.Quality("auto").FetchFormat("auto");

            // Add custom transformation if provided
            if (!string.IsNullOrEmpty(transformation))
            {
                transformParams = transformParams.Chain().Named(transformation);
            }

            return _cloudinary.Api.UrlImgUp.Transform(transformParams).BuildUrl(publicId);
        }

        /// <summary>
        /// Uploads an image to Cloudinary
        /// </summary>
        public async Task<string> UploadImageAsync(IFormFile file, string folder = "products")
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is empty");

            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = folder,
                UseFilename = true,
                UniqueFilename = true,
                Overwrite = false
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
                throw new Exception($"Cloudinary upload failed: {uploadResult.Error.Message}");

            return uploadResult.PublicId;
        }

        /// <summary>
        /// Deletes an image from Cloudinary
        /// </summary>
        public async Task<bool> DeleteImageAsync(string publicId)
        {
            if (string.IsNullOrEmpty(publicId))
                return false;

            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result.Result == "ok";
        }
    }
}
