const APIFY_TOKEN = process.env.APIFY_TOKEN;

async function runActor(actorId, input) {
  const response = await fetch(
    'https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  if (!response.ok) {
    throw new Error(`Apify request failed: ${response.status}`);
  }

  return await response.json();
}

export async function fetchTikTok(url) {
  const data = await runActor(
    "clockworks~free-tiktok-scraper",
    {
      postURLs: [url],
    }
  );

  const post = data?.[0] || {};

  return {
    views: post.playCount || 0,
    likes: post.diggCount || 0,
    comments: post.commentCount || 0,
  };
}

export async function fetchInstagram(url) {
  const data = await runActor(
    "apify~instagram-post-scraper",
    {
      directUrls: [url],
    }
  );

  const post = data?.[0] || {};

  return {
    views: post.videoViewCount || 0,
    likes: post.likesCount || 0,
    comments: post.commentsCount || 0,
  };
}

export async function fetchFacebook(url) {
  const data = await runActor(
    "apify~facebook-posts-scraper",
    {
      startUrls: [{ url }],
    }
  );

  const post = data?.[0] || {};

  return {
    views: post.viewCount || 0,
    likes: post.reactions || 0,
    comments: post.comments || 0,
  };
}