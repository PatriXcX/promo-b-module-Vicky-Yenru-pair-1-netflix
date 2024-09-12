SELECT *
  FROM users
    JOIN users_has_movies ON (users.idUsers=users_has_movies.users_idUsers)
    JOIN movies ON (users_has_movies.movies_idmovies = movies.idmovies);