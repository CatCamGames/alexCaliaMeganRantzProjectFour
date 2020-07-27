// Initial call for general list of games
// Return 8 games at a time to the grid
// Listen for genre selection from the side bar drop down
// If they change genre, there will be a new API call for that genre
// Return results to the grid
// Create a dropdown option for All Games to bring back the initial general list of games to the grid

// Declare namespace
const app = {}

app.selectionGenre = "";
app.currentDate = Date();

// API Calls
app.apiGeneral = function() {
    $.ajax({
        url: 'https://api.rawg.io/api/games?dates=2020-04-01,2021-04-01',
        method: 'GET',
        dataType: 'json',
        headers: {
            'User-Agent': 'Web Dev Bootcamp Project'
        },
        data: {
            page_size: 8
        }
    }).then((data)=>{
        console.log(data.results);
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
    console.log(currentDate);
})