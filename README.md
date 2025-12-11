# Hebrew Gematria Analysis Website

A complete web application for advanced Hebrew gematria calculations, built with Next.js, React, and TypeScript.

## Features

- **Three Gematria Methods**: Calculates Pashut (פשוט), Milui (מילוי), and Milui DeMilui (מילוי דמילוי)
- **Frequency Analysis**: Displays a horizontal table showing the count of each Hebrew letter
- **Large Text Support**: Handles input texts up to 400,000 characters
- **RTL Hebrew Interface**: Complete right-to-left UI with all labels in Hebrew
- **Copy to Clipboard**: One-click copy of all calculation results
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

You need to have Node.js and npm installed on your system.

### Installing Node.js

**Windows:**
1. Download the latest LTS version from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Verify installation by opening PowerShell and running:
   ```powershell
   node --version
   npm --version
   ```

## Installation

1. Navigate to the project directory:
   ```bash
   cd gematria-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
gematria-app/
├── app/
│   ├── api/
│   │   └── gematria/
│   │       └── route.ts          # API endpoint for calculations
│   ├── globals.css               # Global styles with RTL support
│   ├── layout.tsx                # Root layout with RTL direction
│   └── page.tsx                  # Main UI component
├── lib/
│   ├── gematriaTypes.ts          # TypeScript types
│   └── gematria.ts               # Core calculation logic
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## API Usage

### POST /api/gematria

**Request Body:**
```json
{
  "text": "שלום עולם"
}
```

**Response:**
```json
{
  "totalLetters": 8,
  "sumPashut": 476,
  "sumMilui": 1042,
  "sumMiluiDeMilui": 2416,
  "frequencies": [
    { "letter": "א", "count": 0 },
    { "letter": "ב", "count": 0 },
    ...
    { "letter": "ל", "count": 2 },
    { "letter": "מ", "count": 1 },
    ...
    { "letter": "ש", "count": 1 },
    ...
  ]
}
```

## How It Works

1. **Input Processing**: The system accepts Hebrew text and normalizes it to NFC format
2. **Letter Recognition**: Only Hebrew letters (א-ת) and final forms (ך, ם, ן, ף, ץ) are processed
3. **Gematria Calculation**: 
   - Final letters are mapped to their base forms for value calculation
   - Three sums are calculated: Pashut, Milui, and Milui DeMilui
4. **Frequency Counting**: Each letter (including finals) is counted separately
5. **Results Display**: Shows totals in cards and frequency in a horizontal table

## Technical Notes

- **Performance**: O(n) complexity for text processing
- **Body Size Limit**: API accepts up to 2MB requests (~400k characters)
- **Unicode Normalization**: All text is normalized to NFC before processing
- **RTL Support**: Entire UI uses RTL direction for proper Hebrew display

## License

This project is provided as-is for educational and personal use.
