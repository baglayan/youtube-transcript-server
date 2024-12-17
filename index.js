const express = require('express');
const { getSubtitles } = require('youtube-captions-scraper');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to process captions and calculate proper durations
function processCaptions(captions) {
  return captions.map((caption, index) => {
    const nextCaption = captions[index + 1];
    const start = parseFloat(caption.start);
    const duration = nextCaption 
      ? parseFloat(nextCaption.start) - start 
      : 5; // default duration for last caption
    
    return {
      ...caption,
      start,
      dur: duration
    };
  });
}

// YouTube captions endpoint
app.get('/captions/:videoId', async (req, res) => {
  const { videoId } = req.params;
  const { lang = 'en' } = req.query; // Default to English if no language specified
  console.log(`[${new Date().toISOString()}] Received request for video ID: ${videoId}, language: ${lang}`);

  try {
    console.log(`[${new Date().toISOString()}] Fetching captions...`);
    const rawCaptions = await getSubtitles({
      videoID: videoId,
      lang: lang
    });
    
    const processedCaptions = processCaptions(rawCaptions);
    console.log(`[${new Date().toISOString()}] Successfully fetched captions`);
    
    res.json({ 
      captions: processedCaptions
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching captions:`, error);
    res.status(500).json({ 
      error: 'Failed to fetch captions',
      message: error.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server is running on port ${PORT}`);
});