// Initial call for general list of games
// Return 8 games at a time to the grid
// Listen for genre selection from the side bar drop down
// If they change genre, there will be a new API call for that genre
// Return results to the grid
// Create a dropdown option for All Games to bring back the initial general list of games to the grid

// Declare namespace
const app = {}

app.selectionGenre = "";
//app.currentDate = Date();
app.games = [];
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
                <div style="background-image:url(${this.background_image})>
                    <h3>${this.name}</h3>
                </div>
                <time datetime="${this.released}">${this.released}</time>
                <p>GENRES</p>
                <ul><li>PLATFORMS</li><ul>
            </li>`
        )
    });
   

    //<li><div background-image><h3>TITLE</h3></div>p release date list of genres Date- list of icons platforms </li>
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

    // $('app.games').each(function(index){
    //     console.log(index.name);
    // })
    app.games.forEach((item,)=> {
        console.log(item.name);
    })
})