import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore from '../redux/createStore';
import Controls from '../components/Controls';

describe('Controls test', () => {
  let container;
  let store;

  beforeEach(() => {
    window.localStorage.setItem('reduxState', '{}');

    store = createStore();

    const result = render(
      <Provider store={store}>
        <Controls />
      </Provider>,
    );

    container = result.container;
  });

  test('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('default state', () => {
    const add = screen.getByText('Add');
    const spectate = screen.getByText('Spectate');
    const remove = screen.getByText('Remove');

    expect(add).toBeDisabled();
    expect(spectate).toBeDisabled();
    expect(remove).toBeDisabled();
  });

  test('type url', () => {
    const input = screen.getByPlaceholderText('Game url');
    const add = screen.getByText('Add');
    const spectate = screen.getByText('Spectate');
    const remove = screen.getByText('Remove');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(add).toBeEnabled();
    expect(spectate).toBeDisabled();
    expect(remove).toBeDisabled();
  });

  test('Add url', async () => {
    const input = screen.getByPlaceholderText('Game url');
    const add = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(add);

    const update = await screen.findByText('Update');
    const newUrl = await screen.findByDisplayValue('test');

    expect(update).toBeDisabled();
    fireEvent.change(newUrl, { target: { value: 'updated' } });

    expect(update).toBeEnabled();
    fireEvent.click(update);

    expect(update).toBeDisabled();
  });

  test('Remove url', async () => {
    const input = screen.getByPlaceholderText('Game url');
    const add = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(add);

    const [remove] = await screen.findAllByText('Remove');
    fireEvent.click(remove);

    const inputs = screen.getAllByPlaceholderText('Game url');
    expect(inputs).toHaveLength(1);
  });
});
