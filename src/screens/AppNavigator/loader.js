import { Text, View, Modal, ActivityIndicator, Dimensions } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const Loader = () => {
    return (
        <Modal animationType="slide"
            transparent={true}>

            <View style={{ width: responsiveWidth(100), height: responsiveHeight(100), justifyContent: 'center', alignItems: 'center', alignSelf: 'center',backgroundColor:"rgba(255,255,255,0.7)" }}>
                <View style={{ width: responsiveWidth(20), backgroundColor: '#C0C0C0', padding: 20, borderRadius: 50 }}>
                    <ActivityIndicator size="large" color="#000" />
                </View>

            </View>

        </Modal>
    )
}