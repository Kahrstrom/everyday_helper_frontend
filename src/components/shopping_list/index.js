import React from 'react';
import { List, ListItem } from 'react-md/lib/Lists';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import moment from 'moment';
import './index.css';



const ShoppingListList = (props) => {
    const { 
        shoppingLists, 
        handleSelect, 
        user
    } = props;
    
    const item = (shoppingList, handleSelect) => {
        const signature = shoppingList.user.name.split(' ').map((name) => {return name.charAt(0).toUpperCase();});
        return <ListItem
                primaryText={shoppingList.title}
                secondaryText=''
                key={shoppingList.id}
                onClick={() => handleSelect(shoppingList)}
                rightIcon={<FontIcon>shopping_cart</FontIcon>}
                leftAvatar={<Avatar suffix="grey">{signature}</Avatar>} /> ;
    }
    
    const list = (list, handleSelect) => {
        if(list.length !== 0) {
            return list.map((shoppingList) => {
                return item(shoppingList, handleSelect);
            });
        } else {
            return <div className="shopping-list-empty-state">Nothing here</div>;
        }
    }

    const futureShoppingList = shoppingLists.filter((shoppingList) => {
        return !shoppingList.done;
    });
    const doneShoppingList = shoppingLists.filter((shoppingList) => {
        return shoppingList.done;
    });
    
    const futureList = list(futureShoppingList, handleSelect),
            doneList = list(doneShoppingList, handleSelect);
    
    return (
        <ExpansionList>
            <ExpansionPanel defaultExpanded label="Coming shopping lists" footer={null}>
                <List>
                    {futureList}
                </List>
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded={false} label="Done shopping lists" footer={null}>
                <List>
                    {doneList}
                </List>
            </ExpansionPanel>
        </ExpansionList>
    );
}

export default ShoppingListList;