# translator

a lightweight multilingual phrase viewer. write something dumb in one language and give anyone the option to see what dumb thing you wrote, in any language! this is truly the most inclusive webapp ever made. 

built with next.js, tailwind, google's cloud translation api and copious amounts of Opus 4.1

## rationale and backstory
at the world robot olympiad 2025 international finals in singapore, i was sitting at a table next to the playfield of my juniors' team. we were just spectators, but many people came up to us to ask for information or directions. some of these people were not english-speaking, and as a failed bilingual (sorry zhou lao shi) i can only speak english.

i realised that it was really inefficient for me to type in the same phrase and translating it into whatever language they spoke. however, google translate only allows you to share translations with both languages set. furthermore, my grumpy robotics chairman was upset that i wanted to print a sign that said "not an information  counter" and 3d print a stand for it because it had a poor public image, so of course i had to use this opportunity to figure out how api calls work aproper.

## features

- **translation**: translate text to 240+ languages using google's cloud translation api
- **shareable links**: generate unique URLs for any phrase that can be shared with others
- **language selection**: recipients can choose their preferred language from a dropdown
- **sharing functionality**: built-in copy link and native share menu support
- **responsive UI**: works seamlessly on mobile, tablet, and desktop

everything below this part is ai generated lol

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Flexoki color palette
- **Components**: shadcn/ui
- **API**: Google Cloud Translation API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Google Cloud Translation API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://lohhaoyuan/translator.git
   cd translator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_TRANSLATE_API_KEY = your_api_key
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.


## Usage

### Creating a Translation Link

1. Enter your phrase in the text area on the home page
2. Click "Generate Link"
3. Copy the link or use the share button to share it

### Viewing a Translation

1. Open a shared translation link
2. Select your preferred language from the dropdown
3. Click "Translate" to see the translation
4. Copy the translated text if needed

## Project Structure

```
phrase-translator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── translate/
│   │   │       └── route.ts      # Translation API endpoint
│   │   ├── t/
│   │   │   └── [phrase]/
│   │   │       └── page.tsx      # Translation view page
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/
│   │   └── ui/                   # shadcn/ui components
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/                       # Static assets
├── .env.local                    # Environment variables (not in git)
└── package.json
```


## Supported Languages

The app supports 240+ languages including:

- English (en)
- Chinese Simplified (zh-CN)
- Chinese Traditional (zh-TW)
- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Korean (ko)
- Russian (ru)
- Arabic (ar)
- Portuguese (pt)
- Italian (it)
- Dutch (nl)
- Polish (pl)
- Turkish (tr)
- And many more...



## Building for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this project for your own purposes.

## Credits

- Built by Hao Yuan
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Color palette: [Flexoki](https://stephango.com/flexoki)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions:
good luck LOL
