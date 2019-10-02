// __tests__/Login-page-test.js
import 'react-native';
import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import GiftedChat from 'react-native-gifted-chat';
import App from './App';
import earlierMessages from './src/earlier';

describe('<App /> renders', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

// it('renders correctly', () => {
//   const tree = renderer.create(<App />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('App children render', () => {
//   const tree = renderer.create(<App />).toJSON();
//   const View = tree.children.find(el => el.type == 'View');
//   expect(View).toMatchSnapshot();
// });

it('on message send success!', () => {
  const tree = renderer.create(<App />).getInstance();
  // tree.props.messages = [{ id: 1, text: 'this is a message'}];
  const messages = [
    {
        _id: Math.round(Math.random() * 1000000),
        text:
          'This is a earlier message1',
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
          _id: 1,
          name: 'Sravan',
        },
    }
  ];
  tree.onSend(messages);
  expect(tree.state.messages.length).toBeGreaterThan(0);
});

it('on message send failure!', () => {
  const tree = renderer.create(<App />).getInstance();
  // tree.props.messages = [{ id: 1, text: 'this is a message'}];
  const messages = [
    {
        _id: Math.round(Math.random() * 1000000),
        text:
          'This is a earlier message1',
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
          _id: 1,
          name: 'Sravan',
        },
    }
  ];
  tree.onSend(messages);
  expect(tree.state.messages.length).toBe(0);
});

it('load earlier success', () => {
  const tree = renderer.create(<App />).getInstance();
  tree.onLoadEarlier(earlierMessages);
  setTimeout(() => {
    expect(tree.state.messages.length).toBeGreaterThan(0);
  }, 2000)
});