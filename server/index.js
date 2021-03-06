if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { Connection, Request } = require("tedious");
const express = require("express");
const bodyParser = require("body-parser");

const databaseConfig = require("./dbconfig");
// const { queryDatabase } = require("./dboperations");

let serverInit = false;

/* Init HTTP server */
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  /* Make call to server */
  if (!serverInit) {
    res.send("Database not ready.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function getAllCourses() {
  return new Promise((resolve, reject) => {
    const allRows = [];

    const request = new Request(
      `SELECT TOP (1000) [CrsID]
      ,[CrsNumber]
      ,[CrsName]
      ,[CrsDescription]
      ,[CrsSubject]
    FROM [CMP].[Course]
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

    request.on("row", (columns) => {
      const row = {};

      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });

      allRows.push(row);
    });

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve(allRows);
    });

    connection.execSql(request);
  });
}

app.get("/courses", (req, res) => {
  getAllCourses().then((rows) => {
    res.json(rows);
  });
});

app.post("/courses", (req, res) => {
  addCourse(req.body).then(() => {
    res.sendStatus(200);
  });
});

function addCourse(payload) {
  return new Promise((resolve, reject) => {
    const request = new Request(
      `INSERT INTO [CPT_S].[Computer_Science]
      ([Subject]
        ,[Class #]
        ,[Title]
        ,[Credits])
      VALUES
      ('${payload.coursePrefix}'
      ,'${payload.courseNum}'
      ,'${payload.courseTitle}'
      ,'${payload.courseCredits}')`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    connection.execSql(request);
  });
}

function addInstructor(payload) {
  return new Promise((resolve, reject) => {
    // const request = new Request(
    //   `INSERT INTO [CMP].[Instructor]
    //   ([InsFirstName]
    //     ,[InsLastName]
    //     ,[InsEmail]
    //     ,[InsStatus]
    //     ,[InsSafetyOrientation])
    //   VALUES
    //   ('${payload.firstName}'
    //   ,'${payload.lastName}'
    //   ,'${payload.wsuEmail}'
    //   ,'${payload.isAdjunct}'
    //   ,'${payload.hadSafetyOrientation}')`,
    //   (err, rowCount) => {
    //     if (err) {
    //       console.error(err.message);
    //       reject(err.message);
    //     } else {
    //       console.log(`${rowCount} row(s) returned`);
    //     }
    //   }
    // );

    const request = new Request(
      `EXEC CMP.InsertInstructor
        @insFirstName = '${payload.firstName}',
        @insMiddleName = NULL,
        @insLastName = '${payload.lastName}',
        @insEmail = '${payload.wsuEmail}',
        @insStatus = '${payload.isAdjunct}',
        @insSafetyOrientation = '${payload.hadSafetyOrientation}'`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve(rows);
    });

    connection.execSql(request);
  });
}

app.post("/instructors", (req, res) => {
  addInstructor(req.body).then((row) => {
    console.log("THIS IS RETURNED ROW: ", row);
    res.json(row);
  });
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

    request.on("row", (columns) => {
      const row = {};

      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });

      allRows.push(row);
    });

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve(allRows);
    });

    connection.execSql(request);
  });
}

app.get("/instructors", (req, res) => {
  getAllInstructors().then((rows) => {
    res.json(rows);
  });
});

function getAllOfferings() {
  return new Promise((resolve, reject) => {
    const allRows = [];

    const request = new Request(
      `SELECT TOP (1000) 
      [CrsSubject]
      ,[CrsID]
      ,[OffID]
      ,[CrsNumber]
      ,[OffSection]
      ,[OffSection]
      ,[CrsName]
      ,[Instructor]
      ,[OffDay]
      ,[OffStartTime]
      ,[OffEndTime]
      ,[Room]
      , [InsID]
      FROM [CMP].[Offering_vw]
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

    request.on("row", (columns) => {
      const row = {};

      columns.forEach((column) => {
        const colName = column.metadata.colName;

        if (colName === "OffStartTime" || colName === "OffEndTime") {
          row[colName] = column.value.getTime();
        } else {
          row[colName] = column.value;
        }
      });

      allRows.push(row);
    });

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve(allRows);
    });

    connection.execSql(request);
  });
}

app.get("/offerings", (req, res) => {
  getAllOfferings().then((rows) => {
    res.json(rows);
  });
});

function deleteInstructor(payload) {
  const { instructorId } = payload;

  return new Promise((resolve, reject) => {
    const request = new Request(
      `EXEC CMP.DeleteInstructor @insID=${instructorId}`,
      (err, rowCount, rows) => {
        console.log("THIS IS ROWS: ", rows);
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve();
    });

    connection.execSql(request);
  });
}

app.delete("/instructors", (req, res) => {
  deleteInstructor(req.body).then((row) => {
    res.sendStatus(200); // Sal Good
  });
});

function addOffering(payload) {
  return new Promise((resolve, reject) => {
    const request = new Request(
      `EXEC CMP.InsertOffering
      @crsID = '${payload.courseID}',
      @offDay = '${payload.meetingDays}',
      @offStart = '${payload.courseStartTime}',
      @offEnd = '${payload.courseEndTime}',
      @offNumber = NULL,
      @offSection = '${payload.sectionNum}',
      @offBuilding = '${payload.building}',
      @offRoom = '${payload.roomNum}',
      @offLimit = NULL,
      @offEnrolled = NULL,
      @offCredits = '${payload.credits}',
      @offSeason = 'Spring',
      @offYear = '2022',
      @insID = '${payload.instructorID}'`,
      (err, rowCount, rows) => {
        console.log("THIS IS ROWS: ", rows);
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve();
    });

    connection.execSql(request);
  });
}
app.post("/offerings", (req, res) => {
  addOffering(req.body).then(() => {
    res.sendStatus(200);
  });
});

function deleteOffering(payload) {
  const { offeringId } = payload;

  return new Promise((resolve, reject) => {
    const request = new Request(
      `EXEC CMP.DeleteOffering @offID =${offeringId}`,
      (err, rowCount, rows) => {
        console.log("THIS IS ROWS: ", rows);
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("doneInProc", (rowCount, more, rows) => {
      resolve();
    });

    connection.execSql(request);
  });
}

app.delete("/offerings", (req, res) => {
  deleteOffering(req.body).then(() => {
    res.sendStatus(200);
  })
})

function getConflictsForCourse(payload) {
  const { courseSubject, courseName } = payload;

  return new Promise((resolve, reject) => {
    const allRows = [];
    const request = new Request(
      `EXEC dbo.Conflict_check @course_subject = '${courseSubject}', @course_name = '${courseName}'`,
      (err, rowCount, rows) => {
        console.log("THIS IS ROWS: ", rows);
        if (err) {
          console.error(err.message);
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    request.on("row", (columns) => {
      const row = {};

      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });

      allRows.push(row);
    });

    request.on("doneInProc", (rowCount, more, rows) => {
      console.log("getCOnflicts done: ", allRows);
      resolve(allRows);
    });

    connection.execSql(request);
  });
}
app.post("/conflicts", (req, res) => {
  getConflictsForCourse(req.body).then(rows => {
    res.json(rows);
  })
})

/* Init connection to database */
const connection = new Connection(databaseConfig);
connection.on("connect", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("connected to database!");
    serverInit = true;
  }
});

connection.connect();
