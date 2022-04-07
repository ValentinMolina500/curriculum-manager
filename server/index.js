if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Connection, Request } = require("tedious");
const express = require("express");

const databaseConfig = require("./dbconfig");
// const { queryDatabase } = require("./dboperations");

let serverInit = false;

/* Init HTTP server */
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
app.use(cors());
app.get("/", (req, res) => {

  /* Make call to server */
  if (!serverInit) {
    res.send("Database not ready.");
  }

  queryDatabase().then((rows) => {
    console.log("This is rows", rows);
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


function getAllCourses() {
  return new Promise((resolve, reject) => {
    const allRows = [];

    const request = new Request(
      `SELECT TOP (1000) [Class #]
      ,[Title]
      ,[Credits]
      ,[prereqs]
      ,[description]
      ,[Mtg Days]
      ,[Subject]
    FROM [CPT_S].[Computer_Science]
      `,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("row", columns => {
      const row = {};

      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      })

      allRows.push(row);
    })

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve(allRows);
    });

    connection.execSql(request);
  });
}

app.get("/courses", (req, res) => {
  getAllCourses().then((rows) => {
    res.json(rows);
  })
});

function getAllInstructors() {
  return new Promise((resolve, reject) => {
    const allRows = [];

    const request = new Request(
      `SELECT TOP (1000) [InsID]
      ,[InsWSUID]
      ,[InsFirstName]
      ,[InsMiddleName]
      ,[InsLastName]
      ,[InsEmail]
      ,[InsStatus]
      ,[InsSafetyOrientation]
      FROM [CMP].[Instructor]
      `,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("row", columns => {
      const row = {};

      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      })

      allRows.push(row);
    })

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve(allRows);
    });

    connection.execSql(request);
  });
}

app.get("/instructors", (req, res) => {
  getAllInstructors().then((rows) => {
    res.json(rows);
  })
});

/* Init connection to database */
const connection = new Connection(databaseConfig);
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    // queryDatabase();
    console.log("connected to database!");
    serverInit = true;
  }
});

connection.connect();


function queryDatabase() {
  return new Promise((resolve, reject) => {
    console.log("Reading rows from database...");
    const allRows = [];

    const request = new Request(
      `SELECT * from dbo.Master_schedule`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
    request.on("row", columns => {
      const row = {};

      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      })

      allRows.push(row);
    })

    request.on("doneInProc", (rowCount, more, rows) => {
      console.log("doneInProc!");
      resolve(allRows);
    });

    connection.execSql(request);
  });
}
