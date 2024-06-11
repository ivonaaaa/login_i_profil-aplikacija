//!serverski kod, node.js

//uvoz express library-ja
const express = require("express");
//stvaranje primjerka express aplikacije
const app = express();

//middleware funkcija za postavljanje CORS zaglavlja koja dopušta sve origin-e
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //dopušta različite HTTP metode za CORS
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//middleware za parsiranje dolaznih zahtjeva u JSON formatu
app.use(express.json());

//uvoz 'korisnici.js' datoteke koja služi kao baza podataka
let korisnici = require('./korisnici.js');

//!POST
//definiranje POST rute za obradu zahtjeva za prijavu
app.post('/login', (request, response) => {
  try {
    const { username, password } = request.body;

    const user = korisnici.find(u => u.username === username && u.password === password);

    if (user) {
      response.status(200).json({ message: "Successful authentication" });
    } else {
      response.status(401).json({ message: "Invalid username or password" });
    }
  }
  catch (error) {
    console.error("An error occurred:", error);
    response.status(500).json({ message: "An error occurred on the server" });
  }
});

//pokreće Express poslužitelj i sluša na portu 3000
app.listen(3000, () => {
    console.log(`Server je pokrenut na portu 3000.`);
});