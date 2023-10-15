import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const milky = "\u{1F30C}";

let array = [];
let matrix = [];

for (let i = 0; i < 11; i++) {
  array.push(milky);
}
for (let i = 0; i < 11; i++) {
  matrix.push(array);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{matrix[0]}</Text>
      <Text style={styles.text}>{matrix[1]}</Text>
      <Text style={styles.text}>{matrix[2]}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#307BAA",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFD700",
    fontSize: 15,
    fontWeight: "bold",
  },
});
