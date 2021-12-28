const cards = [
  {
    id: 'card-1',
    title: 'Work Report',
  },
  {
    id: 'card-2',
    title: 'Projects',
  },
  {
    id: 'card-3',
    title: 'Completing homework',
  },
];

const data = {
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'Todo',
      cards,
    },
    'list-2': {
      id: 'list-2',
      title: 'Pending',
      cards: [],
    },
  },
  listIds: ['list-1', 'list-2'],
};

export default data;
