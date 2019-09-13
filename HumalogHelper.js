let food= 'q=' + $('.foodSearchInput').val();
let ratio= $('.ratioInput').val();
let bloodSugar=  $('.bloodSugarInput').val();






// --------------------------------------------------------------------------------Button Functions-----------------------------------------------------------------------------------------------------------
function initialize(){
    handleConfirmButtonClick()
    handleStartButtonClick()
    handleResultsButtonClick()
}

function handleStartButtonClick(){
    $('.start').on('click', event=>{
        event.preventDefault();
        showMainUi();
    })
}

function handleConfirmButtonClick(){
    $('body').on('click', '.mainUiButton',  event=>{
        event.preventDefault();
        food = 'q=' + $('.foodSearchInput').val();
        ratio = $('.ratioInput').val();
        bloodSugar = $('.bloodSugarInput').val();
        getUSDA(food);
    })
}

function handleResultsButtonClick(){
    $('body').on('click','.resultsButton', event=>{
        let buttonValue = 'ndbno='+$('.resultsButton').val();
        fetch(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=fHFBcIG1vOtd2UOXVcphXxiQuqNRlpeTl9s8YZ82&nutrients=205&nutrients=204&nutrients=208&nutrients=269&${buttonValue}`)
        .then(response=>response.json())
        .then(newResponseJson =>  displayFinalScreen(newResponseJson,bloodSugar));
        
        
    })
    
}
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------Main UI Screen------------------------------------------------------------------------------------------------------------
function showMainUi(){
    $('.welcomeScreen').remove();
    $('body').append(           `<div class="mainUiContainer">
                                    <Header class="mainUiHeader">
                                        <h1 class="mainUiTitle">Please Enter User Data</h1>
                                    </Header>
                                        <div class="foodSearch">
                                            <img class="foodImg" src="https://www.graphicsprings.com/filestorage/stencils/a72ca2a6d939600e94d114713eb276f1.png?width=100&height=100">
                                            <input class="foodSearchInput" type="text" placeholder="Food Item To Search"/>
                                        </div>
                                        <div class="ratio">
                                            <img class="ratioImg" src="https://images.ctfassets.net/yixw23k2v6vo/62cF6PI0rSwc46UIUqisEW/88f4abbb4952387b151855e54e335dbb/iS-Your_Insulin-to-Carbohydrate_Ratio__What_s_Yours_-iStock-522854112.jpg?w=600&h=400&fm=jpg&fit=thumb&q=65&fl=progressive">
                                            <input class="ratioInput" type="text" placeholder='"X" divided by carbohydrates'/>
                                        </div>
                                        <div class="bloodSugar">
                                            <img class="bloodSugarImg" src="https://cdn.dribbble.com/users/1131932/screenshots/2695717/diabetes-dribbble.png">
                                            <input class="bloodSugarInput" type="text" placeholder="Current Blood Sugar"/>
                                            <div class="mainUiButtonContainer">
                                            <button class="mainUiButton" type="text" value="ConfirmUserInput">Confirm User Input</button>
                                        </div>
                                </div>`);
                                    // $(confirmButton);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------Results Screen--------------------------------------------------------------------------------------------------------------------------

function getUSDA(food){
    fetch(`https://api.nal.usda.gov/ndb/search/?format=json&${food}&sort=n&max=10&offset=0&api_key=fHFBcIG1vOtd2UOXVcphXxiQuqNRlpeTl9s8YZ82`)
    .then(response=>response.json())
    .then(responseJson => displayResults(responseJson));
}


function getResults(responseJson,food){
    console.log(responseJson.list.item);
    let array = responseJson.list.item
    for (let i =0; i < array.length; i++){
        $('.searchResults').append(`<li class ="category">Category: ${array[i].group}</li>
                                    <li class ="foodName">Name: ${array[i].name}</li>
                                    <button class="resultsButton" value=${array[i].ndbno}>Select</button>`);
    }
}



function displayResults(responseJson){
    $('.mainUiContainer').remove();
    $('body').append(`<div class="searchResultsScreenContainer">
                        <h1 class="searchResultsTitle">Search Results Brought Back the Following</h1>
                            <ul class="searchResults">
                            </ul>
                            <p class="searchResultsbody">Select the correct product</p>
                        </div>
                        <div class="displayInfoScreen"></div>`);
                        getResults(responseJson);
                        // $(resultsButtonListen);
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------Recipe Screen------------------------------------------------------------------------------*/




function displayFinalScreen(newResponseJson, bloodSugar){
    $('.searchResultsScreenContainer').remove();

    function findRecipeID(food){
        fetch(`https://api.spoonacular.com/recipes/search?apiKey=d431b93b578b4d789e3ce0d484fdfc3c&query=${food}&number=3`)
        .then(response => response.json())
        .then(recipeIDResponse => getRecipeInfromation(recipeIDResponse));
    }
    // findRecipeID(food);
    
    function getRecipeInfromation(recipeIDResponse){
        let recipeArray = recipeIDResponse.results
        for(let i =0; i < recipeArray.length; i++){
            let recipeID = recipeArray[i].id
            fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=d431b93b578b4d789e3ce0d484fdfc3c&includeNutrition=false`)
            .then(response => response.json())
            .then(recipeResponse => $('.recipeUl').append(`<li>${recipeResponse.title}</li>
                                                           <li><img src="${recipeResponse.image}" alt="Food Image"></li>
                                                           <li>${recipeResponse.sourceName}</li>
                                                           <li><a href="${recipeResponse.sourceUrl}">Click here for recipe!</a></li><br>`));
        }
    }
    /*-----calculates blood sugar based on user input-----*/
    let recommendedBS = null;
    let carbValue = newResponseJson.report.foods[0].nutrients[3].value
    let insulinCalc = 0;
        if (bloodSugar > 400){
            recommendedBS = "We recommend you take measures to bring your blood sugar down before eating and/or seek professional medical advice"
        }      
        else if (bloodSugar >= 350){
            recommendedBS = (carbValue/ratio) + 5 + " units";
        }
        else if (bloodSugar >= 300){
            recommendedBS = (carbValue/ratio) + 4 + " units";
        }
        else if (bloodSugar >= 250){
            recommendedBS = (carbValue/ratio) + 3 + " units";
        }
        else if (bloodSugar >= 200){
            recommendedBS = (carbValue/ratio) + 2 + " units";
        }
        else if (bloodSugar > 150) {
            recommendedBS = (carbValue/ratio) + 1 + " units";
        }
        else
        {
            recommendedBS = (carbValue/ratio) + " units";   
        }
    /*-------------------------------------*/
    /*-------- Displays Page ---------------*/
    $('body').append(`<h1>Information for ${newResponseJson.report.foods[0].name}</h1>
        <form class"finalResultsForm">
            <ul>
                <li><label class="measurement" for="finalResultsForm">Measurement:</label>${newResponseJson.report.foods[0].measure}</li>
                <li><label class="carbs" for="finalResultsForm">Carbs:</label>${carbValue}${newResponseJson.report.foods[0].nutrients[3].unit}</li>
                <li><label class="sugars" for="finalResultsForm">Sugars:</label>${newResponseJson.report.foods[0].nutrients[1].value}${newResponseJson.report.foods[0].nutrients[1].unit}</li>
            </ul>
                <label class="recBS">Recommended Insulin Dose: <span class="providedBS">${recommendedBS}</span></label>
            <div class = "recipes">
                <h2>Recipe Ideas</h2>
                <ul class=recipeUl>
                </ul>
            </div>
        </form>`)
        findRecipeID(food);
}
$(initialize);