import React from "react";
import { StyleSheet, Text, View, Image} from 'react-native';

const HeaderProfile=({ userImage, username, description }) => {
    return(
        <View style={styles.container}>
            
            <View style={styles.userInfo}>
            <Image
                style={styles.logo}
                source={{uri:userImage}}
            />
            <Text style={styles.username} >{username}</Text>
            </View>
            <View style={styles.descrition}>
                <Text style={styles.title} >{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        
      top: 80,
      left: 10,
      
    },
    logo:{
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    userInfo:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        left: 30,
        flexDirection: 'row',
        fontSize: 14,
        color: 'gray',
    },
    descrition:{
        
    }
});

export default HeaderProfile;