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
app.urlGen = `https://api.rawg.io/api/games?dates=${app.todaysDate},${app.futureDate}`;
app.url = app.urlGen;
app.pageNum = 1;

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
            page: app.pageNum,
            page_size: 8
        }
    }).then((data)=>{
        app.games = data.results;
        app.gridCreation();
       
    });
}

app.gridCreation = function(){
    
//results array comes in and then we for each them into template literals appended the games ul.  
    $.each(app.games, function(){
        let iconPlatforms = [];
        if (this.parent_platforms !== undefined) {  
            const gamePlatforms = this.parent_platforms.map((i) => { return i.platform.slug });
            iconPlatforms = $.map(gamePlatforms, (i) => {
                if (i === 'mac') {
                    return '<i class="fab fa-apple" aria-hidden="true" title="Available for Mac"></i><span class="srOnly">Available for Mac</span>'
                } else if (i === 'pc') {
                    return '<i class="fas fa-laptop" aria-hidden="true" title="Available for PC"></i><span class="srOnly">Available for PC</span>'
                } else if (i === 'android') {
                    return '<i class="fab fa-android" aria-hidden="true" title="Available for Android"></i><span class="srOnly">Available for Android</span>'
                } else if (i === 'playstation') {
                    return '<i class="fab fa-playstation" aria-hidden="true" title="Available for Playstation"></i><span class="srOnly">Available for Playstation</span>'
                } else if (i === 'xbox') {
                    return '<i class="fab fa-xbox" aria-hidden="true" title="Available for Xbox"></i><span class="srOnly">Available for Xbox</span>'
                } else if (i === 'linux') {
                    return '<i class="fab fa-linux" aria-hidden="true" title="Available for Linux"></i><span class="srOnly">Available for Linux</span>'
                } else if (i === 'nintendo') {
                    return '<i class="fas fa-gamepad" aria-hidden="true" title="Available for Nintendo Switch"></i><span class="srOnly">Available for Nintendo Switch</span>'
                } else if (i === 'ios') {
                    return '<i class="fab fa-app-store-ios" aria-hidden="true" title="Available for iPhone"></i><span class="srOnly">Available for iPhone</span>'
                }
            }).join("")  
        }

        const gameGenres = this.genres.map((i)=>{return i.name}).join(", ");
        $('.games').append(
            `<li class="gameBox" value="${this.id}">
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
    $('.games').append(`<div class="gameBox getMore">
        <label class="srOnly">Press to get more games</label>
        <span></span><span></span>
        </div>`)
}
//
// Event Listeners looking for genre selection in form
app.selectionListener = function() {
    $('.genreSelect').on('change', function () {
        $('.games').empty();
        app.pageNum = 1
        if ($(this).val() !== 'allGames') {
            app.url = `${app.urlGen}&genres=${$(this).val()}`;
            app.apiGeneral(app.url);
        } else {
            app.apiGeneral(app.urlGen);
            app.url = app.urlGen
        }
    });
}

//Event listener for the pop-up window for game details
app.gameDetailListener = function(){
    $('ul').on('click', 'li', function(){
        let gameDescription = ""
        $.ajax({
            url: `https://api.rawg.io/api/games/${$(this).attr("value")}`,
            method: 'GET',
            dataType: 'json',
            headers: {
            'User-Agent': 'Web Dev Bootcamp Project'
            },
        }).then(function(data){
            createsCard(data);
        });
            function createsCard (data){
                const gamePlatforms = data.parent_platforms.map((i)=> {return i.platform.slug});
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
                const gameGenres = data.genres.map((i) => { return i.name }).join(", ");
                $('.popupBox').html(
                    `<div style="background-image:url(${data.background_image}">
                        <div class="closePopup">
                        <label class="srOnly">Close the popup</label>
                        <span>xxxxxx</span><span></span>
                        </div>
                        <h3>${data.name}</h3>
                        <ul><li>${iconPlatforms}</li></ul>
                    </div>
                    <div>
                        <time datetime="${data.released}">${data.released}</time>
                        <p>${gameGenres}</p>
                    </div>
                    <div>
                    <p>${data.description_raw}</p>
                    </div>
                    `
                ).fadeIn(1000);
            
            }
    });
}

//Event listener to add next page of current specified filter of games
app.getMoreListener = function() {
    $('.games').on('click', '.getMore', function () {
        $(this).remove();
        app.pageNum ++;
        app.apiGeneral(app.url);
    })
}

// Event listener for closing the popup window
app.closePopupBox = function() {
    $('article').on('click', '.closePopup', function() {
        $('.popupBox').fadeOut(1000);   
    })
}

// Init
app.init = function() {
    app.selectionListener();
    app.gameDetailListener();
    app.getMoreListener();
    app.apiGeneral(app.urlGen);
    app.closePopupBox();
}

// Document ready
$(function(){
    app.init();
})