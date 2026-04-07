import { Text, View } from "react-native";

type Quote = {
  id: string;
  text: string;
  source?: {
    type?: string;
    name?: string;
    chapter?: number | string | null;
    verse?: number | string | null;
  };
  tags?: string[];
  language?: string;
  metrics?: {
    likes: number;
    dislikes: number;
  };
};
type QuoteCardProps = {
  quote: Quote;
};

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <View className="flex-1 justify-center items-center bg-[#001a2c] px-12">
      <Text
        style={{ fontFamily: "Inter_300Light" }}
        className="text-white text-center text-2xl leading-relaxed tracking-wide"
      >
        {quote.text}
      </Text>

      {(quote.source?.type === "gita" || quote.source?.type === "bible") && (
        <View className="mt-8 items-center">
          <Text
            style={{ fontFamily: "Inter_300Light" }}
            className="text-white text-md"
          >
            {quote.source?.type?.toUpperCase() || "UNKNOWN"}{" "}
            {quote.source?.chapter != null && quote.source?.verse != null
              ? `${quote.source.chapter}.${quote.source.verse}`
              : ""}
          </Text>
        </View>
      )}
      {(quote.source?.name !== "Bhagavad Gita" && quote.source?.name !== "Bible") && (
        <View className="mt-8 items-center">
          <Text
            style={{ fontFamily: "Inter_300Light" }}
            className="text-white text-md"
          >
            - {quote.source?.name }
          </Text>
        </View>
      )}
    </View>
  );
}
