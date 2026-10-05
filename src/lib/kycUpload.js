import { supabase } from "./supabaseClient";

/*
 * KYC document upload to the private "kyc-documents" bucket.
 *
 * Files are stored under the signed-in user's own folder
 * (<user_id>/<kind>-<timestamp>.<ext>). The database rules in
 * supabase/migrations only let a user write to their own folder,
 * and only Takshaya reviewers can read other users' files.
 */

export const KYC_BUCKET = "kyc-documents";
export const KYC_MAX_BYTES = 2 * 1024 * 1024;

export const DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export const IMAGE_TYPES = ["image/jpeg", "image/png"];

const EXTENSIONS = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
};

/* Returns an error message, or "" when the file is acceptable. */
export function validateKycFile(file, allowedTypes = DOCUMENT_TYPES) {
  if (!file) return "";

  if (!allowedTypes.includes(file.type)) {
    return allowedTypes === IMAGE_TYPES
      ? "Please upload a JPG or PNG image."
      : "Please upload a PDF, JPG or PNG file.";
  }

  if (file.size > KYC_MAX_BYTES) {
    return "File must be smaller than 2 MB.";
  }

  return "";
}

/*
 * Uploads one file and returns the details to save with the application.
 * Throws an Error with a readable message if anything goes wrong.
 */
export async function uploadKycDocument(file, kind) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const extension = EXTENSIONS[file.type];

  if (!extension) {
    throw new Error("This file type is not supported.");
  }

  // The stored name is generated, never taken from the uploaded file name.
  const path = `${user.id}/${kind}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from(KYC_BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(
      "Upload failed. Please check your connection and try again."
    );
  }

  return {
    kind,
    path,
    name: file.name,
    type: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
}

/* Short-lived link for a reviewer to open a stored document. */
export async function getKycDocumentUrl(path) {
  const { data, error } = await supabase.storage
    .from(KYC_BUCKET)
    .createSignedUrl(path, 60);

  if (error || !data?.signedUrl) {
    throw new Error("Could not open this document.");
  }

  return data.signedUrl;
}
