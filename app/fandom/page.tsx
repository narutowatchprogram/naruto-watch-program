"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { supabase } from "@/lib/supabase";
import { uploadMedia } from "@/lib/uploadMedia";

type Series = "naruto" | "shippuden";

type SavedProgressItem = {
  id: string;
  series: Series | "boruto";
  slug: string;
  title: string;
};

type OldFandomReaction = {
  label: string;
  count?: number;
  userIds?: string[];
};

type FandomReaction = {
  label: string;
  userIds: string[];
};

type FandomComment = {
  id: string;
  author: string;
  verified?: boolean;
  role?: "creator" | "guest";
  body: string;
  parentId?: string;
  reactions: FandomReaction[];
};

type FandomTopic = {
  id: string;
  series: Series;
  arcSlug: string;
  arcTitle: string;
  channelName: string;
  shortCode: string;
  title: string;
  description: string;
  tone: "orange" | "red";
  unlockType: "arc" | "main-complete";
  starterPosts: FandomComment[];
};

type TopicRequest = {
  id: string;
  name: string;
  topic: string;
  note: string;
  createdAt: string;
  status: "pending";
  unlockType: "arc" | "main-complete";
  series: Series;
  arcSlug: string;
  arcTitle: string;
};

type SupabaseCommentRow = {
  id: string;
  topic_id: string;
  parent_id: string | null;
  author: string;
  visitor_id: string;
  body: string;
  created_at: string;
  moderation_status?: string | null;
  moderation_reason?: string | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
};

type SupabaseReactionRow = {
  id: string;
  comment_id: string;
  emoji: string;
  visitor_id: string;
  created_at?: string;
};

type SupabaseTopicRequestRow = {
  id: string;
  name: string;
  topic: string;
  note: string | null;
  status: "pending";
  visitor_id: string | null;
  created_at: string;
  approved_at?: string | null;
  rejected_at?: string | null;
  approved_by?: string | null;
  channel_name?: string | null;
  short_code?: string | null;
  unlock_type?: "arc" | "main-complete" | null;
  series?: Series | null;
  arc_slug?: string | null;
  arc_title?: string | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
};

const STORAGE_KEY = "naruto-watch-program-progress";
const CREATOR_MODE_KEY = "naruto-watch-program-creator-mode";
const FANDOM_COMMENTS_KEY = "naruto-watch-program-fandom-comments";
const VISITOR_ID_KEY = "naruto-watch-program-visitor-id";
const BORUTO_UNLOCK_KEY = "naruto-watch-program-boruto-unlocked";

const quickReactions = ["👍", "👎"];
const COMMENT_COOLDOWN_MS = 8000;
const LAST_COMMENT_TIME_KEY = "naruto-watch-program-last-comment-time";
const LAST_COMMENT_BODY_KEY = "naruto-watch-program-last-comment-body";

const BLOCKED_PHRASES = [
  "http://spam",
  "www.spam",
  "free money",
  "click here now",
  "buy followers",
  "crypto giveaway",
];

const HARSH_LANGUAGE_PATTERNS = [
  /\bkys\b/i,
  /\bkill yourself\b/i,
  /\bgo die\b/i,
];

const topics: FandomTopic[] = [
  {
    id: "chunin-prelims-threats",
    series: "naruto",
    arcSlug: "chunin-exams",
    arcTitle: "Chunin Exams",
    channelName: "Prelim Threat Rankings",
    shortCode: "PT",
    title: "Who are the top 5 threats in the preliminary exams?",
    description:
      "Rank the scariest genin from the prelims based only on what has been shown by this point.",
    tone: "orange",
    unlockType: "arc",
    starterPosts: [],
  },
  {
    id: "sasuke-five-kage-crashout",
    series: "shippuden",
    arcSlug: "five-kage-summit",
    arcTitle: "Five Kage Summit",
    channelName: "Sasuke Summit Debate",
    shortCode: "SS",
    title: "Is Sasuke’s crash out justified?",
    description:
      "Talk through Sasuke’s choices during the summit without jumping past this arc.",
    tone: "red",
    unlockType: "arc",
    starterPosts: [],
  },
  {
    id: "most-evil-people",
    series: "shippuden",
    arcSlug: "main-program-complete",
    arcTitle: "Main Program Complete",
    channelName: "Most Evil List",
    shortCode: "EV",
    title: "Most evil people in Naruto?",
    description:
      "Once the full main story is finished, let's hear who you think is the worst of the worst.",
    tone: "red",
    unlockType: "main-complete",
    starterPosts: [],
  },
  {
    id: "characters-deserve-more-credit",
    series: "shippuden",
    arcSlug: "main-program-complete",
    arcTitle: "Main Program Complete",
    channelName: "Underrated Characters",
    shortCode: "UC",
    title: "Naruto characters that deserve more credit",
    description: "Talk about the characters who did more than people remember.",
    tone: "orange",
    unlockType: "main-complete",
    starterPosts: [],
  },
];

const topicUnlockGates = [
  {
    id: "naruto:land-of-waves",
    label: "Land of Waves",
    helper: "Unlock after Land of Waves",
    unlockType: "arc" as const,
    series: "naruto" as const,
    arcSlug: "land-of-waves",
    arcTitle: "Land of Waves",
  },
  {
    id: "naruto:chunin-exams",
    label: "Chunin Exams",
    helper: "Unlock after Chunin Exams",
    unlockType: "arc" as const,
    series: "naruto" as const,
    arcSlug: "chunin-exams",
    arcTitle: "Chunin Exams",
  },
  {
    id: "naruto:konoha-crush",
    label: "Konoha Crush",
    helper: "Unlock after Konoha Crush",
    unlockType: "arc" as const,
    series: "naruto" as const,
    arcSlug: "konoha-crush",
    arcTitle: "Konoha Crush",
  },
  {
    id: "naruto:search-for-tsunade",
    label: "Search for Tsunade",
    helper: "Unlock after Search for Tsunade",
    unlockType: "arc" as const,
    series: "naruto" as const,
    arcSlug: "search-for-tsunade",
    arcTitle: "Search for Tsunade",
  },
  {
    id: "naruto:sasuke-recovery-mission",
    label: "Sasuke Retrieval",
    helper: "Unlock after Sasuke Retrieval / Sasuke Recovery Mission",
    unlockType: "arc" as const,
    series: "naruto" as const,
    arcSlug: "sasuke-recovery-mission",
    arcTitle: "Sasuke Retrieval",
  },
  {
    id: "shippuden:kazekage-rescue-mission",
    label: "Kazekage Rescue + Tenchi Bridge",
    helper: "Unlock after Kazekage Rescue + Tenchi Bridge",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "kazekage-rescue-mission",
    arcTitle: "Kazekage Rescue + Tenchi Bridge",
  },
  {
    id: "shippuden:akatsuki-suppression",
    label: "Akatsuki Suppression",
    helper: "Unlock after Akatsuki Suppression",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "akatsuki-suppression",
    arcTitle: "Akatsuki Suppression",
  },
  {
    id: "shippuden:itachi-jiraiya-phase",
    label: "Itachi / Jiraiya",
    helper: "Unlock after Itachi Pursuit / Jiraiya the Gallant",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "itachi-jiraiya-phase",
    arcTitle: "Itachi / Jiraiya",
  },
  {
    id: "shippuden:pain-aftermath",
    label: "Pain Arc",
    helper: "Unlock after the full Pain arc, including aftermath",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "pain-aftermath",
    arcTitle: "Pain Arc",
  },
  {
    id: "shippuden:five-kage-summit",
    label: "Five Kage Summit",
    helper: "Unlock after Five Kage Summit",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "five-kage-summit",
    arcTitle: "Five Kage Summit",
  },
  {
    id: "shippuden:war-setup",
    label: "War Arcs — Setup / Countdown",
    helper: "Unlock after Fourth Great Ninja War — Countdown",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "war-setup",
    arcTitle: "War Arcs — Setup / Countdown",
  },
  {
    id: "shippuden:war-phase-1",
    label: "War Arcs — Opening Battles",
    helper: "Unlock after Fourth Great Ninja War — Opening Battles",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "war-phase-1",
    arcTitle: "War Arcs — Opening Battles",
  },
  {
    id: "shippuden:war-phase-5",
    label: "War Arcs — Main Battlefield",
    helper: "Unlock after Fourth Great Ninja War — Main Battlefield",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "war-phase-5",
    arcTitle: "War Arcs — Main Battlefield",
  },
  {
    id: "shippuden:war-phase-11",
    label: "War Arcs — Endgame",
    helper: "Unlock after Fourth Great Ninja War — Final War Run",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "war-phase-11",
    arcTitle: "War Arcs — Endgame",
  },
  {
    id: "shippuden:final-battles-resume",
    label: "Final Arcs — Final Battles",
    helper: "Unlock after Final Battles",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "final-battles-resume",
    arcTitle: "Final Arcs — Final Battles",
  },
  {
    id: "shippuden:ending-run",
    label: "Final Arcs — Ending Run",
    helper: "Unlock after Ending Run",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "ending-run",
    arcTitle: "Final Arcs — Ending Run",
  },
  {
    id: "shippuden:konoha-hiden",
    label: "Final Arcs — Konoha Hiden / Conclusion",
    helper: "Unlock after Konoha Hiden / final conclusion",
    unlockType: "arc" as const,
    series: "shippuden" as const,
    arcSlug: "konoha-hiden",
    arcTitle: "Final Arcs — Konoha Hiden / Conclusion",
  },
  {
    id: "main-complete",
    label: "Main Program Complete",
    helper: "Unlock after Naruto + Shippuden main story",
    unlockType: "main-complete" as const,
    series: "shippuden" as const,
    arcSlug: "main-program-complete",
    arcTitle: "Main Program Complete",
  },
];

