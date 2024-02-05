export function getSentencesApiUrl(numberOfSentences: number = 10) {
  return `https://hipsum.co/api/?type=hipster-centric&sentences=${numberOfSentences}`;
}
