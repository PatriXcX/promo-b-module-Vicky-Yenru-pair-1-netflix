const express = require("express");
const mysql = require("mysql2/promise");

const cors = require("cors");

/* Comentario pq esta es la info previa a la petición a la BD 

const fakeMovies = [
  {
    id: 1,
    title: "Wonder Woman",
    genre: "Action",
    image:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
    category: "Superhero",
    year: 2017,
    director: "Patty Jenkins",
  },
  {
    id: 2,
    title: "Inception",
    genre: "Science Fiction",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
    category: "Thriller",
    year: 2010,
    director: "Christopher Nolan",
  },
];*/

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

/*server.get("/movies", (req, res) => {
  res.send({
    success: true,
    movies: fakeMovies,
  });
});
*/

async function getConnection() {
  try {
    const conn = await mysql.createConnection({
      host: "127.0.0.1", // = localhost
      user: "root",
      password: "patri",
      database: "netflix",
    });

    await conn.connect();

    return conn;
  } catch (error) {
    console.log(error);

    return null;
  }
}
// CAMBIO!!!
/*server.get("/", async (req, res) => {
  const conn = await getConnection();

  if (conn) {
    res.send("Me conecté");
  } else {
    res.status(500).send("Algo fallaaaa");
  }
});
*/

server.get("/movies", async (req, res) => {
  const conn = await getConnection();

  if (!conn) {
    res.status(500).send("Se rompió");
    return;
  }
  const [results, columns] = await conn.query("SELECT * FROM movies;");

  //const results = arrayDelConnQuery[0];

  console.log(results);

  res.json(results);

  conn.end();
});
