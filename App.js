import { StyleSheet, Text, View } from "react-native";
import MainNavigator from "./navigations/MainNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigator />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
