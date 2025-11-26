# Phrase Translator 🌍

A beautiful, Flexoki-themed web app for creating shareable translation links. Built with Next.js, Tailwind CSS, and powered by Smartcat's translation API.

![Phrase Translator](https://via.placeholder.com/800x400?text=Phrase+Translator)

## Features

- **Create Shareable Links**: Enter any phrase and generate a link that can be shared with anyone
- **280+ Languages**: Support for virtually every language via Smartcat AI
- **Native Share Integration**: Uses the Web Share API when available for easy sharing
- **Copy to Clipboard**: One-click copy functionality
- **Beautiful UI**: Warm, paper-like design using the Flexoki color palette
- **Responsive**: Works great on mobile and desktop

## How It Works

1. **Create**: Enter your phrase on the home page
2. **Share**: Generate a shareable link with one click
3. **Translate**: Recipients open the link and choose their preferred language

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A [Smartcat](https://www.smartcat.com) account (free tier available)

### Installation

1. Clone the repository and install dependencies:

```bash
cd phrase-translator
npm install
```

2. Set up your environment variables:

```bash
cp .env.example .env.local
```

3. Edit `.env.local` with your Smartcat credentials:

```env
SMARTCAT_ACCOUNT_ID=your_account_id_here
SMARTCAT_API_KEY=your_api_key_here
SMARTCAT_TRANSLATION_PROFILE_ID=your_profile_id_here
SMARTCAT_API_BASE=https://ea.smartcat.com
```

### Getting Smartcat Credentials

1. **Account ID & API Key**:
   - Log in to your Smartcat account
   - Go to **Settings > API**
   - Copy your Account ID
   - Click **CREATE NEW KEY** to generate an API key

2. **Translation Profile ID**:
   - Go to **Settings > Smart translation profiles**
   - Click **Add smart translation profile**
   - Enter a name and select your preferred MT engine
   - Save and click Edit on the profile
   - Copy the ID from the URL (the GUID after `/settings/smart-translation-profile/`)

3. **API Base URL**:
   - `https://ea.smartcat.com` for Asia
   - `https://smartcat.ai` for Europe
   - `https://us.smartcat.ai` for US

### Running the App

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000`

## Demo Mode

If no Smartcat credentials are configured, the app runs in demo mode, showing placeholder translations. This is useful for testing the UI without API access.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Color Palette**: [Flexoki](https://stephango.com/flexoki)
- **Font**: [Geist](https://vercel.com/font)
- **Translation API**: [Smartcat](https://www.smartcat.com)

## Color Palette

This app uses the beautiful Flexoki color palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Paper | `#FFFCF0` | Background |
| Text | `#100F0F` | Primary text |
| Cyan | `#24837B` | Primary accent |
| Blue | `#205EA6` | Buttons |
| Green | `#66800B` | Success states |
| Red | `#AF3029` | Error states |

## Project Structure

```
phrase-translator/
├── src/
│   ├── app/
│   │   ├── api/translate/    # Translation API endpoint
│   │   ├── translate/[encoded]/ # Translate page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/ui/        # UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── share-dialog.tsx
│   │   ├── textarea.tsx
│   │   └── toast.tsx
│   └── lib/
│       ├── languages.ts      # Language data
│       └── utils.ts          # Utility functions
├── tailwind.config.js
├── next.config.js
└── package.json
```

## API Endpoint

### POST /api/translate

Translates text to a specified language.

**Request Body:**
```json
{
  "text": "Hello, world!",
  "targetLanguage": "ja",
  "sourceLanguage": "en"
}
```

**Response:**
```json
{
  "translatedText": "こんにちは、世界！",
  "sourceLanguage": "en",
  "targetLanguage": "ja"
}
```

## URL Encoding

Phrases are encoded using Base64 + URI encoding for safe URL sharing:

```typescript
// Encode
const encoded = btoa(encodeURIComponent(phrase))

// Decode  
const decoded = decodeURIComponent(atob(encoded))
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgements

- [Smartcat](https://www.smartcat.com) for the translation API
- [Steph Ango](https://stephango.com/flexoki) for the Flexoki color palette
- [Vercel](https://vercel.com) for Next.js and the Geist font
