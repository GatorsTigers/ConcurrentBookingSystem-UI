import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import { styled } from "styled-components";

const TheaterShowCard = styled(Card)`
    background-color:black;

`;


export const MovieShows = ({theater={}}) => {
    const {
        showIds="10:00 PM",
        theaterName="PVR Whitefield",
        movieName,
    } = theater
    return (
        <Text></Text>
    )
};