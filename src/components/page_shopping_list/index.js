import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchShoppingLists, 
    selectShoppingList, 
    creatingShoppingList, 
    editShoppingList, 
    cancelEdit,
    checkFilterDone,
    checkFilterMine
} from '../../actions/shopping_list';

import ShoppingList from '../shopping_list';
import { Button, FontIcon, Toolbar, SelectionControl, TabsContainer, Tabs, Tab } from 'react-md';
import { Loader } from '../loader';
import './index.css';
// import ShoppingListDrawer from '../ShoppingList_drawer';

class PageShoppingList extends Component {
    fetch() {
        this.props.fetch(this.props.session.auth_token);
    }
    select(ShoppingList) {
        this.props.select(ShoppingList);
        this.props.edit();
    }

    addShoppingList() {
        this.props.creating(this.props.session.user);
    }

    onChangeDoneFilter(checked) {
        this.props.checkFilterDone(checked);
    }

    onChangeMineFilter(checked, event) {
        this.props.checkFilterMine(checked);
    }

    setShoppingListVisibility() {
        if(this.props.editing) {
            this.props.cancelEdit();
        }else {
            this.props.edit();
        }
    }

    componentWillMount() {
        this.fetch();
    }
    render() {
        console.log("!")
        if(this.props.shoppingList.loading) {
            return (
                <Loader id="shoppingListloader" scale={2} loaderSize="medium" />
            );
        }
        return (
            <main className="page-container">

                <div className="md-grid">
                    <div className="md-cell md-cell--8-desktop md-cell--2-desktop-offset md-cell--8-tablet md-cell--6-mobile">
                        <ShoppingList
                            user={this.props.session.user}
                            handleSelect={(todo) => this.select(todo)} 
                            shoppingLists={this.props.shoppingList.shoppingLists}
                        />
                    </div>
                </div>
                       
                <Button className="fab" floating secondary onClick={() => this.addShoppingList()}><FontIcon>add</FontIcon></Button>
            </main>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        select: (ShoppingList) => dispatch(selectShoppingList(ShoppingList)),
        fetch: (auth_token) => dispatch(fetchShoppingLists(auth_token)),
        creating: () => dispatch(creatingShoppingList()),
        cancelEdit: () => dispatch(cancelEdit()),
        edit: () => dispatch(editShoppingList()),
        checkFilterDone: (checked) => dispatch(checkFilterDone(checked)),
        checkFilterMine: (checked) => dispatch(checkFilterMine(checked))
        // toggleShoppingListExpander: (expander) => dispatch(toggleShoppingListExpander(expander))
    };
};

const mapStateToProps = (state) => {
    return {
        session: state.session,
        shoppingList: state.shoppingList,
        editing: state.shoppingList.editing,
        filterDone: state.shoppingList.filterDone,
        filterMine: state.shoppingList.filterMine
        // futureExpanded: state.ui.ShoppingList.futureExpanded,
        // todayExpanded: state.ui.ShoppingList.todayExpanded,
        // lateExpanded: state.ui.ShoppingList.lateExpanded
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageShoppingList);