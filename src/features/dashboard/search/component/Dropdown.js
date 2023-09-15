import {StyleSheet, FlatList, TouchableWithoutFeedback, Text } from 'react-native';

export const Dropdown = ({ data, handleSelection }) => (
    <FlatList
      style={styles.suggestions}
      data={data}
      renderItem={({item}) => 
        <TouchableWithoutFeedback onPress={() => handleSelection(item)}>
          <Text>{item.name}</Text>
        </TouchableWithoutFeedback>
      }
      keyExtractor={(item) => item.name}
    />
  );

  const styles = StyleSheet.create({
    suggestions: {
    padding: 10,
    backgroundColor: '#e6e6ff',
},
});