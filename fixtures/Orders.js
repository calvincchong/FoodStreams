const initialData = {
  orders: {
    'order-1': {
      id: 'order-1',
      name: 'make chicken',
      phone: '9897456541',
      items: [
        'Roti', 'Curry', 'Stirfry', 'Chicken', 'Beef', 'rendang', 'dessert', 'satay', 'sweetandsour'] // items themselves probably need to be objects - id doesn't really matter, but the post of this will be difficult though
    },
    'order-2': {
      id: 'order-2',
      name: 'THIS IS JUST A STRING, order-2 Roti, curry, stirfry',
      phone: '9897456541',
      items: [
        'Roti', 'Curry', 'Stirfry', 'Chicken'
      ]
    },
    'order-3': {
      id: 'order-3',
      name: 'THIS IS JUST A STRING, order-3 chickeny',
      phone: '9897456541',
      items: [
        'Chicken'
      ]
    },
    'order-4': {
      id: 'order-4',
      name: 'THIS IS JUST A STRING, order-4 chickeny',
      phone: '9897456541',
      items: [
        'Diet Coke'
      ]
    },
    'order-5': {
      id: 'order-5',
      name: 'THIS IS JUST A STRING, order-5 chickeny',
      phone: '9897456541',
      items: [
        'sprite', 'chicken', 'chocolate'
      ]
    },
    'order-6': {
      id: 'order-6',
      name: 'THIS IS JUST A STRING, order-6 chickeny',
      phone: '9642836518',
      items: [
        'yikes '
      ]
    },
    'order-7': {
      id: 'order-7',
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
      orderIds: ['order-1', 'order-2', 'order-4', 'order-5', 'order-6', 'order-7']
    },
    'column-2': {
      id: 'column-2',
      title: 'working on',
      orderIds: ['order-3']
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