import {TodoAdd} from './todo-add'
import { userEvent, within } from '@storybook/testing-library';

export default {
  component: TodoAdd
};

export const normal = {
  render: () => `<todo-add></todo-add>`,
};

export const withPlay = {
  render: () => `<todo-add></todo-add>`,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText('Add a new task...', {
      selector: 'input',
    });
    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 100,
    });
  }
};
