import { describe, beforeEach, test, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore from '../redux/createStore';
import Controls from '../components/Controls';

describe('Controls test', () => {
  let result;
  let container;
  let store;

  beforeEach(() => {
    window.localStorage.setItem('reduxState', '{}');

    store = createStore();

    result = render(
      <Provider store={store}>
        <Controls />
      </Provider>,
    );

    container = result.container;
  });

  afterEach(cleanup);

  test('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('default state', () => {
    const add = result.getByText('Add');
    const spectate = result.getByText('Spectate');
    const remove = result.getByText('Remove');

    expect(add).toBeDisabled();
    expect(spectate).toBeDisabled();
    expect(remove).toBeDisabled();
  });

  test('type url', () => {
    const input = result.getByPlaceholderText('Game url');
    const add = result.getByText('Add');
    const spectate = result.getByText('Spectate');
    const remove = result.getByText('Remove');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(add).toBeEnabled();
    expect(spectate).toBeDisabled();
    expect(remove).toBeDisabled();
  });

  test('Add url', async () => {
    const input = result.getByPlaceholderText('Game url');
    const add = result.getByText('Add');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(add);

    const update = await result.findByText('Update');
    const newUrl = await result.findByDisplayValue('test');

    expect(update).toBeDisabled();
    fireEvent.change(newUrl, { target: { value: 'updated' } });

    expect(update).toBeEnabled();
    fireEvent.click(update);

    expect(update).toBeDisabled();
  });

  test('Remove url', async () => {
    const input = result.getByPlaceholderText('Game url');
    const add = result.getByText('Add');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(add);

    const [remove] = await result.findAllByText('Remove');
    fireEvent.click(remove);

    const inputs = result.getAllByPlaceholderText('Game url');
    expect(inputs).toHaveLength(1);
  });
});
