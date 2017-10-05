import React from 'react';
import TextField from 'react-md/lib/TextFields';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import Switch from 'react-md/lib/SelectionControls/Switch';
import SelectField from 'react-md/lib/SelectFields';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';

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
}

export const renderCheckBox = ({ input, label, meta: { touched, error }, ...custom }) => (
    <Checkbox
      id={input.name}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      label={label}
      {...custom}
    />
);

export const renderSelectionControl = ({ input, label, meta: { touched, error }, ...custom }) => (
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

export const renderSelectField = ({ input, label, meta: { touched, error }, ...custom}) => (
        <SelectField
          id={input.name}
          label={label}
          onChange={input.onChange}
          {...custom}
        />
);

export const renderSwitch = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Switch 
    id={input.name}
    name={input.name}
    label={label}
    onChange={input.onChange}
    {...custom}
  />
);
