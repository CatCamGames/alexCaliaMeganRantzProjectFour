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

// API Calls
app.apiGeneral = function(){
    $.ajax({
        url: `https://api.rawg.io/api/games?dates=${app.todaysDate},${app.futureDate}`,
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
        $('.games').append(
            `<li>
                <div style="background-image:url(${this.background_image}")>
                    <h3>${this.name}</h3>
                </div>
                <time datetime="${this.released}">${this.released}</time>
                <p>GENRES</p>
                <ul><li>PLATFORMS</li><ul>
            </li>`
        );
    });
}

// Event Listeners
app.selectionListener = function() {
    $('.genreSelect').on('change', function () {
        app.selectionGenre = $(this).val();
    });
}

// Init
app.init = function() {
    app.selectionListener();
    app.apiGeneral();
}

// Document ready
$(function(){
    app.init();
})