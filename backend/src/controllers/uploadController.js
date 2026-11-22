const { supabase, isConfigured } = require('../config/database');
const config = require('../config/environment');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');
const crypto = require('crypto');

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file was uploaded', 400);
    }

    const file = req.file;
    const ext = file.originalname.split('.').pop();
    const fileName = `products/${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;

    // Upload to Supabase Storage if configured
    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase.storage
          .from(config.SUPABASE_STORAGE_BUCKET)
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from(config.SUPABASE_STORAGE_BUCKET)
            .getPublicUrl(fileName);

          return successResponse(res, {
            url: publicUrlData.publicUrl,
            fileName,
            fileSize: file.size,
            mimeType: file.mimetype
          }, 'Image uploaded to Supabase Storage successfully', 201);
        }
        logger.warn('Supabase storage upload returned error:', error?.message);
      } catch (err) {
        logger.warn('Supabase storage exception:', err.message);
      }
    }

    // High-fidelity fallback: convert uploaded image to base64 data URI so admin preview works offline immediately
    const base64Data = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    return successResponse(res, {
      url: base64Data,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      note: 'Stored as data URI (Supabase storage credentials pending in .env)'
    }, 'Image processed successfully', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage
};
