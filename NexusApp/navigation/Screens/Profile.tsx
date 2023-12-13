// https://github.com/DesignIntoCode/ReactProfile02/tree/master
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import demoprofiles from "../../assets/data/demoprofiles";
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export default function Profile() {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const storedAccount = await AsyncStorage.getItem('account');
                if (storedAccount) {
                    setAccount(JSON.parse(storedAccount));
                }
            } catch (error) {
                console.error('Error retrieving account information:', error.message);
            }
        };

        fetchAccount();
    }, []);

    if (!account) {
        return (
            <View>
                <Text style={styles.text}>No account information available. Please log in.</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <FlatList
                    data={demoprofiles}
                /> */}
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
                    <Ionicons name="md-create" size={24} color="#52575D" /> 
                </View>
                {/* Interests Section */}
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Julie</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Photographer</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Interests</Text>
                    <Text style={styles.sectionContent}>Photography, Travel, Technology</Text>
                </View>
                 {/* Skills Section */}
                 <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <Text style={styles.sectionContent}>Portrait Photography, Adobe Photoshop, Lightroom</Text>
                </View>

                {/* Work History Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Work History</Text>
                    <Text style={styles.sectionContent}>Freelance Photographer (2018 - Present)</Text>
                    <Text style={styles.sectionContent}>Studio XYZ Photographer (2016 - 2018)</Text>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {/* ... (unchanged) */}
                    </ScrollView>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    sectionContainer: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#52575D"
    },
    sectionContent: {
        marginTop: 8,
        fontSize: 16,
        color: "#AEB5BC"
    }
});