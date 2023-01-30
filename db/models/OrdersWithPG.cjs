export const tableQuery = `
  CREATE TABLE IF NOT EXIST orders (
    id serial PRIMARY KEY,
    name varchar(1000),
    phone bigint,
    items text[]
  )
`

export const addItems = `
  INSERT INTO orders(id, name, phone, items)
  VALUES (1, 'calvin', 8574882838, ARRAY ['Roti', 'Chicken', 'Stirfry'])
  RETURNING * ;
`

export const addItems2 = `
  INSERT INTO orders(id, name, phone, items)
  VALUES (2, 'Richard', 3474882838, ARRAY ['Roti', 'Curry', 'Diet Coke', 'Chicken', 'Stirfry'])
  RETURNING * ;
`

export const addItems2 = `
  INSERT INTO orders(id, name, phone, items)
  VALUES (3, 'Kevin', 3479559595, ARRAY ['Satay', 'Papaya Salad'])
  RETURNING * ;
`

export const addItems3 = `
  INSERT INTO orders(id, name, phone, items)
  VALUES (4, 'Jenny', 3939559595, ARRAY ['Chicken Noodle Soup', 'Satay', 'Papaya Salad', 'Diet Coke'])
  RETURNING * ;
`

export const addItems3 = `
  INSERT INTO orders(id, name, phone, items)
  VALUES (5, 'Stella', 3930009595, ARRAY ['Chicken Noodle Soup', 'Satay', 'Papaya Salad', 'Diet Coke'])
  RETURNING * ;
`

INSERT INTO orders(id, name, phone, items)
  VALUES (0, 'Wai', 3930009595, ARRAY ['Chicken Noodle Soup', 'Satay', 'Papaya Salad', 'Diet Coke'])
  RETURNING * ;

export const columnQuery = `
  CREATE TABLE IF NOT EXIST columns (
    id VARCHAR(200) PRIMARY KEY,
    title VARCHAR(200),
    orderIds TEXT[]
  )
`

export const addColumn1 = `
  INSERT INTO columns(id, title, orderIds)
  VALUES ('column-1', 'Incoming', ARRAY['1', '2', '3', '4'])
  RETURNING * ;
`

export const addColumn2 = `
  INSERT INTO columns(id, title, orderIds)
  VALUES ('column-2', 'Working', ARRAY['5'])
  RETURNING * ;
`

export const addColumn3 = `
  INSERT INTO columns(id, title)
  VALUES ('column-3', 'Complete')
  RETURNING * ;