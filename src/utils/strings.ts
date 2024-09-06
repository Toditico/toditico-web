const wordsToNotCapitalize: string[] = [
  "a",
  "ante",
  "bajo",
  "con",
  "contra",
  "de",
  "desde",
  "en",
  "entre",
  "hacia",
  "hasta",
  "para",
  "por",
  "según",
  "sin",
  "so",
  "sobre",
  "tras",
];

const wordsToCapitalizeInProductDescription: string[] = [];

export const capitalizeAllWordsButPreps = (input: string): string => {
  const words = input.split(" ");

  const capitalizedWords = words.map((word) => {
    if (wordsToNotCapitalize.includes(word.toLowerCase())) {
      return word;
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};

export const capitalizeFirstAndSpecified = (input: string): string => {
  // Split the input string into words
  const words = input.split(" ");

  // Capitalize the first word
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }

  // Capitalize specified words
  const capitalizedWords = words.map((word) => {
    if (wordsToCapitalizeInProductDescription.includes(word.toLowerCase())) {
      return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the specified word
    }
    return word; // Return the word as is
  });

  // Join the capitalized words back into a single string
  return capitalizedWords.join(" ");
};
