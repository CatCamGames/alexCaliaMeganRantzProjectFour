// Initial call for general list of games
// Return 8 games at a time to the grid
// Listen for genre selection from the side bar drop down
// If they change genre, there will be a new API call for that genre
// Return results to the grid
// Create a dropdown option for All Games to bring back the initial general list of games to the grid
// Declare namespace
const app = {}
app.selectionGenre = "";
app.currentDate = new Date();
app.todaysDate = `${app.currentDate.getFullYear()}-${("0" + (app.currentDate.getMonth() + 1)).slice(-2)}-${("0" + (app.currentDate.getDate())).slice(-2)}`;
app.futureDate = `${app.currentDate.getFullYear() + 1}-${("0" + (app.currentDate.getMonth() + 1)).slice(-2)}-${("0" + (app.currentDate.getDate())).slice(-2)}`;
app.games = [];
app.urlGen = `https://api.rawg.io/api/games?dates=${app.todaysDate},${app.futureDate}`
// API Calls
app.apiGeneral = function(i){
    $.ajax({
        url: i,
        method: 'GET',
        dataType: 'json',
        headers: {
            'User-Agent': 'Web Dev Bootcamp Project'
        },
        data: {
            page_size: 8
        }
    }).then((data)=>{
        app.games = data.results;
        $.each(app.games, function(){
            app.gridCreation();
        })
    });
}

app.gridCreation = function(){
    $('.games').empty();
//results array comes in and then we for each them into template literals appended the games ul.  
    $.each(app.games, function(){
        const gamePlatforms = this.parent_platforms.map((i)=> {return i.platform.slug});
        const iconPlatforms = $.map(gamePlatforms,(i)=>{
            if (i === 'mac') {
                return '<i class="fab fa-apple" aria-hidden="true" title="Available for Mac"></i><span class="srOnly">Available for Mac</span>'
            } else if (i === 'pc') {
                return '<i class="fas fa-laptop" aria-hidden="true" title="Available for PC"></i><span class="srOnly">Available for PC</span>'
            } else if (i === 'android') {
                return '<i class="fab fa-android" aria-hidden="true" title="Available for Android"></i><span class="srOnly">Available for Android</span>'
            } else if (i === 'playstation') {
                return '<i class="fab fa-playstation" aria-hidden="true" title="Available for Playstation"></i><span class="srOnly">Available for Playstation</span>'
            } else if (i === 'xbox'){
                return '<i class="fab fa-xbox" aria-hidden="true" title="Available for Xbox"></i><span class="srOnly">Available for Xbox</span>'
            } else if (i === 'linux') {
                return '<i class="fab fa-linux" aria-hidden="true" title="Available for Linux"></i><span class="srOnly">Available for Linux</span>'
            } else if (i === 'nintendo') {
                return '<i class="fas fa-gamepad" aria-hidden="true" title="Available for Nintendo Switch"></i><span class="srOnly">Available for Nintendo Switch</span>'
            } else if (i === 'ios') {
                return '<i class="fab fa-app-store-ios" aria-hidden="true" title="Available for iPhone"></i><span class="srOnly">Available for iPhone</span>'
            }
        }).join("");
        const gameGenres = this.genres.map((i)=>{return i.name}).join(", ");
        $('.games').append(
            `<li class="gameBox">
                <div style="background-image:url(${this.background_image}")>
                    <h3>${this.name}</h3>
                </div>
                <article>
                    <time datetime="${this.released}">${this.released}</time>
                    <p>${gameGenres}</p>
                    <ul><li>${iconPlatforms}</li><ul>
                </article>
            </li>`
        );
    });
}

// Event Listeners
app.selectionListener = function() {
    $('.genreSelect').on('change', function () {
        app.selectionGenre = $(this).val();
        if (app.selectionGenre !== 'allGames') {
            let urlGenre = `https://api.rawg.io/api/games?dates=${app.todaysDate},${app.futureDate}&genres=${$(this).val()}`;
            app.apiGeneral(urlGenre);
        } else {
            app.apiGeneral(app.urlGen);
        }
        console.log(urlGenre);
    });
}
// Init
app.init = function() {
    app.selectionListener();
    app.apiGeneral(app.urlGen);
}
// Document ready
$(function(){
    app.init();
})

// <i class="fab fa-apple"></i>
// <i class="fab fa-app-store-ios"></i>
// <i class="fab fa-android"></i>
// <i class="fab fa-playstation"></i>
// <i class="fab fa-xbox"></i>
// <i class="fab fa-linux"></i>
// <i class="fas fa-laptop"></i>
// <i class="fas fa-gamepad"></i>
