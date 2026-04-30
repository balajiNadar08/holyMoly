import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react-native";

type VoteType = "up" | "down" | null;

type Quote = {
  id: string;
  text: string;
  votes: number;
  userVote: VoteType;
};

const initialData: Quote[] = [
  { id: "1", text: "quotes 1.....", votes: 0, userVote: null },
  { id: "2", text: "quotes 2.....", votes: 0, userVote: null },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState<"trending" | "recent">("trending");
  const [quotes, setQuotes] = useState(initialData);
  const [input, setInput] = useState("");

  const handleVote = (id: string, type: VoteType) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;

        let newVotes = q.votes;
        let newVote: VoteType = q.userVote;

        if (q.userVote === type) {
          newVotes += type === "up" ? -1 : 1;
          newVote = null;
        } else if (q.userVote !== null) {
          newVotes += type === "up" ? 2 : -2;
          newVote = type;
        } else {
          newVotes += type === "up" ? 1 : -1;
          newVote = type;
        }

        return { ...q, votes: newVotes, userVote: newVote };
      }),
    );
  };

  const addQuote = () => {
    if (!input.trim()) return;

    const newQuote: Quote = {
      id: Date.now().toString(),
      text: input,
      votes: 0,
      userVote: null,
    };

    setQuotes([newQuote, ...quotes]);
    setInput("");
  };

  const sortedQuotes =
    activeTab === "trending"
      ? [...quotes].sort((a, b) => b.votes - a.votes)
      : [...quotes].reverse();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View className="flex-1 px-4 pt-6">
        <View className="flex-row border border-black rounded-lg overflow-hidden mb-4">
          <TouchableOpacity
            onPress={() => setActiveTab("trending")}
            className={`flex-1 py-3 items-center ${
              activeTab === "trending" ? "bg-black" : "bg-white"
            }`}
          >
            <Text
              className={activeTab === "trending" ? "text-white" : "text-black"}
            >
              Trending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("recent")}
            className={`flex-1 py-3 items-center ${
              activeTab === "recent" ? "bg-black" : "bg-white"
            }`}
          >
            <Text
              className={activeTab === "recent" ? "text-white" : "text-black"}
            >
              Recent
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sortedQuotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="border border-black rounded-xl p-4 mb-4">
              {/* Quote */}
              <Text className="text-black mb-4">{item.text}</Text>

              <View className="flex-row items-center gap-4">
                <TouchableOpacity onPress={() => handleVote(item.id, "up")}>
                  <ArrowUp
                    size={22}
                    color={item.userVote === "up" ? "black" : "gray"}
                    strokeWidth={2}
                  />
                </TouchableOpacity>

                <Text className="text-black">{item.votes}</Text>

                <TouchableOpacity onPress={() => handleVote(item.id, "down")}>
                  <ArrowDown
                    size={22}
                    color={item.userVote === "down" ? "black" : "gray"}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View className="px-4 pb-4 pt-2 border-t border-black bg-white flex-row items-center">
        <TextInput
          placeholder="Write quotes..."
          placeholderTextColor="black"
          value={input}
          onChangeText={setInput}
          className="flex-1 text-black"
        />
        <TouchableOpacity onPress={addQuote}>
          <Text className="text-black ml-2">Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Community;
