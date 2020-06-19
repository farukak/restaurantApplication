import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ImageBackground, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import CitiesFlatList from '../components/CitiesFlatList';
import { PacmanIndicator } from 'react-native-indicators';

const Cities = (props) => {

    const [citiesList, setCitiesList] = useState([]);

    const [tempCitiesList, setTempCitiesList] = useState([]);

    const [numberOfList, setNumberOfList] = useState(0);

    const [loading, setLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => { fetchData() }, []);


    const fetchData = async () => {
        setLoading(true);

        let data = await axios.get('https://opentable.herokuapp.com/api/cities');

        setCitiesList(data.data.cities);

        setTempCitiesList(data.data.cities);

        setNumberOfList(data.data.count);

        setLoading(false);

        console.log(data.data.cities);

    }



    const onItemSelect = (item) => {
        props.navigation.navigate("Restaurants", { item });
    }

    const searchCities = (text) => {
        let filter = tempCitiesList.filter((item) => {
            const listText = item.toUpperCase();
            const userText = text.toUpperCase();

            return listText.indexOf(userText) > - 1;
        });

        setNumberOfList(filter.length);
        setCitiesList(filter);
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ?
                    <ImageBackground source={require('../images/background.png')} style={{
                        flex: 1,
                        resizeMode: 'cover',
                    }}>
                        <PacmanIndicator color="white" />
                    </ImageBackground>
                    :

                    <View style={{ flex: 1 }}>
                        <ImageBackground source={require('../images/background.png')} style={{
                            flex: 1,
                            resizeMode: 'cover',
                        }}>
                            <View style={styles.container}>
                                <View style={styles.textInputContainer}>
                                    <TextInput placeholder="Şehir girin" placeholderTextColor='white' onChangeText={searchCities} style={styles.textInput} />
                                </View>
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.textInput}>{numberOfList}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 9 }}>
                                <CitiesFlatList citiesList={citiesList} onItemSelect={onItemSelect} />
                            </View>
                        </ImageBackground>
                    </View>
            }
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 12,
        margin: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textInputContainer: {
        borderColor: 'white',
    },

    textInput: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 24,
    }

});

export default Cities;