import express from  'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;

const PORT = 9000;
const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer. { /* options */})
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  },
  pingTimeout: 5000,
  pingInterval: 100000
});

const poolConfig = {
  host: 'localhost',
  database: 'transfer',
  port: 5432,
  connectionTimeoutMillis: 120000,
  max: 5
};

const pool = new Pool(poolConfig);

pool.connect(err => {
  if(err) {
      console.error('Database connection error', err.stack);
  }
  else {
      console.log('Connected');
  }
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

io.on('connection', (socket) => {
  console.log(`'${socket.id}' just connected`);
  socket.on('disconnect', (reason) => {
    socket.disconnect();
    console.log(`A user has disconnected. ${socket.id}`);
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log(`A user has disconnected.`);
  })

  socket.on('getAllOrders', page => {
    pool.query(`SELECT * from orders`)
      .then(result => {
        console.log('query after getAllOrders', result.rows);
        socket.emit('allData', result.rows);
        return results.rows;
      })
      .catch(error => {``
        return new Error(error);
      })

  })

  socket.on('getColumns', page => {
    pool.query(`SELECT * from columns`)
      .then(result => {
        console.log('Get All columns ', result.rows);
        socket.emit('allColumns', result.rows);
      })
      .catch(error => {
        return new Error(error);
      })

  })

  socket.on('changeLocations', info => {
    console.log('this is the info', info)
    pool.query(`SELECT * from columns`)
      .then(result => {
        // console.log('Get All columns ', result.rows);
        // socket.emit('allColumns', result.rows);
      })
      .catch(error => {
        return new Error(error);
      })
  });

  socket.on('changeOrder', info => {
    console.log('this is the info', info)
    const endColumnName = info.columnId;
    const reOrderedColumn = info.reOrderedColumn;
    console.log('splitup', endColumnName, reOrderedColumn);
    const values = [endColumnName, reOrderedColumn]

    // reOrderedColumn = reOrderedColumn.toString();

    // UPDATE columns set orderids = ARRAY ['1','2','3','4'] where id = 'column-1';

    pool.query(`UPDATE columns SET orderids = $2 WHERE id = $1 RETURNING *`, values)
      .then(result => {
        console.log('after update Columns', result.rows);
        // socket.emit('allColumns', result.rows);
        pool.query(`select * from columns`)
          .then(result => {
            socket.broadcast.emit('allColumns', result.rows);
            socket.emit('allColumns', result.rows);
          })
      })
      .catch(error => {
        return new Error(error);
      })
  });

  socket.on('draggedToNewColumn', info => {
    console.log('this is the info', info)
    const startColumnId = info.startColumnId;
    const reOrderedStartColumn = info.reOrderedStartColumn;
    const endColumnName = info.endColumnId;
    const reOrderedEndColumn = info.reOrderedEndColumn;
    const valuesStartCol = [startColumnId, reOrderedStartColumn];
    const valuesEndCol = [endColumnName, reOrderedEndColumn]

    pool.query(`UPDATE columns SET orderids = $2 WHERE id = $1 RETURNING *`, valuesStartCol)
      .then(result => {
        console.log('after editing start col', result);
        pool.query(`UPDATE columns SET orderids = $2 WHERE id = $1 RETURNING *`, valuesEndCol)
          .then(result => {
            pool.query(`select * from columns`)
            .then(result => {
              socket.broadcast.emit('allColumns', result.rows);
              socket.emit('allColumns', result.rows);
            })
          })
        .catch(err => new Error(err))
      })
      .catch(err => new Error(err))
  })

});



io.on('connection_error', (err) => {
  console.log(err.req);
  console.log(err.code);
  console.log(err.message);
  console.log(err.context);
})

app.get('/', (req, res) => {
  console.log(req);
  res.json({
    message: 'hello'
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is running on', PORT);
});

