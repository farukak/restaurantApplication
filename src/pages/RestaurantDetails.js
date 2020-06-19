import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, Linking, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import Home from '../components/icons/Home';
import Phone from '../components/icons/Phone';


const RestaurantDetails = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    })

    console.log(props.route.params.area);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ?
                    <View style={{ flex: 1 }}>
                        <PacmanIndicator />
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <ImageBackground source={require('../images/background.png')} style={{
                            flex: 1,
                            resizeMode: 'cover',
                        }}>
                            <View style={styles.container}>
                                <Image source={{ uri: props.route.params.image_url }} style={{ width: 180, height: 150, margin: 16 }} />
                                <Text style={styles.text, { fontSize: 36, color: 'white' }}>{props.route.params.name}</Text>
                                <Text style={styles.text}>{props.route.params.area}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Home stroke="white" />
                                    <Text style={styles.text}>{props.route.params.address}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Phone stroke="white" />
                                    <Text style={styles.text}>{props.route.params.phone}</Text>
                                </View>



                            </View>

                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }} onPress={() => Linking.openURL(props.route.params.mobile_reserve_url)}>
                                <Text style={{ color: 'white', fontSize: 24 }} >Rezervasyon</Text>
                            </TouchableOpacity>

                        </ImageBackground>
                    </View>

            }
        </SafeAreaView>
    )
}
const dim = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        flex: 9,
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: dim.width / 1,
        height: dim.height / 4,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        color: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,

        elevation: 3,
    },
    text: {
        fontSize: 16,
        color: 'white',
        padding: 16,
    }

});

export default RestaurantDetails;

