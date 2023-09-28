import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import pg from "pg";
const { Pool } = pg;

const PORT = 9000;
const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer. { /* options */})
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
  pingTimeout: 5000,
  pingInterval: 100000,
});

const poolConfig = {
  host: "localhost",
  database: "transfer",
  port: 5432,
  connectionTimeoutMillis: 120000,
  max: 5,
};

const pool = new Pool(poolConfig);

pool.connect((err) => {
  if (err) {
    console.error("Database connection error", err.stack);
  } else {
    console.log("Connected");
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

io.on("connection", (socket) => {
  console.log(`'${socket.id}' just connected`);
  socket.on("disconnect", (reason) => {
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });

  socket.on("getAllOrders", (page) => {
    pool
      .query(`SELECT * from orders`)
      .then((result) => {
        socket.emit("allData", result.rows);
        return results.rows;
      })
      .catch((error) => {
        ``;
        return new Error(error);
      });
  });

  socket.on("getColumns", (page) => {
    pool
      .query(`SELECT * from columns`)
      .then((result) => {
        socket.emit("allColumns", result.rows);
      })
      .catch((error) => {
        return new Error(error);
      });
  });

  socket.on("changeLocations", (info) => {
    pool
      .query(`SELECT * from columns`)
      .then((result) => {
        // console.log('Get All columns ', result.rows);
        // socket.emit('allColumns', result.rows);
      })
      .catch((error) => {
        return new Error(error);
      });
  });

  socket.on("changeOrder", (info) => {
    const endColumnName = info.columnId;
    const reOrderedColumn = info.reOrderedColumn;
    const values = [endColumnName, reOrderedColumn];

    // reOrderedColumn = reOrderedColumn.toString();

    // UPDATE columns set orderids = ARRAY ['1','2','3','4'] where id = 'column-1';

    pool
      .query(
        `UPDATE columns SET orderids = $2 WHERE id = $1 RETURNING *`,
        values
      )
      .then((result) => {
        // socket.emit('allColumns', result.rows);
        pool.query(`select * from columns`).then((result) => {
          socket.broadcast.emit("allColumns", result.rows);
          socket.emit("allColumns", result.rows);
        });
      })
      .catch((error) => {
        return new Error(error);
      });
  });

  socket.on("draggedToNewColumn", (info) => {
    // console.log("this is the info", info);
    const startColumnId = info.startColumnId;
    const reOrderedStartColumn = info.reOrderedStartColumn;
    const endColumnName = info.endColumnId;
    const reOrderedEndColumn = info.reOrderedEndColumn;
    const valuesStartCol = [startColumnId, reOrderedStartColumn];
    const valuesEndCol = [endColumnName, reOrderedEndColumn];

    pool
      .query(
        `UPDATE columns SET orderids = $2 WHERE id = $1 RETURNING *`,
        valuesStartCol
      )
      .then((result) => {
        // console.log("after editing start col", result);
        pool
          .query(
            `UPDATE columns SET orderids = $2 WHERE id = $1 RETURNING *`,
            valuesEndCol
          )
          .then((result) => {
            pool.query(`select * from columns`).then((result) => {
              socket.broadcast.emit("allColumns", result.rows);
              socket.emit("allColumns", result.rows);
            });
          })
          .catch((err) => new Error(err));
      })
      .catch((err) => new Error(err));
  });

  socket.on("newOrder", async (info) => {
    // console.log("breakdown in socket", info.name, info.phone, info.items);
    // const values = [info.name, info.phone, info.items];
    const values = [info.name, info.phone];

    //TODO: pool query the total number of items need
    // query to add items into the list
    // query to take newly added item and then post to the second table of columns;
    // get the table and alter:

    const addedItem = await pool.query(
      `INSERT INTO orders(name, phone, items) VALUES ($1, $2, ARRAY ['Burger with beer', 'soda can', 'sprite']) RETURNING id`,
      values
    );
    pool
      .query(`select * from orders`)
      .then((result) => {
        // console.log("query after getAllOrders", result.rows);
        socket.broadcast.emit("allData", result.rows);
        socket.emit("allData", result.rows);
        return results.rows;
      })
      .catch((error) => {
        return new Error(error);
      });
    // need to send back all of the items to the client with an emit:
    // console.log(addedItem)
    const rowId = addedItem.rows[0].id;
    const columnArray = await pool.query(
      `SELECT orderids from columns where id = 'column-1'`
    );
    // console.log('result from first query', columnArray);
    // console.log(columnArray.rows[0].orderids);
    const newArray = columnArray.rows[0].orderids.slice();
    newArray.unshift(rowId);

    // console.log('added new ARray', newArray);
    const values2 = ["column-1", newArray];
    const alterOrders = await pool.query(
      `UPDATE columns SET orderids = $2 WHERE id = $1 RETURNING *`,
      values2
    );
    // console.log('this is altered orders', alterOrders);
    const allColumns = await pool.query(`select * from columns`);
    const dataToSend = allColumns.rows;
    // console.log('what is the data to send', allColumns);
    // console.log('what is the data to send', allColumns.rows);
    socket.broadcast.emit("allColumns", dataToSend);
    socket.emit("allColumns", dataToSend);
  });
});

io.on("connection_error", (err) => {
  console.log(err.req, err.code, err.message, err.context);
});

app.get("/", (req, res) => {
  res.json({
    message: "hello",
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
