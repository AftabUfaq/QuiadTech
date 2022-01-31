import React, {useState, useEffect} from 'react';
import {Dimensions,StyleSheet,TextInput,Text,View,} from 'react-native';
import {NativeBaseProvider, Select, CheckIcon } from "native-base";
const App = () => {
    const [currency, selectedCurrency] = useState("Australian dollars");
    const [value_in_us_dollars, setValueInUsDollars] = useState(null)
    const [exchnagecurrency,setExchangeCurrency] = useState(0)
    const [exchangedata, setExchangeData] = useState([
        {name:"EURO", code: "EUR",  value: 0.8957},
        {name:"Paistani Rupee", code: "PKR", value: 176.80807},
        {name:"Armenian drams",code: "AED",value:3.67212},
        {name:"EURO",code:"AMD",value: 480.8386},
        {name:"Australian dollars",code:"AUD",value: 1.42557},
        {name:"Bangladeshi takas",code:"BDT",value: 85.97812},
        {name:"Canadian dollars",code:"CAD",value: 1.27368},
        {name:"Indian Rupee",code:"INR",value: 74.97988}
  ])

    useEffect(() => {
      changeUsDollarToSelectedCurrency(value_in_us_dollars)
    },[exchnagecurrency])

    const changeUsDollarToSelectedCurrency = (value) => {
      let data =  exchangedata.find((element) => {
          return element.name === currency;
      })  
      setValueInUsDollars(value)
      setExchangeCurrency(value/data.value)
    }
  
  return (
    <NativeBaseProvider>
        <View style={{flex:1, backgroundColor:"#fff"}}>
            <Select 
                selectedValue={currency} 
                minWidth="200" 
                ml={2}
                mr={2}
                mb={2}
                accessibilityLabel="Select Currency"   
                placeholder="Select Currency" 
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} 
                mt={2} 
                onValueChange={(itemValue) => selectedCurrency(itemValue)}>
                  {
                  exchangedata.map((item, index) => {
                    return(
                      <Select.Item key={`${index}`} label={item.name} value={item.name} />
                    )
                  })
                }
                
          </Select>
          <View style={styles.container} >
              <View style={styles.box}>
                <TextInput 
                  keyboardType={"number-pad"}
                  style={styles.textInput} 
                  value={value_in_us_dollars}
                  placeholder='Please Enter value'
                  onChangeText={(text) => changeUsDollarToSelectedCurrency(text)}
                />
              <Text style={styles.text} >US  Dollar (USD)</Text>
              </View>
              <View style={styles.box}>
                  <Text style={{height:80, fontSize:28,fontWeight:"bold"}} >{parseFloat(exchnagecurrency).toFixed(2)}</Text>
                  <Text style={styles.text}>{currency}</Text>
              </View>
          </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    flexDirection:"row",
    justifyContent:"space-between", 
    paddingTop:50,
    backgroundColor:"#fff"
  },
  textInput:{
    height: 100,
    borderRadius: 10 ,
    fontSize:14,
    fontWeight:"bold",
    textAlignVertical:"top",
    backgroundColor:"#0000" 
  },
  box:{
    borderRadius:0,
    borderColor:"#33a9f2",
    backgroundColor:"#73c0f0",
    borderWidth:2,
    borderTopLeftRadius:20,
    padding:10,
    width:Dimensions.get('screen').width/2.3,
    height:150
  },
  text:{
    fontSize:16,
    fontWeight:"bold"
  }
});

export default App;
