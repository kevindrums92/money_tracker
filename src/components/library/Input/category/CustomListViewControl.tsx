import { FontAwesome5 } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Category, CategoryGrouped, Type } from '../../../../types/category';
import { toCamelCase } from '../../../../utils/stringUtils';
import SeparatorLine from '../../SeparatorLine';
import { getCategories } from './CategoriesSource';

interface CustomListViewControlProps { 
    onChange: (category: Category)=> void;
}
interface ItemProps {
    item: CategoryGrouped;
    onChange: (category: Category)=> void;
}

const Item = (props: ItemProps) => (
    <View>
        <View style={styles.headerContener}><Text style={styles.headerTitle}>{toCamelCase(props.item.Name)}</Text></View>
        <View style={styles.container}>
            {props.item.Categories.map((cat, index) => (
                <TouchableOpacity key={index} style={styles.item} onPress={() => {
                    props.onChange(cat);
                }}>
                    <View style={{ ...styles.imageItemContainer, backgroundColor: cat.Color }} >
                        <FontAwesome5 style={styles.imageItem} name={cat.Icon} size={25} color={"white"} />
                    </View>
                    <View style={styles.itemTitleContainer}>
                        <Text style={styles.itemTitle}>{cat.Name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);
const CustomListViewControl = (props: CustomListViewControlProps) => {
    const [filterSelected, setFilterSelected] = React.useState<Type>("expenses");
    const renderItem = (item: CategoryGrouped, index: number) => (
        <Item item={item} key={index} onChange={props.onChange}/>
    );
    const selectedItemTextFilterStyle:StyleProp<TextStyle> = {
        ...styles.filterItemText,
        color: 'white',
        fontWeight: 'bold'
    }
    const data: CategoryGrouped[] = getCategories();
    return (
        <>
            {/* Filter */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterItem}
                onPress={()=>{
                    setFilterSelected("expenses");
                }}>
                    <Text style={(filterSelected === "expenses" ? selectedItemTextFilterStyle : styles.filterItemText)}>GASTOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem}
                onPress={()=>{
                    setFilterSelected("income");
                }}>
                    <Text style={(filterSelected === "income" ? selectedItemTextFilterStyle : styles.filterItemText)}>INGRESOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem}
                onPress={()=>{
                    setFilterSelected("savings");
                }}>
                    <Text style={(filterSelected === "savings" ? selectedItemTextFilterStyle : styles.filterItemText)}>AHORROS</Text>
                </TouchableOpacity>
            </View>
            <SeparatorLine />
            <ScrollView style={styles.categoryContainer}>
                <View>
                    {data.filter((i)=> i.Categories.filter((ii)=>ii.Type === filterSelected).length >0).map((item: CategoryGrouped, index: number) => {
                        return renderItem(item, index);
                    })}
                </View>
            </ScrollView>
        </>

    );
};

export default CustomListViewControl;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',

    },
    item: {
        marginVertical: 10,
        flexDirection: 'column',
        width: 100
    },
    imageItemContainer: {
        width: 50,
        height: 50,
        borderRadius: 40,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageItem: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    itemTitleContainer: {
        marginTop: 10
    },
    itemTitle: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center'
    },
    headerContener: {
        marginVertical: 30,
        marginHorizontal: 20,
        borderBottomColor: 'silver',
        borderBottomWidth: 1
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
    },
    filterContainer: {
        marginHorizontal:15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        alignContent: 'stretch',
    },
    filterItem: {
        flexDirection: 'row',
        padding: 15,
    },
    filterItemText: {
        color: 'gray',
        fontWeight: 'normal'
    },
    categoryContainer:{
        padding:10
    }
});
