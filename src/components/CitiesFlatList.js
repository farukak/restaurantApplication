import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


const CitiesFlatList = (props) => {



    const renderCities = ({ item }) => {

        return (
            <TouchableOpacity style={styles.container} onPress={() => props.onItemSelect(item)}>
                <View>
                    <Text style={styles.item} >
                        {item}
                    </Text>
                </View>

                <View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={props.citiesList}
                keyExtractor={(item, index) => String(index)}
                renderItem={renderCities}
            />
        </View>
    )
}
const dim = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    item: {
        fontSize: 24,
        color: 'white',
    }
});

export default CitiesFlatList;