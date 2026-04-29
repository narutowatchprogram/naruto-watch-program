import { supabase } from "@/lib/supabase";

function getMediaExtension(file: File) {
  const fileNameExtension = file.name.split(".").pop()?.toLowerCase();

  if (fileNameExtension && fileNameExtension !== file.name.toLowerCase()) {
    return fileNameExtension;
  }

  if (file.type === "image/gif") return "gif";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/jpeg") return "jpg";

  return "png";
}

export async function uploadMedia(file: File, visitorId: string) {
  if (!file.type.startsWith("image/")) {
    console.error("Upload skipped: file is not an image.");
    return null;
  }

  const extension = getMediaExtension(file);
  const safeVisitorId = visitorId.replace(/[^a-zA-Z0-9-_]/g, "");
  const fileName = `${safeVisitorId}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

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
