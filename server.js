const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  console.error("YOUTUBE_API_KEY is missing");
  process.exit(1);
}

const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.includes("youtube.com") || url.includes("youtu.be");
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET"],
  }),
);

/* ================= VIDEO INFO ================= */
app.get("/video-info", (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl || !isValidUrl(videoUrl)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  const ytdlp = spawn("yt-dlp", [
    videoUrl,
    "--dump-single-json",
    "--no-warnings",
    "--no-check-certificate",
  ]);

  let output = "";

  ytdlp.stdout.on("data", (data) => {
    output += data.toString();
  });

  ytdlp.stderr.on("data", (err) => {
    console.error(err.toString());
  });

  ytdlp.on("close", async () => {
    try {
      const info = JSON.parse(output);

      const [videoResponse, channelResponse] = await Promise.all([
        axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${
            info.id
          }&key=${YOUTUBE_API_KEY}`,
        ),
        axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${
            info.channel_id
          }&key=${YOUTUBE_API_KEY}`,
        ),
      ]);

      const channelSnippet = channelResponse.data.items?.[0]?.snippet || {};

      const formats = info.formats.map((f) => ({
        formatId: f.format_id,
        resolution: f.height ? `${f.height}p` : "Audio Only",
        videoCodec: f.vcodec,
        audioCodec: f.acodec,
        fileSize: f.filesize
          ? `${(f.filesize / 1e6).toFixed(2)} MB`
          : "Unknown",
        ext: f.ext,
        url: f.url,
      }));

      res.json({
        title: info.title,
        duration: info.duration,
        thumbnail: info.thumbnail,
        author: info.uploader,
        authorImg: channelSnippet.thumbnails?.default?.url || null,
        channelUrl: info.channel_url,
        formats,
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to parse video info" });
    }
  });
});

/* ================= DOWNLOAD ================= */
app.get("/download", (req, res) => {
  const { formatId, url } = req.query;

  if (!formatId || !url) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const filePath = path.join(__dirname, `video_${Date.now()}.mp4`);

  const ytdlp = spawn("yt-dlp", [
    url,
    "-f",
    formatId,
    "-o",
    filePath,
    "--no-warnings",
    "--no-check-certificate",
  ]);

  ytdlp.on("close", () => {
    res.download(filePath, () => {
      fs.unlink(filePath, () => {});
    });
  });
});

app.get("/dl", async (req, res) => {
  const imageUrl = req.query.url;

  // Validate the URL query parameter
  if (!imageUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    // Fetch the image from the remote server
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      return res.status(400).json({ error: "URL does not point to an image" });
    }

    // Set the appropriate content type
    res.set("Content-Type", contentType);

    // Use pipeline to pipe the response stream to the client
    pipeline(response.body, res, (err) => {
      if (err) {
        console.error("Pipeline error:", err);
        res.status(500).send("Failed to stream the image");
      }
    });
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
