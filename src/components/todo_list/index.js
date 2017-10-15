import React from 'react';
import { List, ListItem } from 'react-md/lib/Lists';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import moment from 'moment';
import './index.css';



const TodoList = (props) => {
    const { 
        todos, 
        handleSelect, 
        filterDone, 
        filterMine, 
        user,
        todayExpanded,
        futureExpanded,
        lateExpanded,
        toggleTodoExpander
    } = props;
    
    const item = (todo, handleSelect) => {
        const format = moment().isSame(todo.date, 'd') ? 'HH:mm' : 'YYYY-MM-DD HH:mm';
        const signature = todo.user.name.split(' ').map((name) => {return name.charAt(0).toUpperCase();});
        return <ListItem
                primaryText={todo.title}
                secondaryText={`Due at ${moment(todo.date).format(format)}\n${todo.description}`}
                key={todo.id}
                threeLines
                onClick={() => handleSelect(todo)}
                rightIcon={<FontIcon>alarm</FontIcon>}
                leftAvatar={<Avatar suffix="grey">{signature}</Avatar>} /> ;
    }
    
    const list = (list, handleSelect) => {
        if(list.length !== 0) {
            return list.map((todo) => {
                return item(todo, handleSelect);
            });
        } else {
            return <div className="todo-list-empty-state">Nothing here</div>;
        }
    }

    const lateTodos = todos.filter((todo) => {
        return moment().startOf('day').diff(todo.date) > 0 && (filterDone || !todo.done) && (!filterMine || todo.user.id === user.id);
    });
    const todayTodos = todos.filter((todo) => {
        return moment().isSame(todo.date, 'd') && (filterDone || !todo.done) && (!filterMine || todo.user.id === user.id);
    });
    const futureTodos = todos.filter((todo) => {
        return moment().endOf('day').diff(todo.date) < 0 && (filterDone || !todo.done) && (!filterMine || todo.user.id === user.id);
    });
    
    const lateList = list(lateTodos, handleSelect),
            todayList = list(todayTodos, handleSelect),
            futureList = list(futureTodos, handleSelect);
    
    return (
        <ExpansionList>
            <ExpansionPanel defaultExpanded={todayExpanded} onExpandToggle={() => toggleTodoExpander('todayExpanded')} label="Today's to-dos" footer={null}>
                <List>
                    {todayList}
                </List>
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded={lateExpanded} onExpandToggle={() => toggleTodoExpander('lateExpanded')} label="Late to-dos" footer={null}>
                <List>
                    {lateList}
                </List>
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded={futureExpanded} onExpandToggle={() => toggleTodoExpander('futureExpanded')} label="Future to-dos" footer={null}>
                <List>
                    {futureList}
                </List>
            </ExpansionPanel>
        </ExpansionList>
    );
}

export default TodoList;