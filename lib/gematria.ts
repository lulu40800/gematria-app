// Core gematria calculation logic

import { GematriaValues, GematriaResult, FrequencyEntry } from "./gematriaTypes";

// Gematria dictionary with exact values as specified
export const GEMATRIA_BASE_MAP: Record<string, GematriaValues> = {
    "א": { pashut: 1, milui: 111, miluiDeMilui: 266 },
    "ב": { pashut: 2, milui: 402, miluiDeMilui: 808 },
    "ג": { pashut: 3, milui: 73, miluiDeMilui: 227 },
    "ד": { pashut: 4, milui: 434, miluiDeMilui: 914 },
    "ה": { pashut: 5, milui: 6, miluiDeMilui: 20 },
    "ו": { pashut: 6, milui: 12, miluiDeMilui: 24 },
    "ז": { pashut: 7, milui: 57, miluiDeMilui: 163 },
    "ח": { pashut: 8, milui: 408, miluiDeMilui: 814 },
    "ט": { pashut: 9, milui: 409, miluiDeMilui: 815 },
    "י": { pashut: 10, milui: 20, miluiDeMilui: 466 },
    "כ": { pashut: 20, milui: 100, miluiDeMilui: 181 },
    "ל": { pashut: 30, milui: 74, miluiDeMilui: 588 },
    "מ": { pashut: 40, milui: 80, miluiDeMilui: 160 },
    "נ": { pashut: 50, milui: 106, miluiDeMilui: 224 },
    "ס": { pashut: 60, milui: 120, miluiDeMilui: 300 },
    "ע": { pashut: 70, milui: 120, miluiDeMilui: 226 },
    "פ": { pashut: 80, milui: 81, miluiDeMilui: 192 },
    "צ": { pashut: 90, milui: 104, miluiDeMilui: 558 },
    "ק": { pashut: 100, milui: 186, miluiDeMilui: 279 },
    "ר": { pashut: 200, milui: 500, miluiDeMilui: 850 },
    "ש": { pashut: 300, milui: 350, miluiDeMilui: 456 },
    "ת": { pashut: 400, milui: 406, miluiDeMilui: 418 },
};

// Mapping from final letters to base letters (for gematria calculations only)
export const FINAL_TO_BASE_MAP: Record<string, string> = {
    "ך": "כ",
    "ם": "מ",
    "ן": "נ",
    "ף": "פ",
    "ץ": "צ",
};

// All Hebrew letters in order for frequency table: 22 base + 5 finals
const HEBREW_LETTERS_ORDER = [
    // Base letters א-ת
    "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ",
    "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת",
    // Final letters
    "ם", "ף", "ץ", "ך", "ן"
];

/**
 * Normalizes a Hebrew character
 * @param ch - Single character to normalize
 * @returns Object with base and original letter, or null if not Hebrew
 */
function normalizeHebrewChar(ch: string): { base: string; original: string } | null {
    // Check if it's a base Hebrew letter (א-ת)
    if (GEMATRIA_BASE_MAP[ch]) {
        return { base: ch, original: ch };
    }

    // Check if it's a final letter
    if (FINAL_TO_BASE_MAP[ch]) {
        return { base: FINAL_TO_BASE_MAP[ch], original: ch };
    }

    // Not a Hebrew letter
    return null;
}

/**
 * Calculates gematria values for Hebrew text
 * @param text - Input Hebrew text (may contain non-Hebrew characters)
 * @returns GematriaResult with totals and frequencies
 */
export function calculateGematria(text: string): GematriaResult {
    // Normalize text to NFC
    const normalizedText = text.normalize("NFC");

    // Initialize counters
    let totalLetters = 0;
    let sumPashut = 0;
    let sumMilui = 0;
    let sumMiluiDeMilui = 0;

    // Map to count each Hebrew character separately
    const countByChar = new Map<string, number>();

    // Process each character
    for (const ch of normalizedText) {
        const normalized = normalizeHebrewChar(ch);

        if (!normalized) {
            // Skip non-Hebrew characters
            continue;
        }

        const { base, original } = normalized;

        // Increment total letters
        totalLetters++;

        // Get gematria values for the base letter
        const values = GEMATRIA_BASE_MAP[base];

        if (values) {
            // Add to sums
            sumPashut += values.pashut;
            sumMilui += values.milui;
            sumMiluiDeMilui += values.miluiDeMilui;

            // Increment count for the original letter (base or final)
            countByChar.set(original, (countByChar.get(original) || 0) + 1);
        } else {
            // This should not happen if normalizeHebrewChar works correctly
            console.warn(`Warning: No gematria values found for base letter: ${base}`);
        }
    }

    // Build frequencies array in exact order (27 letters)
    const frequencies: FrequencyEntry[] = HEBREW_LETTERS_ORDER.map(letter => ({
        letter,
        count: countByChar.get(letter) || 0
    }));

    return {
        totalLetters,
        sumPashut,
        sumMilui,
        sumMiluiDeMilui,
        frequencies
    };
}
