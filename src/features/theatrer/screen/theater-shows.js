import { styled } from "styled-components";
import { Card } from "react-native-paper";
import { StyleSheet, Text, View, Button } from 'react-native';

const MovieView = styled(View)`
    background-color:'black';
    flex:1;
    flex-direction:row;
`;

export const TheaterShowScreen = () => {
    return (
        <View style = {styles.container}>
            <View>
                <Text>Gabbar</Text>
            </View>
            <View>
                <Card>
                    <Card.Title title="Card Title" subtitle="Card Subtitle"  />
                    <Card.Content>
                    <Text variant="titleLarge">Card title</Text>
                    <Text variant="bodyMedium">Card content</Text>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                    </Card.Actions>
                </Card>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });