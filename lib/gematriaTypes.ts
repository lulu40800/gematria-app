// Shared types for gematria calculations

export type GematriaValues = {
  pashut: number;        // simple gematria
  milui: number;         // "Milui" gematria
  miluiDeMilui: number;  // "Milui DeMilui" gematria (MDM)
};

export type FrequencyEntry = {
  letter: string;   // one of: א..ת, ך, ם, ן, ף, ץ
  count: number;    // how many times this exact character appears in the text
};

export type GematriaResult = {
  totalLetters: number;       // total count of Hebrew letters (including final forms)
  sumPashut: number;          // sum over all letters: pashut
  sumMilui: number;           // sum over all letters: milui
  sumMiluiDeMilui: number;    // sum over all letters: miluiDeMilui
  frequencies: FrequencyEntry[]; // 27 entries: א..ת + ם, ף, ץ, ך, ן
};
