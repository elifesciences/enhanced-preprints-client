import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextField } from './text-field';

export default {
  title: 'Atoms/Forms/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const TextFieldDefault = Template.bind({});
TextFieldDefault.args = {
  id: 'emailAddress1',
  inputType: 'email',
  label: {
    isVisuallyHidden: false,
    labelText: 'Email Address',
  },
  name: 'emailAddress',
  autofocus: true,
};

export const TextFieldError = Template.bind({});
TextFieldError.args = {
  id: 'name4',
  inputType: 'text',
  label: {
    labelText: 'Error text field',
  },
  name: 'name',
  state: 'invalid',
  messageGroup: {
    id: 'idOfTheMessageGroup',
    errorText: 'Please provide a valid value',
  },
};

export const TextFieldInfo = Template.bind({});
TextFieldInfo.args = {
  id: 'comment1',
  inputType: 'text',
  label: {
    labelText: 'Text field with additional info',
  },
  name: 'comment',
  state: 'invalid',
  autofocus: true,
  disabled: false,
  messageGroup: {
    id: 'idOfTheMessageGroup',
    infoText: 'You may wish to consider this',
  },
};

export const TextFieldInfoError = Template.bind({});
TextFieldInfoError.args = {
  id: 'name4',
  inputType: 'text',
  label: {
    labelText: 'Error text field with additional info',
  },
  name: 'name',
  state: 'invalid',
  messageGroup: {
    id: 'idOfTheMessageGroup',
    errorText: 'Please provide a valid value',
    infoText: 'You may wish to consider this',
  },
};
