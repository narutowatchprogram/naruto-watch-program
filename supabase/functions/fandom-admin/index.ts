import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

type AdminAction =
  | "approve-topic-request"
  | "reject-topic-request"
  | "delete-topic-request"
  | "delete-approved-topic"
  | "clear-room-comments"
  | "delete-comment";

type AdminPayload = {
  action: AdminAction;
  requestId?: string;
  topicId?: string;
  commentId?: string;
  topic?: string;
  unlockType?: "arc" | "main-complete";
  series?: "naruto" | "shippuden";
  arcSlug?: string;
  arcTitle?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function generateTopicChannelName(topic: string) {
  const cleanTopic = topic.trim();

  if (!cleanTopic) return "Fan Topic";

  return cleanTopic.replace(/\s+/g, " ").split(" ").slice(0, 5).join(" ");
}

function generateTopicShortCode(topic: string) {
  const letters = topic
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return letters || "FT";
}

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const adminKey = request.headers.get("x-admin-key");
  const expectedAdminKey = Deno.env.get("FANDOM_ADMIN_KEY");

  if (!expectedAdminKey || adminKey !== expectedAdminKey) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Missing Supabase server config" }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  let payload: AdminPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  try {
    if (payload.action === "approve-topic-request") {
      if (!payload.requestId || !payload.topic) {
        return jsonResponse({ error: "Missing requestId or topic" }, 400);
      }

      const { data, error } = await supabase
        .from("topic_requests")
        .update({
          approved_at: new Date().toISOString(),
          approved_by: "Site Creator",
          channel_name: generateTopicChannelName(payload.topic),
          short_code: generateTopicShortCode(payload.topic),
          unlock_type: payload.unlockType,
          series: payload.series,
          arc_slug: payload.arcSlug,
          arc_title: payload.arcTitle,
        })
        .eq("id", payload.requestId)
        .select("*")
        .single();

      if (error) throw error;

      return jsonResponse({ data });
    }

    if (payload.action === "reject-topic-request") {
      if (!payload.requestId) {
        return jsonResponse({ error: "Missing requestId" }, 400);
      }

      const { data, error } = await supabase
        .from("topic_requests")
        .update({
          rejected_at: new Date().toISOString(),
        })
        .eq("id", payload.requestId)
        .select("*")
        .single();

      if (error) throw error;

      return jsonResponse({ data });
    }

    if (payload.action === "delete-topic-request") {
      if (!payload.requestId) {
        return jsonResponse({ error: "Missing requestId" }, 400);
      }

      const { data, error } = await supabase
        .from("topic_requests")
        .update({
          deleted_at: new Date().toISOString(),
          deleted_by: "Site Creator",
        })
        .eq("id", payload.requestId)
        .select("*")
        .single();

      if (error) throw error;

      return jsonResponse({ data });
    }

    if (payload.action === "delete-approved-topic") {
      if (!payload.topicId) {
        return jsonResponse({ error: "Missing topicId" }, 400);
      }

      const requestId = payload.topicId.replace("community-", "");

      const { data, error } = await supabase
        .from("topic_requests")
        .update({
          deleted_at: new Date().toISOString(),
          deleted_by: "Site Creator",
        })
        .eq("id", requestId)
        .select("*")
        .single();

      if (error) throw error;

      return jsonResponse({ data });
    }

    if (payload.action === "clear-room-comments") {
      if (!payload.topicId) {
        return jsonResponse({ error: "Missing topicId" }, 400);
      }

      const { data, error } = await supabase
        .from("comments")
        .update({
          deleted_at: new Date().toISOString(),
          deleted_by: "Site Creator",
          moderation_status: "deleted",
          moderation_reason: "Thread cleared by creator",
        })
        .eq("topic_id", payload.topicId)
        .select("*");

      if (error) throw error;

      return jsonResponse({ data });
    }

    if (payload.action === "delete-comment") {
      if (!payload.commentId) {
        return jsonResponse({ error: "Missing commentId" }, 400);
      }

      const { data, error } = await supabase
        .from("comments")
        .update({
          deleted_at: new Date().toISOString(),
          deleted_by: "Site Creator",
          moderation_status: "deleted",
          moderation_reason: "Deleted by creator",
        })
        .or(`id.eq.${payload.commentId},parent_id.eq.${payload.commentId}`)
        .select("*");

      if (error) throw error;

      return jsonResponse({ data });
    }

    return jsonResponse({ error: "Unknown action" }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});