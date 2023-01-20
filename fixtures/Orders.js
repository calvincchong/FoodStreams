const initialData = {
  orders: {
    '1': {
      id: '1',
      name: 'make chicken',
      phone: '9897456541',
      items: [
        'Roti', 'Curry', 'Stirfry', 'Chicken', 'Beef', 'rendang', 'dessert', 'satay', 'sweetandsour'] // items themselves probably need to be objects - id doesn't really matter, but the post of this will be difficult though
    },
    '2': {
      id: '2',
      name: 'THIS IS JUST A STRING, order-2 Roti, curry, stirfry',
      phone: '9897456541',
      items: [
        'Roti', 'Curry', 'Stirfry', 'Chicken'
      ]
    },
    '3': {
      id: '3',
      name: 'THIS IS JUST A STRING, order-3 chickeny',
      phone: '9897456541',
      items: [
        'Chicken'
      ]
    },
    '4': {
      id: '4',
      name: 'THIS IS JUST A STRING, order-4 chickeny',
      phone: '9897456541',
      items: [
        'Diet Coke'
      ]
    },
    '5': {
      id: '5',
      name: 'THIS IS JUST A STRING, order-5 chickeny',
      phone: '9897456541',
      items: [
        'sprite', 'chicken', 'chocolate'
      ]
    },
    '6': {
      id: '6',
      name: 'THIS IS JUST A STRING, order-6 chickeny',
      phone: '9642836518',
      items: [
        'yikes '
      ]
    },
    '7': {
      id: '7',
      name: 'order7 b making me Koo Koo',
      phone: '8574882283',
      items: [
        'yikes '
      ]
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      orderIds: ['1', '2', '4', '5']
    },
    'column-2': {
      id: 'column-2',
      title: 'working on',
      orderIds: ['3']
    },
    'column-3': {
      id: 'column-3',
      title: 'column-3',
      orderIds: []
    }
  },
  // this is where the data for how to organize the orders will be held.
  columnOrder: ['column-1', 'column-2', 'column-3']
};

export default initialData;