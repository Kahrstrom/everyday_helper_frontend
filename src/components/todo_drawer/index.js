import React from 'react';
import {
  Button,
  Drawer,
  CardTitle,
  Toolbar,
} from 'react-md';
import './index.css';
import FormTodo from '../form_todo';

const TodoDrawer = ({ visible, onVisibilityChange, todo }) => (
  <Drawer
    type={Drawer.DrawerTypes.TEMPORARY}
    visible={visible}
    onVisibilityChange={onVisibilityChange}
    position="right"

  >
    <Toolbar
      colored
      fixed
      nav={<Button icon onClick={() => onVisibilityChange(false)}>close</Button>}
      title={todo.title}
      prominentTitle
    />
    <section className="md-toolbar-relative--prominent dialogs__content drawers__content__scrollable">
      <FormTodo todo={todo} />
    </section>
  </Drawer>
);

export default TodoDrawer;