import { Card } from 'react-native-paper';
import { Text } from 'react-native';

export const MovieCard = ({movieName, imageUrl, cardContent}) => (
    <Card>
      <Card.Title title={movieName}/>
      <Card.Cover source={{ uri:  imageUrl}} />
      <Card.Content>
        <Text variant="bodySmall">{cardContent}</Text>
      </Card.Content>
    </Card>
  );

export default MovieCard;