import { useMemo, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type DayItem = {
  id: string;
  date: Date;
  label: string;
  day: number;
};

const getDayLabel = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3);
};

const generateDates = (
  countBefore: number,
  countAfter: number,
  centerDate: Date,
) => {
  const item: DayItem[] = [];

  for (let i = -countBefore; i <= countAfter; i++) {
    const d = new Date(centerDate);
    d.setDate(centerDate.getDate() + i);

    item.push({
      id: d.toISOString(),
      date: d,
      label: getDayLabel(d),
      day: d.getDate(),
    });
  }

  return item;
};

const DateStrip = () => {
  const today = new Date();
  const allDates = useMemo(() => generateDates(10, 20, today), []);
  const [selectedId, setSelectedId] = useState(
    allDates.find((d) => d.day === today.getDate())?.id ?? allDates[10].id,
  );
  const flatListRef = useRef<FlatList<DayItem>>(null);

  const renderItem = ({ item }: { item: DayItem }) => {
    const isSelected = item.id === selectedId;

    return (
      <Pressable
        onPress={() => setSelectedId(item.id)}
        style={[styles.dayCard, isSelected && styles.selectedCard]}
      >
        <Text style={[styles.dayLabel, isSelected && styles.selectedText]}>
          {item.label}
        </Text>

        <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>
          {item.day}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={allDates}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        getItemLayout={(_, index) => ({
          length: 56,
          offset: 56 * index,
          index,
        })}
        initialScrollIndex={allDates.findIndex((d) => d.id === selectedId)}
        onLayout={() => {
          const index = allDates.findIndex((d) => d.id === selectedId);
          flatListRef.current?.scrollToIndex({ index, animated: false });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  listContent: {
    paddingHorizontal: 8,
    gap: 10,
  },
  dayCard: {
    width: 44,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#dfeaf5",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCard: {
    backgroundColor: "#0560FA",
  },
  dayLabel: {
    fontSize: 10,
    color: "#2b6cb0",
    marginBottom: 8,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  selectedText: {
    color: "#fff",
  },
});

export default DateStrip;
