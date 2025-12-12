export type NewsTag =
  | "MERCADO"
  | "FIIS"
  | "CRIPTO"
  | "MACRO"
  | "AÇÕES"
  | "TODAS";

export type NewsSentiment = "positive" | "negative" | "neutral";

export interface NewsItem {
  _id: number;
  tag: NewsTag;
  title: string;
  excerpt: string;
  content: string;
  time: string;
  readTime: string;
  sentiment: NewsSentiment;
}