function getUnlockGateById(gateId: string) {
  return topicUnlockGates.find((gate) => gate.id === gateId) ?? null;
}

function readProgress(): SavedProgressItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function readCreatorMode() {
  if (typeof window === "undefined") return false;

  try {
    const params = new URLSearchParams(window.location.search);
    const creatorKey = "rasengan-admin";

    if (params.get("creator") === "true" && params.get("key") === creatorKey) {
      window.localStorage.setItem(CREATOR_MODE_KEY, "true");
      return true;
    }

    if (params.get("creator") === "false") {
      window.localStorage.removeItem(CREATOR_MODE_KEY);
      return false;
    }

    return window.localStorage.getItem(CREATOR_MODE_KEY) === "true";
  } catch {
    return false;
  }
}

function readMainProgramComplete() {
  if (typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const progress = raw ? (JSON.parse(raw) as SavedProgressItem[]) : [];

    const completionArcs = new Set([
      "shippuden:final-battles-resume",
      "shippuden:ending-run",
      "shippuden:konoha-hiden",
    ]);

    const completedFinalArc = progress.some((item) =>
      completionArcs.has(item.id)
    );

    return (
      completedFinalArc ||
      window.localStorage.getItem(BORUTO_UNLOCK_KEY) === "true"
    );
  } catch {
    return false;
  }
}

function getVisitorId() {
  if (typeof window === "undefined") return "server";

  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;

  const next =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? `visitor-${crypto.randomUUID()}`
      : `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(VISITOR_ID_KEY, next);
  return next;
}

function normalizeReaction(
  reaction: OldFandomReaction,
  commentId: string,
  index: number
): FandomReaction | null {
  if (!reaction || typeof reaction.label !== "string") return null;

  if (Array.isArray(reaction.userIds)) {
    return {
      label: reaction.label,
      userIds: reaction.userIds.filter((id) => typeof id === "string"),
    };
  }

  const legacyCount =
    typeof reaction.count === "number" && reaction.count > 0
      ? Math.floor(reaction.count)
      : 0;

  return {
    label: reaction.label,
    userIds: Array.from(
      { length: legacyCount },
      (_, userIndex) => `legacy-${commentId}-${index}-${userIndex}`
    ),
  };
}

function normalizeComment(comment: any): FandomComment | null {
  if (!comment || typeof comment.body !== "string") return null;

  const id =
    typeof comment.id === "string" && comment.id.length > 0
      ? comment.id
      : `comment-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const reactions = Array.isArray(comment.reactions)
    ? comment.reactions
        .map((reaction: OldFandomReaction, index: number) =>
          normalizeReaction(reaction, id, index)
        )
        .filter(Boolean)
    : [];

  return {
    id,
    author:
      typeof comment.author === "string" && comment.author.trim()
        ? comment.author
        : "Guest Shinobi",
    verified: Boolean(comment.verified),
    role: comment.role === "creator" ? "creator" : "guest",
    body: comment.body,
    parentId:
      typeof comment.parentId === "string" ? comment.parentId : undefined,
    reactions: reactions as FandomReaction[],
  };
}

function readLocalSavedComments(): Record<string, FandomComment[]> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(FANDOM_COMMENTS_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const normalized: Record<string, FandomComment[]> = {};

    Object.entries(parsed).forEach(([topicId, comments]) => {
      if (!Array.isArray(comments)) return;

      normalized[topicId] = comments
        .map((comment) => normalizeComment(comment))
        .filter(Boolean) as FandomComment[];
    });

    return normalized;
  } catch {
    return {};
  }
}

function groupSupabaseComments(rows: SupabaseCommentRow[]) {
  const grouped: Record<string, FandomComment[]> = {};

  rows.forEach((row) => {
    if (row.deleted_at) return;
    if (row.moderation_status && row.moderation_status !== "visible") return;

    if (!grouped[row.topic_id]) grouped[row.topic_id] = [];

    grouped[row.topic_id].push({
      id: row.id,
      author: row.author,
      verified: row.author === "Site Creator",
      role: row.author === "Site Creator" ? "creator" : "guest",
      body: row.body,
      parentId: row.parent_id ?? undefined,
      reactions: [],
    });
  });

  return grouped;
}

function mergeReactionsIntoComments(
  comments: Record<string, FandomComment[]>,
  reactions: SupabaseReactionRow[]
) {
  const reactionMap: Record<string, Record<string, Set<string>>> = {};

  reactions.forEach((reaction) => {
    if (!reactionMap[reaction.comment_id]) {
      reactionMap[reaction.comment_id] = {};
    }

    if (!reactionMap[reaction.comment_id][reaction.emoji]) {
      reactionMap[reaction.comment_id][reaction.emoji] = new Set();
    }

    reactionMap[reaction.comment_id][reaction.emoji].add(reaction.visitor_id);
  });

  const next: Record<string, FandomComment[]> = {};

  Object.entries(comments).forEach(([topicId, commentsForTopic]) => {
    next[topicId] = commentsForTopic.map((comment) => {
      const reactionsForComment = reactionMap[comment.id] ?? {};

      return {
        ...comment,
        reactions: Object.entries(reactionsForComment).map(
          ([emoji, userIds]) => ({
            label: emoji,
            userIds: Array.from(userIds),
          })
        ),
      };
    });
  });

  return next;
}

