import React, { useState } from "react";
import { Text, View } from "react-native";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_MAP_API_KEY = "AIzaSyBqsS3PdA1SsL-dONaiN86hc7hRAexdL3I"
const Map = () => {
    const [state, setState] = useState({
        pickupCords: {
            latitude: 24.8607,
            longitude: 67.0011,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        droploactionCords: {
            latitude: 27.7244,
            longitude: 68.8228,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

    })
    const { pickupCords, droploactionCords } = state
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>


            <MapView
                style={{ flex: 1 }}
                initialRegion={pickupCords}
            >
                <Marker
                    coordinate={pickupCords}

                />
                <MapViewDirections
                    origin={pickupCords}
                    destination={droploactionCords}
                    apikey={"AIzaSyBqsS3PdA1SsL-dONaiN86hc7hRAexdL3I"}
                    strokeWidth={4}
                    strokeColor="hotpink"
                />
            </MapView>


        </View>
    )
}
export default Map;