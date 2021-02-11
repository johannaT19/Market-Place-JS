let searchBar = document.getElementById('search-item');
let courses = document.querySelectorAll('.courses__container .course__item');
let noCourse = document.getElementById('no_course');

searchBar.addEventListener('keyup', (input) => {
    // On prends la valeur dans l'input que l'on transforme en minuscule
    let searchInput = input.target.value.toLowerCase();
    for (let i = 0; i < courses.length; i++) {
        const course = courses[i]
        // On récupère le nom de la leçon que l'on transforme en minuscule
        const courseLangage = course.querySelector('h4').innerHTML.toLowerCase();
        // Si l'input est présent dans le nom on l'affiche
        if (courseLangage.indexOf(searchInput) > -1) {
            course.style.display = "flex";
        }else{ // Sinon on cache le nom 
            course.style.display = "none";
        }
    }
    let count = 0;
    for (let i = 0; i < courses.length; i++){
        // Si un cours est affiché, on ajoute +1 à la variable count
        if(courses[i].style.display == 'flex'){
            count++;
        }
    }
    // Si aucun cours n'est affiché sans que l'input ne soit vide 
    if (count == 0 && searchBar != ''){
        noCourse.classList.remove('hidden');
    } // On enlève le 'hidden' à la classe rendant alors le message d'erreur visible
    if (searchInput == '' || count != 0 ){
        noCourse.classList.add('hidden');
    } // On enlève le 'hidden' à la classe rendant alors le message d'erreur invisible
});


