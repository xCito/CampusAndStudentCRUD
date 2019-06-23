// NPM packages and Object imports
const { Client } = require('pg');
const express = require('express');
const colors = require('colors');
const {dbpass} = require('./../dp_pass');

// Set up connection to my postgres database
const connString = 'postgres://postgres:'+dbpass+'@localhost:5432/postgres';
const client = new Client({
  connectionString: connString,
})
client.connect()
.then( () => console.log('Established connection with database!'.magenta))
.catch( e => console.log('Error connecting to database!:\n'.red + e));


// Instantiate express web server
const app = express();

app.use( express.json() );
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// ------------------------ GETS --------------------------- //

// Route to get all students
app.get('/getAllStudents', function(request, response) {
  console.log('GET Request for: All students'.cyan);

  // Query database for all students info
  client.query('SELECT * FROM students')
    .then((res) => {
      console.log('\tGet Request was successful'.cyan.underline);
      response.send(res.rows);  // Returns array of student info
    })
    .catch( e => {
      console.log('\tGet Request failed'.cyan.underline);
      response.send([]); 
    });  // Error returns empty array
  
});

/* + + + + + + + + + + + + + + + + */

// Route to get all campuses
app.get('/getAllCampuses', function(request, response) {
  console.log('GET Request for: All Campuses'.cyan);
  
  // Query database for all campuses info
  client.query('SELECT * FROM campuses')
    .then((res) => {
      console.log('\tGet Request was successful'.cyan.underline);
      response.send(res.rows);  // Returns array of campus info
    })
    .catch( e => {
      console.log('\tGet Request failed'.cyan.underline);
      response.send([]); 
    });  // Error returns empty array
});

/* + + + + + + + + + + + + + + + + */

// Route to get single student
app.get('/getSingleStudent/:studentId', function(request, response) {
  console.log('GET Request for: Single Student'.cyan);

  // Query database for a student by id
  client.query('SELECT * FROM students WHERE id = $1', [request.params.studentId])
    .then((res) => {
      console.log('\tGet Request was successful'.cyan.underline);
      response.send(res.rows);  // Returns array of student info obj
    })
    .catch( e => {
      console.log('\tGet Request failed'.cyan.underline);
      response.send([]); 
    });  // Error returns empty array

});

/* + + + + + + + + + + + + + + + + */

// Route to get single campus
app.get('/getSingleCampus/:campusId', function(request, response) {
  console.log('GET Request for: Single Campus'.cyan);

  // Query database for a student by id
  client.query('SELECT * FROM campuses WHERE id = $1', [request.params.campusId])
  .then((res) => {
    console.log('\tGet Request was successful'.cyan.underline);
    response.send(res.rows);  // Returns array of student info obj
  })
  .catch( e => {              // Error returns empty array
    console.log('\tGet Request failed'.cyan.underline);
    response.send([]);
  });  
 
});

/* + + + + + + + + + + + + + + + + */

// Route to get students of specific campus
app.get('/getStudentByCampusId/:campusId', function(request, response) {
  console.log('GET Request for: Students of specific campus'.cyan);

  client.query('SELECT * FROM students WHERE campus_id = $1', [request.param.campusId])
  .then( res => {
    console.log('\tGet Request was successful'.cyan.underline);
    response.send(res.rows);
  })
  .catch( err => {
    console.log('\tGet Request failed'.cyan.underline);
    response.send([]);
  });

});


// ------------------------ POSTS --------------------------- //

// Route to add a new campus
app.post('/addCampus', function(request, response) {
  console.log('POST Request for: A Campus'.yellow);
  let name   = request.body.name;           // Campus name  
  let addr   = request.body.address;        // Campus address
  let imgUrl = request.body.url;            // Campus img url
  let descr  = request.body.description;    // Campus description (undefined == '')

  // Query database to insert a new campus
  let queryStr = 'INSERT INTO campuses (name, address, imageurl, description)';
  queryStr += ' VALUES ($1, $2, $3, $4)';

  client.query(queryStr, [name, addr, imgUrl, descr])
  .then((res) => {
    console.log('\tInsertion successful'.yellow.underline);
    response.send('success');  // if insertion was successful
  })
  .catch( e => {        
    console.log('\tInsertion failed'.yellow.underline);
    response.send('failure')  // if insertion failed 
  });  

});

/* + + + + + + + + + + + + + + + + */

// Route to add a new student
app.post('/addStudent', function(request, response) {
  console.log('POST Request for: A Student'.yellow);
  let fname  = request.body.fname;              // Student first name 
  let lname  = request.body.lname;              // Student last name 
  let email  = request.body.email;              // Student email  
  let imgUrl = request.body.url;                // Student img url
  let gpa    = request.body.gpa;                // Student GPA
  let campus = request.body.campusId;           // Student campus 

  // Query database to insert a new campus
  let queryStr = 'INSERT INTO students (fname, lname, email, imageurl, gpa, campus_id)';
  queryStr += ' VALUES ($1, $2, $3, $4, $5, $6)';

  client.query(queryStr, [fname, lname, email, imgUrl, gpa, campus])
  .then((res) => {
    console.log('\tInsertion successful'.yellow.underline);
    response.send('success');  // if insertion was successful
  })
  .catch( e => {        
    console.log('\tInsertion failed'.yellow.underline);
    response.send('failure')  // if insertion failed 
  });  
});

// ------------------------ DELETES --------------------------- //
app.delete('/removeCampus', function(request, response) {
  console.log('DELETE Request for: A Campus by id'.green);
  let campusId = request.body.campusId;

  client.query('DELETE FROM campuses WHERE id = $1', [campusId])
  .then( (res) => {
    if(res.rowCount >= 1) {
      console.log('\tDeletion successful'.green.underline);
      response.send('success'); 
    } else {
      console.log('\tDeletion failed'.green.underline);
      response.send('failure');
    }
  })
  .catch( err => {
    console.log(err);
    response.send('failure');
  });
  
}); 
// -----------------------------------------------------------

// Start listening on port ____
app.listen(5000, function( ) {
  console.log('Server is listening on port 5000!...');
});
