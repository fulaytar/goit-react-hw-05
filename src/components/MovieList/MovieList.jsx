export default function MovieList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <p>{movie.original_title}</p>
        </li>
      ))}
    </ul>
  );
}
