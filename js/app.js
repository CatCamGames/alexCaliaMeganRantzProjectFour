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

// JQuery cache
$ul = $('ul');
$article = $('article');
$games = $('.games');
$genreSelect = $('.genreSelect');
$popupBox = $('.popupBox');
$fullScreenBackground = $('.fullScreenBackground');
$scrollUp = $('.scrollUp');
$dialog = $('dialog');



// API Call
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
            page_size: 7
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
        // Error handling in case some games don't have platforms defined
        if (this.parent_platforms !== undefined) {
            // Grab the platforms from the object and push to a new array
            const gamePlatforms = this.parent_platforms.map((i) => i.platform.slug);
            // If statement to check for specific platform name from  the gamePlatforms array and push an array of list items with the corresponding icon, then join them into a string
            iconPlatforms = $.map(gamePlatforms, (i) => {
                if (i === 'mac') {
                    return '<li><i class="fab fa-apple" aria-hidden="true" title="Available for Mac"></i><span class="srOnly">Available for Mac</span></li>'
                } else if (i === 'pc') {
                    return '<li><i class="fas fa-laptop" aria-hidden="true" title="Available for PC"></i><span class="srOnly">Available for PC</span></li>'
                } else if (i === 'android') {
                    return '<li><i class="fab fa-android" aria-hidden="true" title="Available for Android"></i><span class="srOnly">Available for Android</span></li>'
                } else if (i === 'playstation') {
                    return '<li><i class="fab fa-playstation" aria-hidden="true" title="Available for Playstation"></i><span class="srOnly">Available for Playstation</span></li>'
                } else if (i === 'xbox') {
                    return '<li><i class="fab fa-xbox" aria-hidden="true" title="Available for Xbox"></i><span class="srOnly">Available for Xbox</span></li>'
                } else if (i === 'linux') {
                    return '<li><i class="fab fa-linux" aria-hidden="true" title="Available for Linux"></i><span class="srOnly">Available for Linux</span></li>'
                } else if (i === 'nintendo') {
                    return '<li><i class="fas fa-gamepad" aria-hidden="true" title="Available for Nintendo Switch"></i><span class="srOnly">Available for Nintendo Switch</span></li>'
                } else if (i === 'ios') {
                    return '<li><i class="fab fa-app-store-ios" aria-hidden="true" title="Available for iPhone"></i><span class="srOnly">Available for iPhone</span></li>'
                }
            }).join("")  
        }

        const gameGenres = this.genres.map((i)=> i.name).join(", ");
        $games.append(
            `<li class="gameBox" value="${this.id}" tabindex="0">
                <div style="background-image:url(${this.background_image}")>
                    <h2>${this.name}</h2>
                </div>
                <article>
                    <time datetime="${this.released}">${this.released}</time>
                    <p>${gameGenres}</p>
                    <ul>${iconPlatforms}<ul>
                </article>
            </li>`
        );
    });
    // Add a card at the end of the grid that will be used to pull more games from the API when clicked
    $games.append(`<div class="gameBox getMore" tabindex="0">
        <label class="srOnly">Press to get more games</label>
        <span class="circle"></span>
        </div>`)
}
//
// Event Listeners looking for genre selection in form
app.selectionListener = function() {
    $genreSelect.on('change', function () {
        $games.empty();
        app.pageNum = 1
        // If statement to determine if option selected is 'allGames' or anything else, update the API url on change and populate the grid with games
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
    // On click, take the 'value' of the <li> and add it to the API call to get data on the specific game
    $ul.on('click', 'li', function(){
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
                // Grab the platforms from the object and push to a new array
                const gamePlatforms = data.parent_platforms.map((i)=> i.platform.slug);
                // If statement to check for specific platform name from  the gamePlatforms array and push an array of list items with the corresponding icon, then join them into a string
                const iconPlatforms = $.map(gamePlatforms,(i)=>{
                    if (i === 'mac') {
                        return '<li><i class="fab fa-apple" aria-hidden="true" title="Available for Mac"></i><span class="srOnly">Available for Mac</span></li>'
                    } else if (i === 'pc') {
                        return '<li><i class="fas fa-laptop" aria-hidden="true" title="Available for PC"></i><span class="srOnly">Available for PC</span></li>'
                    } else if (i === 'android') {
                        return '<li><i class="fab fa-android" aria-hidden="true" title="Available for Android"></i><span class="srOnly">Available for Android</span></li>'
                    } else if (i === 'playstation') {
                        return '<li><i class="fab fa-playstation" aria-hidden="true" title="Available for Playstation"></i><span class="srOnly">Available for Playstation</span></li>'
                    } else if (i === 'xbox'){
                        return '<li><i class="fab fa-xbox" aria-hidden="true" title="Available for Xbox"></i><span class="srOnly">Available for Xbox</span></li>'
                    } else if (i === 'linux') {
                        return '<li><i class="fab fa-linux" aria-hidden="true" title="Available for Linux"></i><span class="srOnly">Available for Linux</span></li>'
                    } else if (i === 'nintendo') {
                        return '<li><i class="fas fa-gamepad" aria-hidden="true" title="Available for Nintendo Switch"></i><span class="srOnly">Available for Nintendo Switch</span></li>'
                    } else if (i === 'ios') {
                        return '<li><i class="fab fa-app-store-ios" aria-hidden="true" title="Available for iPhone"></i><span class="srOnly">Available for iPhone</span></li>'
                    }
                }).join("");

                // Iterate over the 'genres' property, push them to an array and join them into a string with a comma between
                const gameGenres = data.genres.map((i) => i.name).join(", ");

                // Change the elements within the '.popupBox' with the information for the game card that was clicked
                $popupBox.html(
                    `<div class="popupHeader" style="background-image:url(${data.background_image}">
                        <button class="closePopup" tabindex="0">
                            <label class="srOnly">Close the popup</label>
                            Close
                        </button>
                        <h2>${data.name}</h2>
                        <ul>${iconPlatforms}</ul>
                    </div>
                    <div class="popupMeta">
                        <time datetime="${data.released}">Release Date: ${data.released}</time>
                        <p>Genre(s): ${gameGenres}</p>
                    </div>
                    <div class="popupDescription">
                        ${data.description}
                    </div>
                    `
                ).fadeIn(300);
                // Fade in the opaque background to make the popup box stand out more
                $fullScreenBackground.fadeIn(300);
            
            }
    });
}

//Event listener to add next page of current specified filter of games
app.getMoreListener = function() {
    $games.on('click', '.getMore', function () {
        $(this).remove();
        app.pageNum ++;
        app.apiGeneral(app.url);
    })
}

// Event listener for closing the popup window
app.closePopupBox = function() {
    $dialog.on('click', '.closePopup', function() {
        $popupBox.fadeOut(400);
        $fullScreenBackground.fadeOut(300);   
    })

    $fullScreenBackground.on('click', function(){
        $popupBox.fadeOut(400);
        $fullScreenBackground.fadeOut(300); 
    })
}

// Event listener for pressing "enter" on game cards
app.enterListenerGameCard = () => {
    $games.on('keyup', 'li', function(e){
        if (e.which === 13) {
            $(this).click();
        }
    })
}

// Event listener for pressing "enter" on the ".getMore" card
app.enterGetMoreCard = () => {
    $games.on('keyup', '.getMore', function (e) {
        if (e.which === 13) {
            $(this).click();
        }
    })
}

app.scrollUpEnter = function () {
    if ($games.scrollTop = 0){
        $scrollUp.fadeIn(200);
    } 
}

// Init
app.init = function() {
    app.selectionListener();
    app.gameDetailListener();
    app.getMoreListener();
    app.apiGeneral(app.urlGen);
    app.closePopupBox();
    $fullScreenBackground.hide();
    $article.hide();
    $scrollUp.hide();
    $dialog.hide();
    app.enterListenerGameCard();
    app.enterGetMoreCard();
}

// Document ready
$(function(){
    app.init();
})