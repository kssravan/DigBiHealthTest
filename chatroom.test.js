// __tests__/Login-page-test.js
import 'react-native';
import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import GiftedChat from 'react-native-gifted-chat';
import App from './App';


describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('App children render', () => {
  const tree = renderer.create(<App />).toJSON();
  const View = tree.children.find(el => el.type == 'View');
  expect(View).toMatchSnapshot();
});