function groupTopicRequests(rows: SupabaseTopicRequestRow[]): TopicRequest[] {
  return rows.filter((row) => !row.deleted_at).map((row) => ({
    id: row.id,
    name: row.name,
    topic: row.topic,
    note: row.note ?? "",
    createdAt: row.created_at,
    status: "pending",
    unlockType: row.unlock_type === "arc" ? "arc" : "main-complete",
    series: row.series === "naruto" ? "naruto" : "shippuden",
    arcSlug: row.arc_slug || "main-program-complete",
    arcTitle: row.arc_title || "Main Program Complete",
  }));
}

function groupApprovedTopicRequests(rows: SupabaseTopicRequestRow[]): FandomTopic[] {
  return rows.filter((row) => !row.deleted_at).map((row, index) => ({
    id: `community-${row.id}`,
    series: row.series === "naruto" ? "naruto" : "shippuden",
    arcSlug: row.arc_slug || "main-program-complete",
    arcTitle: row.arc_title || "Main Program Complete",
    channelName: row.channel_name || generateTopicChannelName(row.topic),
    shortCode: row.short_code || generateTopicShortCode(row.topic),
    title: row.topic,
    description:
      row.note?.trim() ||
      `Community discussion submitted by ${row.name || "Guest Shinobi"}.`,
    tone: index % 2 === 0 ? "orange" : "red",
    unlockType: row.unlock_type === "arc" ? "arc" : "main-complete",
    starterPosts: [],
  }));
}

function generateTopicChannelName(topic: string) {
  const cleanTopic = topic.trim();

  if (!cleanTopic) return "Fan Topic";

  return cleanTopic
    .replace(/\s+/g, " ")
    .split(" ")
    .slice(0, 5)
    .join(" ");
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

function normalizeForModeration(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function getModerationBlockReason(text: string) {
  const cleaned = normalizeForModeration(text);

  if (!cleaned) return "Write something before posting.";
  if (cleaned.length < 2) return "Post is too short.";

  if (/^(.)\1{5,}$/.test(cleaned)) {
    return "This looks like spam.";
  }

  if (BLOCKED_PHRASES.some((phrase) => cleaned.includes(phrase))) {
    return "This looks like spam.";
  }

  if (HARSH_LANGUAGE_PATTERNS.some((pattern) => pattern.test(cleaned))) {
    return "That comment crosses the line. Try rewording it.";
  }

  const urls = cleaned.match(/https?:\/\//g) ?? [];
  if (urls.length > 2) {
    return "Too many links in one post.";
  }

  return null;
}

function getCommentCooldownReason(body: string) {
  if (typeof window === "undefined") return null;

  const lastTime = Number(window.localStorage.getItem(LAST_COMMENT_TIME_KEY) ?? "0");
  const lastBody = window.localStorage.getItem(LAST_COMMENT_BODY_KEY) ?? "";
  const now = Date.now();
  const normalizedBody = normalizeForModeration(body);

  if (lastBody && lastBody === normalizedBody) {
    return "Duplicate message blocked.";
  }

  if (lastTime && now - lastTime < COMMENT_COOLDOWN_MS) {
    return "Slow down a bit before posting again.";
  }

  return null;
}

function rememberLastComment(body: string) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(LAST_COMMENT_TIME_KEY, String(Date.now()));
  window.localStorage.setItem(LAST_COMMENT_BODY_KEY, normalizeForModeration(body));
}

function topicIsUnlocked(
  topic: FandomTopic,
  completed: Set<string>,
  creatorMode: boolean,
  mainProgramComplete: boolean
) {
  if (creatorMode) return true;

  if (topic.unlockType === "main-complete") {
    return mainProgramComplete;
  }

  return completed.has(`${topic.series}:${topic.arcSlug}`);
}

function getArcPath(topic: FandomTopic) {
  if (topic.unlockType === "main-complete") return "/shippuden";

  return topic.series === "naruto"
    ? `/program/${topic.arcSlug}`
    : `/shippuden/${topic.arcSlug}`;
}

function getToneClasses(topic: FandomTopic) {
  if (topic.tone === "red") {
    return {
      softText: "text-red-300",
      glow: "shadow-[0_0_40px_rgba(239,68,68,0.22)]",
      dot: "bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.8)]",
      roomActive:
        "bg-red-500/15 text-red-100 before:bg-red-400 after:bg-red-400/40",
      roomInactive:
        "text-zinc-400 hover:bg-red-500/10 hover:text-red-100 before:bg-red-400/0 hover:before:bg-red-400/60",
      message: "border-red-300/20 bg-red-500/[0.09]",
      pill: "border-red-300/25 bg-red-500/10 text-red-100",
    };
  }

  return {
    softText: "text-orange-300",
    glow: "shadow-[0_0_40px_rgba(249,115,22,0.22)]",
    dot: "bg-orange-300 shadow-[0_0_18px_rgba(253,186,116,0.8)]",
    roomActive:
      "bg-orange-500/15 text-orange-100 before:bg-orange-300 after:bg-orange-300/40",
    roomInactive:
      "text-zinc-400 hover:bg-orange-500/10 hover:text-orange-100 before:bg-orange-300/0 hover:before:bg-orange-300/60",
    message: "border-orange-300/20 bg-orange-500/[0.09]",
    pill: "border-orange-300/25 bg-orange-500/10 text-orange-100",
  };
}

function extractMediaUrl(text: string) {
  const urls = text.match(/https?:\/\/\S+/gi) ?? [];

  return (
    urls.find((url) => {
      const cleanUrl = url.toLowerCase();

      return (
        /\.(gif|png|jpe?g|webp)(\?|$)/i.test(cleanUrl) ||
        cleanUrl.includes("giphy.com") ||
        cleanUrl.includes("tenor.com") ||
        cleanUrl.includes("media.tenor.com") ||
        cleanUrl.includes("supabase")
      );
    }) ?? null
  );
}

function extractMediaUrlFromHtml(html: string) {
  const srcMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return srcMatch?.[1] ?? null;
}

function stripMediaUrl(text: string, mediaUrl: string | null) {
  if (!mediaUrl) return text;
  return text.replace(mediaUrl, "").trim();
}

function containsUnsupportedGifPage(text: string) {
  return /https?:\/\/(www\.)?(giphy\.com|tenor\.com)\//i.test(text);
}

function getReplyPreview(body: string) {
  const textOnly = stripMediaUrl(body, extractMediaUrl(body));
  const cleanText = textOnly.replace(/\s+/g, " ").trim();

  if (!cleanText) return "Media reply";

  return cleanText.length > 120 ? `${cleanText.slice(0, 120)}…` : cleanText;
}

function VerifiedStamp() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-sky-300/30 bg-sky-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-sky-200">
      <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-sky-300 text-[9px] text-black">
        ✓
      </span>
      Verified
    </span>
  );
}

