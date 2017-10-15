import React from 'react';
import {
  TextField,
  Checkbox,
  SelectField,
  SelectionControlGroup,
  DatePicker,
  TimePicker,
  Switch
} from 'react-md';


export const RenderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <TextField
      id={input.name}
      label={label}
      value={input.value}
      {...custom}
      error={touched && !!error}
      errorText={error}
      onChange={input.onChange}
      />
  );
};

export const RenderDatePicker = ({ meta: { touched, error }, input, label, custom }) => {
  const value = input.value ? new Date(input.value) : null;
  return (
    <DatePicker
        id={input.name}
        name={input.name}
        value={value}
        label={label}
        error={touched && !!error}
        errorText={error}
        onChange={input.onChange}
        firstDayOfWeek={1}
        displayMode="portrait" 
        {...custom}
    />
  );
};
 
export const RenderTimePicker = ({ meta: { touched, error }, input, label, custom }) => {
  let value = Date.parse(input.value);
  value = !!value ? new Date(value) : Date.parse("1970-01-01T" + input.value);
  value = !!value ? new Date(value) : null;
  return (
    <TimePicker
        id={input.name}
        name={input.name}
        value={value}
        label={label}
        error={touched && !!error}
        errorText={error}
        onChange={input.onChange}
        displayMode="portrait" 
        locales="se"
        {...custom}
    />
  );
};

export const RenderCheckBox = ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <Checkbox
      id={input.name}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      label={label}
      {...custom}
    />
  );
};

export const RenderSelectionControl = ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <SelectionControlGroup
      id={input.name}
      name={input.name}
      value={
        Array.isArray(input.value) ? 
          input.value.join(',') : 
          input.value
      }
      label={label}
      onChange={input.onChange}
      {...custom}
    />
  );
};

export const RenderSelectField = ({ input, label, meta: { touched, error }, ...custom}) => {
  return ( 
    <SelectField
      id={input.name}
      label={label}
      onChange={input.onChange}
      {...custom}
    />
  );
};

export const RenderSwitch = ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <Switch 
      id={input.name}
      name={input.name}
      label={label}
      onChange={input.onChange}
      {...custom}
    />
  );
};
