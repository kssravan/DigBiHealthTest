export default [
  {
    _id: Math.round(Math.random() * 1000000),
    text:
      'This is a earlier message1',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Sravan',
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'This is a earlier message2',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Sravan',
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'This is a system message.',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true,
  },
];