function CommentBody({ body }: { body: string }) {
  const mediaUrl = extractMediaUrl(body);
  const text = stripMediaUrl(body, mediaUrl);

  return (
    <div className="max-w-3xl">
      {text && (
        <p className="text-sm leading-7 text-zinc-300 sm:text-base">{text}</p>
      )}

      {mediaUrl && (
        <a
          href={mediaUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 block max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-black/35"
        >
          <img
            src={mediaUrl}
            alt="Shared media"
            className="max-h-72 w-full object-cover"
          />
        </a>
      )}
    </div>
  );
}

export default function FandomPage() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [creatorMode, setCreatorMode] = useState(false);
  const [mainProgramComplete, setMainProgramComplete] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [activeTopicId, setActiveTopicId] = useState(topics[0]?.id ?? "");
  const [savedComments, setSavedComments] = useState<
    Record<string, FandomComment[]>
  >({});
  const [topicRequests, setTopicRequests] = useState<TopicRequest[]>([]);
  const [approvedTopics, setApprovedTopics] = useState<FandomTopic[]>([]);
  const [guestName, setGuestName] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestName, setRequestName] = useState("");
  const [requestTopic, setRequestTopic] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [requestGateId, setRequestGateId] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [emojiPickerCommentId, setEmojiPickerCommentId] = useState<
    string | null
  >(null);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [mediaHint, setMediaHint] = useState("");
  const [moderationAlert, setModerationAlert] = useState("");
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function syncProgress() {
      const saved = readProgress();
      const currentVisitorId = getVisitorId();

      setCompletedIds(new Set(saved.map((item) => item.id)));
      setCreatorMode(readCreatorMode());
      setMainProgramComplete(readMainProgramComplete());
      setVisitorId(currentVisitorId);

      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Failed to load comments:", error.message);
        setSavedComments(readLocalSavedComments());
        return;
      }

      const remoteRows = (data ?? []) as SupabaseCommentRow[];
      const remoteIds = new Set(remoteRows.map((row) => row.id));
      const localComments = readLocalSavedComments();

      const localRowsToMigrate = Object.entries(localComments).flatMap(
        ([topicId, comments]) =>
          comments
            .filter((comment) => !remoteIds.has(comment.id))
            .map((comment) => ({
              id: comment.id,
              topic_id: topicId,
              parent_id: comment.parentId ?? null,
              author: comment.author,
              visitor_id: currentVisitorId,
              body: comment.body,
            }))
      );

      if (localRowsToMigrate.length > 0) {
        await supabase.from("comments").upsert(localRowsToMigrate, {
          onConflict: "id",
          ignoreDuplicates: true,
        });
      }

      const { data: refreshedData, error: refreshedError } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: true });

      if (refreshedError) {
        console.error("Failed to reload comments:", refreshedError.message);
        setSavedComments(groupSupabaseComments(remoteRows));
        return;
      }

      const groupedComments = groupSupabaseComments(
        (refreshedData ?? []) as SupabaseCommentRow[]
      );

      const { data: reactionData, error: reactionError } = await supabase
        .from("reactions")
        .select("*");

      if (reactionError) {
        console.error("Failed to load reactions:", reactionError.message);
        setSavedComments(groupedComments);
      } else {
        setSavedComments(
          mergeReactionsIntoComments(
            groupedComments,
            (reactionData ?? []) as SupabaseReactionRow[]
          )
        );
      }

      const { data: requestData, error: requestError } = await supabase
        .from("topic_requests")
        .select("*")
        .is("approved_at", null)
        .is("rejected_at", null)
        .order("created_at", { ascending: false });

      if (requestError) {
        console.error("Failed to load topic requests:", requestError.message);
      } else {
        setTopicRequests(
          groupTopicRequests((requestData ?? []) as SupabaseTopicRequestRow[])
        );
      }

      const { data: approvedData, error: approvedError } = await supabase
        .from("topic_requests")
        .select("*")
        .not("approved_at", "is", null)
        .is("rejected_at", null)
        .order("approved_at", { ascending: false });

      if (approvedError) {
        console.error("Failed to load approved topics:", approvedError.message);
      } else {
        setApprovedTopics(
          groupApprovedTopicRequests(
            (approvedData ?? []) as SupabaseTopicRequestRow[]
          )
        );
      }
    }

    syncProgress();
    window.addEventListener("naruto-progress-updated", syncProgress);

    return () => {
      window.removeEventListener("naruto-progress-updated", syncProgress);
    };
  }, []);

  const allTopics = useMemo(() => {
    return [...topics, ...approvedTopics];
  }, [approvedTopics]);

  const filteredTopics = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return allTopics;

    return allTopics.filter((topic) => {
      return [
        topic.channelName,
        topic.shortCode,
        topic.arcTitle,
        topic.title,
        topic.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [allTopics, searchQuery]);

  const unlockedTopics = useMemo(() => {
    return allTopics.filter((topic) =>
      topicIsUnlocked(topic, completedIds, creatorMode, mainProgramComplete)
    );
  }, [allTopics, completedIds, creatorMode, mainProgramComplete]);

  const activeTopic =
    allTopics.find((topic) => topic.id === activeTopicId) ?? allTopics[0];

  const activeUnlocked = activeTopic
    ? topicIsUnlocked(
        activeTopic,
        completedIds,
        creatorMode,
        mainProgramComplete
      )
    : false;

  const activeTone = activeTopic ? getToneClasses(activeTopic) : null;

  const currentComments = activeTopic
    ? [...activeTopic.starterPosts, ...(savedComments[activeTopic.id] ?? [])]
    : [];

  const topLevelComments = currentComments.filter(
    (comment) => !comment.parentId
  );

  const replyingToComment = replyingToId
    ? currentComments.find((comment) => comment.id === replyingToId) ?? null
    : null;

  function getReplies(commentId: string) {
    return currentComments.filter((comment) => comment.parentId === commentId);
  }

  async function refreshReactions() {
    const { data, error } = await supabase.from("reactions").select("*");

    if (error) {
      console.error("Failed to refresh reactions:", error.message);
      return;
    }

    setSavedComments(
      mergeReactionsIntoComments(
        savedComments,
        (data ?? []) as SupabaseReactionRow[]
      )
    );
  }

  async function toggleReaction(commentId: string, emoji: string) {
    if (!activeTopic || !visitorId || !emoji.trim()) return;

    const cleanEmoji = emoji.trim();

    const currentComment = (savedComments[activeTopic.id] ?? []).find(
      (comment) => comment.id === commentId
    );

    const existingReaction = currentComment?.reactions.find(
      (reaction) => reaction.label === cleanEmoji
    );

    const alreadyReacted =
      existingReaction?.userIds.includes(visitorId) ?? false;

    if (alreadyReacted) {
      const { error } = await supabase.from("reactions").delete().match({
        comment_id: commentId,
        emoji: cleanEmoji,
        visitor_id: visitorId,
      });

      if (error) {
        console.error("Failed to remove reaction:", error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("reactions").upsert(
        {
          comment_id: commentId,
          emoji: cleanEmoji,
          visitor_id: visitorId,
        },
        {
          onConflict: "comment_id,emoji,visitor_id",
          ignoreDuplicates: true,
        }
      );

      if (error) {
        console.error("Failed to add reaction:", error.message);
        return;
      }
    }

    setEmojiPickerCommentId(null);
    await refreshReactions();
  }

  async function clearMyReactions(commentId: string) {
    if (!visitorId) return;

    const { error } = await supabase
      .from("reactions")
      .delete()
      .match({ comment_id: commentId, visitor_id: visitorId });

    if (error) {
      console.error("Failed to clear reactions:", error.message);
      return;
    }

    await refreshReactions();
  }

  function appendMediaUrlToComment(mediaUrl: string) {
    setMediaHint("Media added. Post when ready.");
    setCommentBody((currentBody) => {
      const spacer = currentBody.trim().length > 0 ? " " : "";
      return `${currentBody}${spacer}${mediaUrl}`;
    });
  }

  async function uploadMediaFiles(files: File[]) {
    if (!visitorId || files.length === 0) return;

    setMediaUploading(true);

    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;

        const mediaUrl = await uploadMedia(file, visitorId);

        if (mediaUrl) {
          appendMediaUrlToComment(mediaUrl);
        } else {
          setMediaHint("Upload failed. Try a smaller GIF/image or another file.");
        }
      }
    } finally {
      setMediaUploading(false);
    }
  }

  async function handleMediaFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files ?? []);
    await uploadMediaFiles(files);
    event.target.value = "";
  }

  async function handlePaste(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    if (!visitorId) return;

    const pastedImageFiles = Array.from(event.clipboardData.items)
      .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter((file): file is File => Boolean(file));

    if (pastedImageFiles.length > 0) {
      event.preventDefault();
      await uploadMediaFiles(pastedImageFiles);
      return;
    }

    const html = event.clipboardData.getData("text/html");
    const htmlMediaUrl = html ? extractMediaUrlFromHtml(html) : null;

    if (htmlMediaUrl) {
      event.preventDefault();
      appendMediaUrlToComment(htmlMediaUrl);
      return;
    }

    const plainText = event.clipboardData.getData("text/plain");
    const plainMediaUrl = extractMediaUrl(plainText);

    if (plainMediaUrl) {
      event.preventDefault();
      appendMediaUrlToComment(plainMediaUrl);
      return;
    }

    if (containsUnsupportedGifPage(plainText)) {
      setMediaHint("That GIF link may not animate here. Use + Media to upload the GIF file, or paste a direct .gif link.");
      return;
    }

    if (plainText.trim().length > 0) {
      setMediaHint("");
    }
  }

  async function handlePost() {
    if (!activeTopic || !commentBody.trim() || !visitorId) return;

    const cleanedBody = commentBody.trim();
    const moderationReason = getModerationBlockReason(cleanedBody);
    if (moderationReason) {
      setModerationAlert(moderationReason);
      return;
    }

    const cooldownReason = getCommentCooldownReason(cleanedBody);
    if (!creatorMode && cooldownReason) {
      setModerationAlert(cooldownReason);
      return;
    }

    const existingComments = savedComments[activeTopic.id] ?? [];
    const duplicateInThread = existingComments.some(
      (comment) => normalizeForModeration(comment.body) === normalizeForModeration(cleanedBody)
    );

    if (!creatorMode && duplicateInThread) {
      setModerationAlert("That message already exists in this room.");
      return;
    }

    const author = creatorMode
      ? "Site Creator"
      : guestName.trim() || "Guest Shinobi";

    const id = `${activeTopic.id}-${Date.now()}`;

    const newComment: FandomComment = {
      id,
      author,
      role: creatorMode ? "creator" : "guest",
      verified: creatorMode,
      body: cleanedBody,
      parentId: replyingToId ?? undefined,
      reactions: [],
    };

    const { error } = await supabase.from("comments").insert({
      id,
      topic_id: activeTopic.id,
      parent_id: replyingToId ?? null,
      author,
      visitor_id: visitorId,
      body: cleanedBody,
    });

    if (error) {
      console.error("Failed to post comment:", error.message);
      window.alert("Could not post comment. Try again.");
      return;
    }

    const nextTopicComments = [
      ...(savedComments[activeTopic.id] ?? []),
      newComment,
    ];

    setSavedComments({
      ...savedComments,
      [activeTopic.id]: nextTopicComments,
    });

    rememberLastComment(cleanedBody);
    setCommentBody("");
    setMediaHint("");
    setModerationAlert("");
    setReplyingToId(null);
  }

  async function handleDelete(commentId: string) {
    if (!activeTopic || !creatorMode) return;

    const softDelete = await supabase
      .from("comments")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: "Site Creator",
        moderation_status: "deleted",
        moderation_reason: "Deleted by creator",
      })
      .or(`id.eq.${commentId},parent_id.eq.${commentId}`);

    if (softDelete.error) {
      const hardDelete = await supabase
        .from("comments")
        .delete()
        .or(`id.eq.${commentId},parent_id.eq.${commentId}`);

      if (hardDelete.error) {
        console.error("Failed to delete comment:", hardDelete.error.message);
        window.alert("Could not delete comment. Try again.");
        return;
      }
    }

    const nextTopicComments = (savedComments[activeTopic.id] ?? []).filter(
      (comment) => comment.id !== commentId && comment.parentId !== commentId
    );

    setSavedComments({
      ...savedComments,
      [activeTopic.id]: nextTopicComments,
    });
  }

  async function handleTopicRequestSubmit() {
    if (!requestTopic.trim() || !visitorId) return;

    const requestModerationReason = getModerationBlockReason(
      `${requestTopic.trim()} ${requestNote.trim()}`
    );

    if (requestModerationReason) {
      window.alert(requestModerationReason);
      return;
    }

    const name = requestName.trim() || "Guest Shinobi";
    const topic = requestTopic.trim();
    const note = requestNote.trim();
    const unlockGate = getUnlockGateById(requestGateId);

    if (!unlockGate) {
      window.alert("Choose where this room should unlock.");
      return;
    }

    const { data, error } = await supabase
      .from("topic_requests")
      .insert({
        name,
        topic,
        note,
        visitor_id: visitorId,
        unlock_type: unlockGate.unlockType,
        series: unlockGate.series,
        arc_slug: unlockGate.arcSlug,
        arc_title: unlockGate.arcTitle,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Failed to submit topic request:", error.message);
      window.alert("Could not send topic request. Try again.");
      return;
    }

    const newRequest = groupTopicRequests([
      data as SupabaseTopicRequestRow,
    ])[0];

    setTopicRequests([newRequest, ...topicRequests]);
    setRequestName("");
    setRequestTopic("");
    setRequestNote("");
    setRequestGateId("");
    setRequestSubmitted(true);

    window.setTimeout(() => {
      setRequestSubmitted(false);
    }, 3000);
  }

  async function approveTopicRequest(request: TopicRequest) {
    const { data, error } = await supabase
      .from("topic_requests")
      .update({
        approved_at: new Date().toISOString(),
        approved_by: "Site Creator",
        channel_name: generateTopicChannelName(request.topic),
        short_code: generateTopicShortCode(request.topic),
        unlock_type: request.unlockType,
        series: request.series,
        arc_slug: request.arcSlug,
        arc_title: request.arcTitle,
      })
      .eq("id", request.id)
      .select("*")
      .single();

    if (error) {
      console.error("Failed to approve topic request:", error.message);
      window.alert("Could not approve topic request. Try again.");
      return;
    }

    setTopicRequests((currentRequests) =>
      currentRequests.filter((currentRequest) => currentRequest.id !== request.id)
    );

    setApprovedTopics((currentTopics) => [
      ...groupApprovedTopicRequests([data as SupabaseTopicRequestRow]),
      ...currentTopics,
    ]);
  }

  async function rejectTopicRequest(requestId: string) {
    const { error } = await supabase
      .from("topic_requests")
      .update({
        rejected_at: new Date().toISOString(),
      })
      .eq("id", requestId);

    if (error) {
      console.error("Failed to reject topic request:", error.message);
      window.alert("Could not reject topic request. Try again.");
      return;
    }

    setTopicRequests((currentRequests) =>
      currentRequests.filter((currentRequest) => currentRequest.id !== requestId)
    );
  }


  async function deleteTopicRequest(requestId: string) {
    if (!creatorMode) return;

    const softDelete = await supabase
      .from("topic_requests")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: "Site Creator",
      })
      .eq("id", requestId);

    if (softDelete.error) {
      const hardDelete = await supabase
        .from("topic_requests")
        .delete()
        .eq("id", requestId);

      if (hardDelete.error) {
        console.error("Failed to delete topic request:", hardDelete.error.message);
        window.alert("Could not delete topic request. Try again.");
        return;
      }
    }

    setTopicRequests((currentRequests) =>
      currentRequests.filter((currentRequest) => currentRequest.id !== requestId)
    );
  }

  async function deleteApprovedTopic(topicId: string) {
    if (!creatorMode) return;

    const requestId = topicId.replace("community-", "");

    const softDelete = await supabase
      .from("topic_requests")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: "Site Creator",
      })
      .eq("id", requestId);

    if (softDelete.error) {
      const fallbackReject = await supabase
        .from("topic_requests")
        .update({
          rejected_at: new Date().toISOString(),
        })
        .eq("id", requestId);

      if (fallbackReject.error) {
        console.error("Failed to delete approved topic:", fallbackReject.error.message);
        window.alert("Could not delete room. Try again.");
        return;
      }
    }

    setApprovedTopics((currentTopics) =>
      currentTopics.filter((currentTopic) => currentTopic.id !== topicId)
    );

    if (activeTopicId === topicId) {
      setActiveTopicId(topics[0]?.id ?? "");
    }
  }


  async function deleteAllCommentsInActiveRoom() {
    if (!creatorMode || !activeTopic) return;

    const confirmed = window.confirm(
      `Delete all comments in ${activeTopic.channelName}? This keeps the room but clears the thread.`
    );

    if (!confirmed) return;

    const softDelete = await supabase
      .from("comments")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: "Site Creator",
        moderation_status: "deleted",
        moderation_reason: "Thread cleared by creator",
      })
      .eq("topic_id", activeTopic.id);

    if (softDelete.error) {
      const hardDelete = await supabase
        .from("comments")
        .delete()
        .eq("topic_id", activeTopic.id);

      if (hardDelete.error) {
        console.error("Failed to clear room comments:", hardDelete.error.message);
        window.alert("Could not clear comments. Try again.");
        return;
      }
    }

    setSavedComments({
      ...savedComments,
      [activeTopic.id]: [],
    });
  }

  function hasMyReaction(comment: FandomComment, emoji: string) {
    return (comment.reactions ?? []).some(
      (reaction) =>
        reaction.label === emoji &&
        Array.isArray(reaction.userIds) &&
        reaction.userIds.includes(visitorId)
    );
  }

  function hasAnyMyReaction(comment: FandomComment) {
    return (comment.reactions ?? []).some(
      (reaction) =>
        Array.isArray(reaction.userIds) && reaction.userIds.includes(visitorId)
    );
  }

  function ReactionControls({ comment }: { comment: FandomComment }) {
    const safeReactions = Array.isArray(comment.reactions)
      ? comment.reactions
      : [];
    const pickerOpen = emojiPickerCommentId === comment.id;

    return (
      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        {quickReactions.map((emoji) => {
          const active = hasMyReaction(comment, emoji);
          const existing = safeReactions.find(
            (reaction) => reaction.label === emoji
          );

          return (
            <button
              key={emoji}
              type="button"
              onClick={() => toggleReaction(comment.id, emoji)}
              className={[
                "rounded-full border px-3 py-1.5 text-xs font-black transition active:scale-95",
                active
                  ? "border-sky-300/50 bg-sky-400/15 text-sky-100"
                  : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]",
              ].join(" ")}
            >
              {emoji} {existing?.userIds?.length ?? 0}
            </button>
          );
        })}

        {safeReactions
          .filter((reaction) => !quickReactions.includes(reaction.label))
          .map((reaction) => {
            const userIds = Array.isArray(reaction.userIds)
              ? reaction.userIds
              : [];
            const active = userIds.includes(visitorId);

            return (
              <button
                key={reaction.label}
                type="button"
                onClick={() => toggleReaction(comment.id, reaction.label)}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs font-black transition active:scale-95",
                  active
                    ? "border-sky-300/50 bg-sky-400/15 text-sky-100"
                    : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]",
                ].join(" ")}
              >
                {reaction.label} {userIds.length}
              </button>
            );
          })}

        <button
          type="button"
          onClick={() =>
            setEmojiPickerCommentId((current) =>
              current === comment.id ? null : comment.id
            )
          }
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-black text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
        >
          + emoji
        </button>

        {pickerOpen && (
          <div className="absolute left-0 top-10 z-50 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
            <EmojiPicker
              theme={Theme.DARK}
              width={320}
              height={360}
              previewConfig={{ showPreview: false }}
              onEmojiClick={(emojiData) => {
                toggleReaction(comment.id, emojiData.emoji);
              }}
            />
          </div>
        )}

        {hasAnyMyReaction(comment) && (
          <button
            type="button"
            onClick={() => clearMyReactions(comment.id)}
            className="rounded-full px-3 py-1.5 text-xs font-black text-zinc-500 transition hover:text-white"
          >
            Undo reactions
          </button>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] px-3 py-4 text-white sm:px-6 sm:py-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(249,115,22,0.22),transparent_28%),radial-gradient(circle_at_92%_12%,rgba(59,130,246,0.14),transparent_24%),radial-gradient(circle_at_70%_92%,rgba(239,68,68,0.13),transparent_30%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:58px_58px]" />

      <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/88 shadow-[0_24px_90px_rgba(0,0,0,0.72)] backdrop-blur-xl sm:rounded-[2.5rem]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/70 to-transparent" />

        <div className="grid xl:grid-cols-[360px_1fr]">
          <aside className="border-b border-white/10 bg-black/30 xl:border-b-0 xl:border-r">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                    Fandom
                  </p>
                  <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                    Arc rooms
                  </h1>
                </div>

                <Link
                  href="/"
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-black text-zinc-300 transition active:scale-95"
                >
                  Home
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="rounded-full border border-orange-300/25 bg-orange-400/10 px-3 py-1.5 text-xs font-black text-orange-100">
                  {unlockedTopics.length} open
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-zinc-300">
                  {allTopics.length} rooms
                </div>
                {creatorMode && (
                  <div className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1.5 text-xs font-black text-sky-200">
                    Creator mode
                  </div>
                )}
              </div>

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search rooms..."
                className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-base font-bold text-white outline-none placeholder:text-white/30"
              />
            </div>

            <div className="px-4 pb-5 sm:px-6">
              <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 xl:mx-0 xl:overflow-visible xl:px-0 xl:pb-0">
                <div className="flex gap-3 xl:flex-col">
                  {filteredTopics.length === 0 && (
                    <div className="min-w-full rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm font-bold text-zinc-500">
                      No rooms found.
                    </div>
                  )}

                  {filteredTopics.map((topic) => {
                    const unlocked = topicIsUnlocked(
                      topic,
                      completedIds,
                      creatorMode,
                      mainProgramComplete
                    );
                    const active = activeTopic?.id === topic.id;
                    const tone = getToneClasses(topic);
                    const topicComments = savedComments[topic.id] ?? [];
                    const replyCount = topicComments.length;

                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => {
                          setActiveTopicId(topic.id);
                          setReplyingToId(null);
                          setEmojiPickerCommentId(null);
                          setModerationAlert("");
                        }}
                        className={[
                          "group relative flex min-h-[104px] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[1.45rem] border p-4 text-left transition active:scale-[0.98] sm:w-[360px] xl:w-full",
                          active
                            ? "border-orange-300/35 bg-orange-400/[0.12] shadow-[0_0_35px_rgba(249,115,22,0.16)]"
                            : "border-white/10 bg-white/[0.035] hover:bg-white/[0.06]",
                          !unlocked ? "opacity-65" : "",
                        ].join(" ")}
                      >
                        <div className="pointer-events-none absolute -right-10 -top-14 h-28 w-28 rounded-full bg-orange-400/10 blur-2xl" />

                        <div className="relative flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={[
                                  "h-2.5 w-2.5 shrink-0 rounded-full",
                                  unlocked ? tone.dot : "bg-zinc-700",
                                ].join(" ")}
                              />
                              <p className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-orange-200/90">
                                {topic.arcTitle}
                              </p>
                            </div>

                            <p className="mt-2 text-lg font-black leading-tight text-white">
                              {topic.channelName}
                            </p>
                          </div>

                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/35 text-xs font-black text-zinc-200">
                            {topic.shortCode}
                          </span>
                        </div>

                        <div className="relative mt-3 flex items-center justify-between gap-3 text-xs font-bold text-zinc-400">
                          <span>{unlocked ? "Open" : "Sealed"}</span>
                          <span>{replyCount} posts</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <details className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035]">
                <summary className="cursor-pointer list-none px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-orange-300">
                  Request a room
                </summary>

                <div className="border-t border-white/10 px-4 pb-4 pt-3">
                  <input
                    value={requestTopic}
                    onChange={(event) => setRequestTopic(event.target.value)}
                    placeholder="Topic idea"
                    className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-white/30"
                  />

                  <input
                    value={requestName}
                    onChange={(event) => setRequestName(event.target.value)}
                    placeholder="Name optional"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-white/30"
                  />

                  <label className="mt-3 block">
                    <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                      Unlock point
                    </span>

                    <select
                      value={requestGateId}
                      onChange={(event) => setRequestGateId(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-bold text-white outline-none"
                    >
                      <option value="" className="bg-zinc-950 text-white">
                        Choose arc / progression gate
                      </option>
                      {topicUnlockGates.map((gate) => (
                        <option
                          key={gate.id}
                          value={gate.id}
                          className="bg-zinc-950 text-white"
                        >
                          {gate.label}
                        </option>
                      ))}
                    </select>

                    <span className="mt-2 block text-xs font-bold leading-5 text-zinc-500">
                      {getUnlockGateById(requestGateId)?.helper ??
                        "Choose where this topic becomes spoiler-safe."}
                    </span>
                  </label>

                  <textarea
                    value={requestNote}
                    onChange={(event) => setRequestNote(event.target.value)}
                    placeholder="Discussion prompt"
                    rows={3}
                    className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-white/30"
                  />

                  <button
                    type="button"
                    onClick={handleTopicRequestSubmit}
                    disabled={!requestTopic.trim() || !requestGateId}
                    className="mt-3 w-full rounded-2xl border border-orange-300/25 bg-orange-400/10 px-4 py-3 text-sm font-black text-orange-100 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Send for approval
                  </button>

                  {requestSubmitted && (
                    <p className="mt-2 text-xs font-bold text-sky-200">
                      Sent. Creator approval comes later.
                    </p>
                  )}

                  {creatorMode && topicRequests.length > 0 && (
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-200">
                          Pending ideas
                        </p>
                        <p className="rounded-full border border-sky-300/20 bg-sky-400/10 px-2 py-1 text-[10px] font-black text-sky-200">
                          {topicRequests.length}
                        </p>
                      </div>

                      <div className="mt-3 space-y-3">
                        {topicRequests.map((request) => (
                          <div
                            key={request.id}
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-xs text-zinc-300"
                          >
                            <p className="font-black text-white">
                              {request.topic}
                            </p>
                            <p className="mt-1 text-zinc-500">
                              From {request.name}
                            </p>
                            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em] text-orange-200/80">
                              Unlocks after {request.arcTitle}
                            </p>
                            {request.note && (
                              <p className="mt-2 leading-5 text-zinc-300">
                                {request.note}
                              </p>
                            )}

                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => approveTopicRequest(request)}
                                className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-black text-emerald-100 transition active:scale-95"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => rejectTopicRequest(request.id)}
                                className="rounded-full border border-red-300/25 bg-red-400/10 px-3 py-1.5 text-[11px] font-black text-red-100 transition active:scale-95"
                              >
                                Reject
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteTopicRequest(request.id)}
                                className="rounded-full border border-zinc-500/30 bg-zinc-500/10 px-3 py-1.5 text-[11px] font-black text-zinc-200 transition active:scale-95"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            </div>
          </aside>

          <section className="min-w-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_22%)]">
            {!activeTopic || !activeTone ? null : (
              <>
                <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/90 px-4 py-4 backdrop-blur-xl sm:px-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "h-2.5 w-2.5 shrink-0 rounded-full",
                            activeUnlocked ? activeTone.dot : "bg-zinc-700",
                          ].join(" ")}
                        />
                        <p
                          className={[
                            "min-w-0 truncate text-[10px] font-black uppercase tracking-[0.2em]",
                            activeUnlocked
                              ? activeTone.softText
                              : "text-zinc-500",
                          ].join(" ")}
                        >
                          {activeTopic.arcTitle}
                        </p>
                      </div>

                      <h2 className="mt-2 break-words text-2xl font-black leading-tight sm:text-3xl">
                        {activeUnlocked ? activeTopic.title : activeTopic.channelName}
                      </h2>

                      <p className="mt-2 text-xs font-bold text-zinc-500">
                        {activeUnlocked ? `${topLevelComments.length} posts` : "Spoiler-safe room locked"}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span
                        className={[
                          "rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]",
                          activeUnlocked
                            ? activeTone.pill
                            : "border-zinc-700 bg-zinc-900 text-zinc-400",
                        ].join(" ")}
                      >
                        {activeUnlocked ? "Open" : "Locked"}
                      </span>

                      {creatorMode && activeUnlocked && topLevelComments.length > 0 && (
                        <button
                          type="button"
                          onClick={deleteAllCommentsInActiveRoom}
                          className="rounded-full border border-zinc-500/30 bg-zinc-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-200 transition active:scale-95"
                        >
                          Clear
                        </button>
                      )}

                      {creatorMode && activeTopic.id.startsWith("community-") && (
                        <button
                          type="button"
                          onClick={() => deleteApprovedTopic(activeTopic.id)}
                          className="rounded-full border border-red-300/25 bg-red-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-red-100 transition active:scale-95"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </header>

                {!activeUnlocked ? (
                  <div className="grid min-h-[520px] place-items-center px-4 py-12 sm:px-6">
                    <div className="w-full max-w-md text-center">
                      <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-[2.25rem] border border-zinc-700/80 bg-black/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_28px_70px_rgba(0,0,0,0.55)]">
                        <div className="absolute inset-4 rounded-[1.75rem] border border-zinc-800" />
                        <span className="text-5xl text-zinc-500">封</span>
                      </div>

                      <p className="mt-7 text-[11px] font-black uppercase tracking-[0.24em] text-orange-300">
                        {activeTopic.channelName}
                      </p>

                      <h3 className="mt-3 text-3xl font-black tracking-tight">
                        {activeTopic.unlockType === "main-complete"
                          ? "Finish the main story to enter."
                          : "Finish the arc to enter."}
                      </h3>

                      <p className="mx-auto mt-3 max-w-xs text-sm font-bold leading-6 text-zinc-400">
                        Topic prompts stay hidden until they are safe for your progress.
                      </p>

                      <Link
                        href={getArcPath(activeTopic)}
                        className="mt-7 inline-flex items-center justify-center rounded-full border border-orange-300/30 bg-orange-400/10 px-6 py-3 text-sm font-black text-orange-100 transition active:scale-[0.98]"
                      >
                        {activeTopic.unlockType === "main-complete"
                          ? "Go to Shippuden"
                          : "Go to arc"}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-5 sm:px-6 sm:py-7">
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/45 p-5">
                      <div
                        className={[
                          "absolute -right-12 -top-16 h-40 w-40 rounded-full blur-3xl",
                          activeTopic.tone === "red"
                            ? "bg-red-500/20"
                            : "bg-orange-500/20",
                        ].join(" ")}
                      />

                      <p
                        className={[
                          "relative text-[11px] font-black uppercase tracking-[0.22em]",
                          activeTone.softText,
                        ].join(" ")}
                      >
                        Discussion
                      </p>

                      <p className="relative mt-3 break-words text-xl font-black leading-8 text-zinc-100 sm:text-2xl sm:leading-9">
                        {activeTopic.description}
                      </p>
                    </div>

                    <div className="mt-6 space-y-5">
                      {topLevelComments.length === 0 && (
                        <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.03] px-5 py-8 text-center">
                          <p className="text-sm font-bold text-zinc-400">
                            No posts yet. Start the room with your first take.
                          </p>
                        </div>
                      )}

                      {topLevelComments.map((post) => {
                        const replies = getReplies(post.id);

                        return (
                          <article
                            key={post.id}
                            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-4 sm:p-5"
                          >
                            <div className="flex gap-3">
                              <div
                                className={[
                                  "grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black",
                                  post.role === "creator"
                                    ? activeTone.message
                                    : "border border-blue-300/20 bg-blue-500/10 text-blue-100",
                                ].join(" ")}
                              >
                                {post.role === "creator" ? "SC" : "忍"}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="font-black text-zinc-100">
                                    {post.author}
                                  </p>
                                  {post.verified && <VerifiedStamp />}
                                </div>

                                <div className="mt-2 break-words">
                                  <CommentBody body={post.body} />
                                </div>

                                <ReactionControls comment={post} />

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setReplyingToId(post.id);
                                      setModerationAlert("");
                                    }}
                                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-zinc-300 transition active:scale-95"
                                  >
                                    Reply
                                  </button>

                                  {creatorMode && (
                                    <button
                                      type="button"
                                      onClick={() => handleDelete(post.id)}
                                      className="rounded-full border border-red-300/20 bg-red-400/10 px-3 py-2 text-xs font-black text-red-200 transition active:scale-95"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>

                                {replies.length > 0 && (
                                  <details className="mt-4 rounded-2xl border border-white/10 bg-black/25">
                                    <summary className="cursor-pointer list-none px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-zinc-300">
                                      View {replies.length} {replies.length === 1 ? "reply" : "replies"}
                                    </summary>

                                    <div className="space-y-4 border-t border-white/10 px-4 py-4">
                                      {replies.map((reply) => (
                                        <div
                                          key={reply.id}
                                          className="border-l border-orange-300/20 pl-4"
                                        >
                                          <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <p className="text-sm font-black text-zinc-100">
                                              {reply.author}
                                            </p>
                                            {reply.verified && <VerifiedStamp />}
                                          </div>

                                          <div className="break-words">
                                            <CommentBody body={reply.body} />
                                          </div>

                                          <ReactionControls comment={reply} />

                                          {creatorMode && (
                                            <button
                                              type="button"
                                              onClick={() => handleDelete(reply.id)}
                                              className="mt-2 rounded-full border border-red-300/20 bg-red-400/10 px-3 py-1.5 text-xs font-black text-red-200"
                                            >
                                              Delete
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </details>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>

                    <div className="sticky bottom-3 z-30 mt-7 rounded-[1.5rem] border border-white/10 bg-zinc-950/94 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.62)] backdrop-blur-xl">
                      {replyingToComment && (
                        <div className="mb-3 rounded-[1.2rem] border border-orange-300/20 bg-orange-400/[0.07] p-3">
                          <div className="flex items-start gap-3">
                            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-orange-300/20 bg-black/35 text-xs font-black text-orange-100">
                              ↳
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-200">
                                Replying to {replyingToComment.author}
                              </p>
                              <p className="mt-1 max-h-12 overflow-hidden break-words text-xs font-bold leading-5 text-zinc-300">
                                {getReplyPreview(replyingToComment.body)}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => setReplyingToId(null)}
                              className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] font-black text-zinc-400 transition active:scale-95"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {!creatorMode && (
                        <input
                          value={guestName}
                          onChange={(event) => setGuestName(event.target.value)}
                          placeholder="Name optional"
                          className="mb-3 w-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                        />
                      )}

                      <textarea
                        rows={2}
                        value={commentBody}
                        onChange={(event) => {
                          const nextValue = event.target.value;
                          setCommentBody(nextValue);
                          if (moderationAlert) setModerationAlert("");

                          if (containsUnsupportedGifPage(nextValue)) {
                            setMediaHint("Giphy/Tenor page links may not animate. Use + Media to upload the GIF file, or paste a direct .gif link.");
                          } else if (!nextValue.trim()) {
                            setMediaHint("");
                          }
                        }}
                        onPaste={handlePaste}
                        placeholder={
                          replyingToComment
                            ? `Reply to ${replyingToComment.author}...`
                            : creatorMode
                              ? "Post as Site Creator..."
                              : "Drop a take..."
                        }
                        className="min-h-20 w-full resize-none rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                      />

                      <div className="mt-3 flex items-center gap-2">
                        <input
                          ref={mediaInputRef}
                          type="file"
                          accept="image/gif,image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={handleMediaFileChange}
                        />

                        <button
                          type="button"
                          onClick={() => mediaInputRef.current?.click()}
                          disabled={mediaUploading}
                          className="shrink-0 rounded-full border border-orange-300/25 bg-orange-400/10 px-4 py-2 text-xs font-black text-orange-100 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {mediaUploading ? "Uploading..." : "+ Media"}
                        </button>

                        <button
                          type="button"
                          onClick={handlePost}
                          disabled={!commentBody.trim() || mediaUploading}
                          className={[
                            "ml-auto shrink-0 rounded-full border px-5 py-2 text-sm font-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40",
                            activeTone.pill,
                          ].join(" ")}
                        >
                          {creatorMode ? "Post" : "Send"}
                        </button>
                      </div>

                      {mediaHint && (
                        <p className="mt-2 rounded-2xl border border-orange-300/20 bg-orange-400/10 px-3 py-2 text-[11px] font-bold text-orange-100">
                          {mediaHint}
                        </p>
                      )}

                      {moderationAlert && (
                        <p className="mt-2 rounded-2xl border border-red-300/20 bg-red-400/10 px-3 py-2 text-[11px] font-bold text-red-100">
                          {moderationAlert}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
