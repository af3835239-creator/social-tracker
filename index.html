import { getCachedData, saveCache } from "./cache.js";
import {
  fetchTikTok,
  fetchInstagram,
  fetchFacebook,
} from "../lib/apify.js";

export default async function handler(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "Missing URL",
      });
    }

    const cached = getCachedData(url);

    if (cached) {
      return res.status(200).json({
        ...cached,
        source: "cache",
      });
    }

    let result;

    if (url.includes("tiktok.com")) {
      result = await fetchTikTok(url);
    } else if (url.includes("instagram.com")) {
      result = await fetchInstagram(url);
    } else if (
      url.includes("facebook.com") ||
      url.includes("fb.watch")
    ) {
      result = await fetchFacebook(url);
    } else {
      return res.status(400).json({
        error: "Unsupported platform",
      });
    }

    saveCache(url, result);

    return res.status(200).json({
      ...result,
      source: "apify",
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}