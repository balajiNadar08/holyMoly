import {
  View,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
} from "react-native";
import "./global.css";
import { Inter_300Light, Inter_400Regular } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import sampleData from "../data/sampleData.json";
import QuoteCard from "../components/QuoteCard";

const { height } = Dimensions.get("window");

export default function Index() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
  });

  const quotes = sampleData?.quotes || [];

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#001a2c]">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (quotes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-[#001a2c]">
        <Text className="text-white">No quotes available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={quotes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ height }}>
          <QuoteCard quote={item} />
        </View>
      )}
      pagingEnabled
      decelerationRate="fast"
      snapToInterval={height}
      snapToAlignment="start"
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      initialNumToRender={2}
      maxToRenderPerBatch={3}
      windowSize={5}
      overScrollMode="never"
      getItemLayout={(data, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    />
  );
}
