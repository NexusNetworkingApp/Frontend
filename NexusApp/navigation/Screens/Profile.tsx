// https://github.com/DesignIntoCode/ReactProfile02/tree/master
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from "react-native";
import { TouchableOpacity } from 'react-native';
import MMKVStorage from 'react-native-mmkv-storage';
import { useNavigation } from '@react-navigation/native';

const mmkv = new MMKVStorage.Loader().initialize();

export default function Profile() {
    const navigation = useNavigation();
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
          try {
            const storedAccount = mmkv.getString('account');
            if (storedAccount) {
              setAccount(JSON.parse(storedAccount));
            }
          } catch (error) {
            console.error('Error retrieving account information:', error.message);
          }
        };
    
        fetchAccount();
    }, []);
    
      const handleLogout = () => {
        // Clear account information from MMKV
        mmkv.removeItem('account');
        mmkv.removeItem('isLoggedIn');
    
        // Navigate back to the home screen
        navigation.navigate('Home');
      };
      const handlejobposting = () => {
        // Clear account information from MMKV
        mmkv.removeItem('account');
        mmkv.removeItem('isLoggedIn');
    
        // Navigate back to the home screen
        navigation.navigate('jobposting');
      };

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
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
                {account.accountType === 'INDIVIDUAL' && (
                    <>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{account.individual.firstName} {account.individual.lastName}</Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Email</Text>
                            <Text style={styles.sectionContent}> {account.individual.email}</Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Gender</Text>
                            <Text style={styles.sectionContent}>{account.individual.gender}</Text>
                        </View>
                        {/* Skills Section */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Receive Notification</Text>
                            <Text style={styles.sectionContent}>{account.individual.receiveNotifications}</Text>
                        </View>
                        {/* Work History Section */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Biography</Text>
                            <Text style={styles.sectionContent}>{account.individual.biography}</Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Zip Code</Text>
                            <Text style={styles.sectionContent}>{account.individual.location}</Text>
                        </View>
                    </>
                )}
                {account.accountType === 'ORGANIZATION' && (
                    <>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> {account.organization.organizationName}</Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Email</Text>
                            <Text style={styles.sectionContent}>{account.organization.email}</Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Found Date</Text>
                            <Text style={styles.sectionContent}>{account.organization.foundedDate}</Text>
                        </View>
                        {/* Skills Section */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Industry</Text>
                            <Text style={styles.sectionContent}>{account.organization.industry}</Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Receive Notification</Text>
                            <Text style={styles.sectionContent}>{account.organization.receiveNotifications}</Text>
                        </View>
                        {/* Work History Section */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Biography</Text>
                            <Text style={styles.sectionContent}>{account.organization.biography}</Text>
                            
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Verified</Text>
                            <Text style={styles.sectionContent}>{account.organization.verified}</Text>
                            
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Zip Code</Text>
                            <Text style={styles.sectionContent}>{account.organization.location}</Text>
                        </View>
                        <TouchableOpacity style={styles.logoutButton} onPress={handlejobposting}>
                            <Text style={styles.logoutButtonText}>Post a job!</Text>
                        </TouchableOpacity>
                    </>
                )}
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
    },
    logoutButton: {
        backgroundColor: '#FF6347',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
      },
      logoutButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
      },
});