# YouTube Captions API

A basic Express wrapper around [youtube-captions-scraper](https://www.npmjs.com/package/youtube-captions-scraper) npm package.

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/baglayan/youtube-transcript-server
   cd youtube-transcript-server
```

3. Install the dependencies:
```bash
   npm install
```

5. Start the server in development mode:
```bash
   npm run dev
```

## API Endpoint

### `GET /captions/:videoId`

Fetches and processes captions for a specified YouTube video.

- **URL Parameters:**
  - `videoId` (string): The ID of the YouTube video.

- **Query Parameters:**
  - `lang` (string, optional): The language code for the captions. Defaults to 'en' (English) if not specified.

- **Response:**
  - Returns a JSON object containing an array of processed captions with start times and durations.

- **Example Request:**
```http
  GET /captions/dQw4w9WgXcQ?lang=en
```

- **Example Response:**
```json
  {
    "captions": [
      {
        "start": 0.0,
        "dur": 5.0,
        "text": "I've seen things you people wouldn't believe."
      },
      ...
    ]
  }
```

## License

This project is licensed under the GNU General Public License v3.0.