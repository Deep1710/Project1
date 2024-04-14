import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {Divider} from 'react-native-paper';

const App = () => {
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100');
      const data = await response.json();
      setItems(data.object);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => addToCart(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.mediaUrl }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.name}>
         ₹{item.variants.filter((data1) => data1.sellingPrice)[0]?.sellingPrice}</Text>

         <Text style={styles.name}>rating: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  

  return (
   
    <View style={styles.container}>
     <Divider/>
   
      <View style={styles.header}>
        
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => console.log('Arrow pressed')}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>jars</Text>
        </View>
        
        <View style={styles.rightHeader}>
         
          <Ionicons name="search" size={24} color="black" style={styles.icon} />
         
          <Ionicons name="heart" size={24} color="black" style={styles.icon} />
         
          <Ionicons name="cart" size={24} color="black" style={styles.icon} />
        </View>
  
      </View>
       <Divider/>

      <View style={styles.rightHeader1}>
       <Ionicons name="funnel" size={10} color="black" style={styles.icon} />
            <Text>Sort</Text>
         
        <Ionicons name="options" size={10} color="black" style={styles.icon} />
            <Text>Filter</Text>
      </View>


      <FlatList
        style={styles.full}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop:30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHeader1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:240
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'left',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 3,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  full:{
    width:'150%',
  }
});

export default App; 




