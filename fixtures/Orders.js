const initialData = {
  orders: {
    'order-1': {
      id: 'order-1',
      name: 'make chicken',
      items: [
        'Roti', 'Curry', 'Stirfry', 'Chicken', 'Beef', 'rendang', 'dessert', 'satay', 'sweetandsour'] // items themselves probably need to be objects - id doesn't really matter, but the post of this will be difficult though
    },
    'order-2': {
      id: 'order-2',
      name: 'THIS IS JUST A STRING, order-2 Roti, curry, stirfry',
      items: [
        'Roti', 'Curry', 'Stirfry', 'Chicken'
      ]
    },
    'order-3': {
      id: 'order-3',
      name: 'THIS IS JUST A STRING, order-3 chickeny',
      items: [
        'Chicken'
      ]
    },
    'order-4': {
      id: 'order-4',
      name: 'THIS IS JUST A STRING, order-4 chickeny',
      items: [
        'Diet Coke'
      ]
    },
    'order-5': {
      id: 'order-5',
      name: 'THIS IS JUST A STRING, order-4 chickeny',
      items: [
        'sprite', 'chicken', 'chocolate'
      ]
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      orderIds: ['order-1', 'order-2', 'order-3', 'order-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'working on',
      orderIds: ['order-3']
    },
    'column-3': {
      id: 'column-3',
      title: 'column-3',
      orderIds: ['order-5']
    }
  },
  // this is where the data for how to organize the orders will be held.
  columnOrder: ['column-1', 'column-2', 'column-3']
};

export default initialData;