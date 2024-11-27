import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { supabase } from '../lib/supabase'
import { useState } from 'react';


const EditToList =  ({navigation}) => {
    const [code, subjectCode] = useState('');
    const [name, subjectName] = useState('');
    const [idcourse, courseId] = useState('');
    const [namecourse, courseName] = useState('');
    const [semester, semesterName] = useState(0);
    const editToList = async () =>{

        try{
            const{data,error} =await supabase
            .from('Test')
            .update({
                // subjectCode: code, 

                subjectName: name, 
                // grade: grade,
                // courseId: courseId,
                // semester: semester,
                // year: year,
               
            }) 
            .eq('subjectCode', code);


    
            if(error){
                Alert.alert('Error interacting with',error.message);
            }else{
                Alert.alert('Subject Edited Successfully');
                navigation.goBack();
            }
            
        }catch(error){
            Alert.alert('Error',error.message || 'An error occurred');
    
        }


    }
    

    return(
        <View style={styles.container}>
            <Text style={styles.name}>
               Nhập thông tin muốn thay đổi
            </Text>

            
            <TextInput style={styles.code} placeholder='Enter Code' onChangeText={subjectCode}/>

            <TextInput style={styles.code} placeholder='Enter Name' onChangeText={subjectName}/>

            <TextInput style={styles.code} placeholder='Enter CourseId' onChangeText={courseId}/>

            <TextInput style={styles.code} placeholder='Enter Coursename' onChangeText={courseName}/>

            <TextInput style={styles.code} placeholder='Enter semester' onChangeText={semesterName}/>

           
            <TouchableOpacity onPress={editToList}>
                <View style={styles.Button}>
                    <Text style={styles.ButtonText}>
                        Edit
                    </Text>
                </View>
            </TouchableOpacity>
            
        </View>


    )


};

export default EditToList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    code:{
        marginBottom: 10,
        borderColor: '#ccc',
        padding: 10,
        width: '75%',
        height: '6%',
        borderRadius:25,
        backgroundColor: '#F4F4F4',
        paddingLeft: 20,
    },

    name:{
        marginTop: -200,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 10, 
    },

    Button: {
        width: 200,
        height: 45,
        backgroundColor: '#7AB2D3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 60,
    },
    
    ButtonText:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }

})