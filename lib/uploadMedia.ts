import { supabase } from "@/lib/supabase";

const MAX_MEDIA_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_MEDIA_TYPES: Record<string, string> = {
  "image/gif": "gif",
  "image/png": "png",
  "image/webp": "webp",
  "image/jpeg": "jpg",
};

function getMediaExtension(file: File) {
  return ALLOWED_MEDIA_TYPES[file.type] ?? null;
}

export async function uploadMedia(file: File, visitorId: string) {
  const extension = getMediaExtension(file);

  if (!extension) {
    console.error("Upload skipped: unsupported file type.");
    return null;
  }

  if (file.size > MAX_MEDIA_SIZE_BYTES) {
    console.error("Upload skipped: file is larger than 5MB.");
    return null;
  }

  const safeVisitorId =
    visitorId.replace(/[^a-zA-Z0-9-_]/g, "") || "anonymous";

  const safeRandomId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const fileName = `${safeVisitorId}/${Date.now()}-${safeRandomId}.${extension}`;

  const { error } = await supabase.storage
    .from("fandom-media")
    .upload(fileName, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    console.error("Upload failed:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("fandom-media").getPublicUrl(fileName);

  return data.publicUrl;
}