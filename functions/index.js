

const functions = require('firebase-functions');
const app = require('express')();
const { db } = require('./util/admin');
const config = require('./util/config');
const firebase = require('firebase');
var cors = require('cors')

 
app.use(cors())

firebase.initializeApp(config);

app.get('/notes', (request, response) => {

    db
      .collection('notes')
      .orderBy('date', 'desc')
      .get()
      .then((data) => {
        let notes = [];
        data.forEach((doc) => {
    
          notes.push({
            notesId: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            date: doc.data().date,
          });
        });
        return response.json(notes);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
      });

  });

  app.post('/notes', (request, response)=>{
    const newNote= {
      name: request.body.name,
      description: request.body.description,
      date: request.body.date || new Date().toISOString()
    }
    
    db
      .collection('notes')
      .add(newNote)
      .then((doc)=>{
        const responseNote = newNote;
        responseNote.id = doc.id;
        return response.json(responseNote);
    })
    .catch((err) => {
    response.status(500).json({ error: 'Something went wrong' });
    console.error(err);
    });

  });

  app.post('/login', (request, response)=>{

    console.log('called----->');

    const user = {
      email: request.body.email,
      password: request.body.password
    }

    console.log(user,'-----user')

  firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
          return data.user.getIdToken();
      })
      .then((token) => {
          return response.json({ token });
      })
      .catch((error) => {
          console.error(error);
          return response.status(403).json({ general: 'wrong credentials, please try again'});
      })
    
  })

exports.api = functions.https.onRequest(app);
