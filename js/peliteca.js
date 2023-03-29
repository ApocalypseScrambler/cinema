const infoPelicula = document.getElementById('infoPelicula');

document.getElementById('borrar').onclick = function () {

    infoPelicula.classList.remove('mostrarInfoPelicula');
    infoPelicula.classList.add('ocultarInfoPelicula');

}

document.getElementById('buscar').onclick = function () {
    
    const titulo = document.getElementById('titulo').value.replace(/[ ]/g, "+");
    const poster = document.getElementById('imagenPoster');

    const endPoint = 'https://www.omdbapi.com/?t=' + titulo + '&plot=full&apikey=9c761bf0';

    axios.get(endPoint)
        .then(response => {
            infoPelicula.classList.add('mostrarInfoPelicula');
            infoPelicula.classList.remove('ocultarInfoPelicula');
            document.getElementById('nombrePelicula').textContent = response.data.Title
            document.getElementById('añoPelicula').textContent = response.data.Year
            document.getElementById('clasificacionPelicula').textContent = response.data.Rated
            document.getElementById('lanzamientoPelicula').textContent = response.data.Released
            document.getElementById('duracionPelicula').textContent = response.data.Runtime
            document.getElementById('generoPelicula').textContent = response.data.Genre
            document.getElementById('directorPelicula').textContent = response.data.Director
            document.getElementById('escritorPelicula').textContent = response.data.Writer
            document.getElementById('actoresPelicula').textContent = response.data.Actors
            document.getElementById('sinopsisPelicula').textContent = response.data.Plot
            document.getElementById('idiomaPelicula').textContent = response.data.Language
            document.getElementById('paisPelicula').textContent = response.data.Country
            document.getElementById('premiosPelicula').textContent = response.data.Awards
            document.getElementById('puntajePelicula').textContent = response.data.imdbRating
            poster.src = response.data.Poster;
        }, error => {
            console.log(error);
        });
    
}
