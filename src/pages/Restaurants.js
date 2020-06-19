import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ImageBackground, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { PacmanIndicator } from 'react-native-indicators';

const Restaurants = (props) => {
    const [loading, setLoading] = useState(true);
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [tempRestaurantsList, setTempRestaurantsList] = useState([]);

    const [numberOfList, setNumberOfList] = useState();


    useEffect(() => {
        fetchComments();
    }, []);


    const fetchComments = async () => {
        setLoading(true);

        let { data } = await axios.get(`https://opentable.herokuapp.com/api/restaurants?city=${props.route.params.item}`);

        setRestaurantsList(data.restaurants);
        setTempRestaurantsList(data.restaurants);
        //console.log("RESTAURANTS PER PAGE " + total_entries);
        setNumberOfList(data.restaurants.length);
        //console.log("DATA PER PAGE " + total_entries);
        setLoading(false);
    }




    const renderRestaurants = ({ item }) => {

        return (
            <TouchableOpacity style={styles.restaurantCard} onPress={() => onItemSelect(item)}>
                <View style={{ padding: 12 }} >
                    <Image source={{ uri: item.image_url }} style={{ width: 100, height: 100 }} />
                </View>
                <View style={{ padding: 12 }}>
                    <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>{item.name}</Text>
                </View>
                <View style={{ padding: 12 }}>
                    <Text style={{ color: 'white' }}>{item.area}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    const onItemSelect = (item) => {
        console.log(item);
        props.navigation.navigate("RestaurantDetails", {
            image_url: item.image_url,
            name: item.name,
            area: item.area,
            address: item.address,
            phone: item.phone,
            mobile_reserve_url: item.mobile_reserve_url
        });

        props.navigation.setOptions({ title: item });

    }

    const searchRestaurant = (text) => {
        let filter = tempRestaurantsList.filter((item) => {
            const listText = item.name.toLowerCase();
            const userText = text.toLowerCase();
            return listText.indexOf(userText) > - 1;
        });

        setRestaurantsList(filter);
        setNumberOfList(filter.length);
        console.log(filter.length + " ");
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ?
                    <View style={{ flex: 1 }}>
                        <PacmanIndicator color="white"/>
                    </View>
                    :

                    <View style={{ flex: 1 }}>


                        <ImageBackground source={require('../images/background.png')} style={{
                            flex: 1,
                            resizeMode: 'cover',
                        }}>
                            <View style={styles.container}>
                                <View style={styles.textInputContainer}>
                                    <TextInput placeholder="Restaurant girin" placeholderTextColor='white' onChangeText={searchRestaurant} style={styles.textInput} />
                                </View>
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.textInput}>{numberOfList}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 9 }}>
                                <FlatList
                                    data={restaurantsList}
                                    keyExtractor={(item, index) => String(index)}
                                    renderItem={renderRestaurants}
                                />
                            </View>
                        </ImageBackground>
                    </View>
            }
        </SafeAreaView>
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
    },

    restaurantCard: {
        padding: 24,
        margin: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }

});

export default Restaurants;