//-----------------------------------Global Variables-----------------------------------------

let food= 'q=' + $('.foodSearchInput').val();
let ratio= $('.ratioInput').val();
let bloodSugar= $('.bloodSugarInput').val();
//--------------------------------------------------------------------------------------------
// ----------------------------------Button Functions-----------------------------------------
function initialize(){
    handleConfirmButtonClick()
    handleStartButtonClick()
    handleResultsButtonClick()
    hanldeReDoSearchButtonClick()
}

function handleStartButtonClick(){
    $('.start').on('click', event=>{
        event.preventDefault();
        showMainUi();
    })
}

function handleConfirmButtonClick(){
    $('body').submit('.mainUiButton',  event=>{
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

function hanldeReDoSearchButtonClick(){
    $('body').on('click','.reDoSearchButton', event=>{
        showMainUi();
    })
}
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------Main UI Screen------------------------------------------------------------------------------------------------------------
function showMainUi(){
    $('.welcomeScreen').remove();
    if (ratio === undefined){
        $('body').html(           `<div class="mainUiContainer">
                                    <Header class="mainUiHeader">
                                        <h1 class="mainUiTitle">Please Enter User Data</h1>
                                    </Header>
                                    <form class="foodForm"> 
                                        <div class="foodSearch">
                                            <img class="foodImg" src="https://www.graphicsprings.com/filestorage/stencils/a72ca2a6d939600e94d114713eb276f1.png?width=100&height=100" alt="Picture of a prepared meal">
                                            <label class="inputLabels" for="searchFood">Type in specific food (UPC Number is best)</label>
                                            <input class="foodSearchInput" type="text" id="searchFood" placeholder="Food Item To Search" required>
                                        </div>
                                        <div class="ratio">
                                            <img class="ratioImg" src="https://images.ctfassets.net/yixw23k2v6vo/62cF6PI0rSwc46UIUqisEW/88f4abbb4952387b151855e54e335dbb/iS-Your_Insulin-to-Carbohydrate_Ratio__What_s_Yours_-iStock-522854112.jpg?w=600&h=400&fm=jpg&fit=thumb&q=65&fl=progressive" alt="Insulin pen and Calculator">
                                            <label class="inputLabels" for="carbRatio">Enter "X" value for insulin ratio ("X"/Total Carbs)</label>
                                            <input class="ratioInput" type="float" id="carbRatio" placeholder='"X" divided by carbohydrates' required>
                                        </div>
                                        <div class="bloodSugar">
                                            <img class="bloodSugarImg" src="https://cdn.dribbble.com/users/1131932/screenshots/2695717/diabetes-dribbble.png" alt="Blood drop logo">
                                            <label class="inputLabels" for="currentBS">Enter you current Blood Sugar</label>
                                            <input class="bloodSugarInput" type="float" id="currentBS" placeholder="Current Blood Sugar">
                                            <div class="mainUiButtonContainer">
                                            <button class="mainUiButton" type="submit" value="ConfirmUserInput">Confirm User Input</button>
                                    </form>
                                        </div>
                                </div>`);
    }
    else{
        $('body').html(           `<div class="mainUiContainer">
                                    <Header class="mainUiHeader">
                                        <h1 class="mainUiTitle">Please Enter User Data</h1>
                                    </Header>
                                    <form class="foodForm"> 
                                        <div class="foodSearch">
                                            <img class="foodImg" src="https://www.graphicsprings.com/filestorage/stencils/a72ca2a6d939600e94d114713eb276f1.png?width=100&height=100" alt="Picture of a prepared meal">
                                            <label class="inputLabels" for="searchFood">Type in specific food (UPC Number is best)</label>
                                            <input class="foodSearchInput" type="text" id="searchFood" placeholder="Food Item To Search" required>
                                        </div>
                                        <div class="ratio">
                                            <img class="ratioImg" src="https://images.ctfassets.net/yixw23k2v6vo/62cF6PI0rSwc46UIUqisEW/88f4abbb4952387b151855e54e335dbb/iS-Your_Insulin-to-Carbohydrate_Ratio__What_s_Yours_-iStock-522854112.jpg?w=600&h=400&fm=jpg&fit=thumb&q=65&fl=progressive" alt="Insulin pen and Calculator">
                                            <label class="inputLabels" for="carbRatio">Enter "X" value for insulin ratio ("X"/Total Carbs)</label>
                                            <input class="ratioInput" type="float" id="carbRatio" placeholder='"X" divided by carbohydrates' value=${ratio} required>
                                        </div>
                                        <div class="bloodSugar">
                                            <img class="bloodSugarImg" src="https://cdn.dribbble.com/users/1131932/screenshots/2695717/diabetes-dribbble.png" alt="Blood drop logo">
                                            <label class="inputLabels" for="currentBS">Enter you current Blood Sugar</label>
                                            <input class="bloodSugarInput" type="float" id="currentBS" placeholder="Current Blood Sugar" value=${bloodSugar}>
                                        <div class="mainUiButtonContainer">
                                        <button class="mainUiButton" type="submit" value="ConfirmUserInput">Confirm User Input</button>
                                    </form>
                                        </div>
                                    </div>`);
    }
    
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
        $('.searchResults').append(`<div class="usdaApi">
                                        <li class ="category"><span class="usdaApiLabel">Category: </span>${array[i].group}</li><br>
                                        <li class ="foodName"><span class="usdaApiLabel">Name: </span>${array[i].name}</li>
                                        <button class="resultsButton" value=${array[i].ndbno}>Select</button>
                                    </div>`);
                                        }               
}



function displayResults(responseJson){
    $('.mainUiContainer').remove();
    $('body').append(`  <div class="searchResultsScreenContainer">
                            <h1 class="searchResultsTitle">Search Results Brought Back the Following</h1>
                                <p class="searchResultsbody">Select the correct product</p>
                                    <ul class="searchResults">
                                    </ul>
                        </div>
                        <div class="displayInfoScreen"></div>`);
                        getResults(responseJson);
                        // $(resultsButtonListen);
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------Nutrition/Recipe Screen------------------------------------------------------------------------------*/

function displayFinalScreen(newResponseJson, bloodSugar){
    console.log(newResponseJson);
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
            .then(recipeResponse => $('.recipeUl').append(`<li class="recipeTitle">${recipeResponse.title}</li>
                                                           <li class="recipeImgLi"><img class="recipeImg" src="${recipeResponse.image}" alt="Food Image"></li>
                                                           <li class="recipeAltName">${recipeResponse.sourceName}</li>
                                                           <li class="recipeLinkLi"><a class="recipeLink" href="${recipeResponse.sourceUrl}" target="_blank">Click here for recipe!</a></li><br>`));
        }
    }
    /*-----calculates blood sugar based on user input-----*/
    let recommendedBS = "";
    try{
        let carbValue = newResponseJson.report.foods[0].nutrients[3].value;
    }
    catch(err){
        alert(`Something went wrong: ${err.message}.  Please try another search.`);
        showMainUi();
    }
    let carbValue = newResponseJson.report.foods[0].nutrients[3].value;
    
        if (bloodSugar > 400){
            recommendedBS = "We recommend you take measures to bring your blood sugar down before eating and/or seek professional medical advice"
        }      
        else if (bloodSugar >= 350){
            recommendedBS = ((carbValue/ratio) + 5).toFixed(2) + " units";
        }
        else if (bloodSugar >= 300){
            recommendedBS = ((carbValue/ratio) + 4).toFixed(2) + " units";
        }
        else if (bloodSugar >= 250){
            recommendedBS = ((carbValue/ratio) + 3).toFixed(2) + " units";
        }
        else if (bloodSugar >= 200){
            recommendedBS = ((carbValue/ratio) + 2).toFixed(2) + " units";
        }
        else if (bloodSugar > 150) {
            recommendedBS = ((carbValue/ratio) + 1).toFixed(2) + " units";
        }
        else
        {
            recommendedBS = (carbValue/ratio).toFixed(2) + " units";   
        }
    /*-------------------------------------*/
    /*-------- Displays Page ---------------*/
    $('body').append(`<h1 class="nutritionTitle">Information for: ${newResponseJson.report.foods[0].name}</h1>
        <form class"finalResultsForm">
            <ul class="nutritionUl">
                <li class="nutritionLi"><label class="measurement" for="finalResultsForm">Measurement: </label>${newResponseJson.report.foods[0].measure}</li><br>
                <li class="nutritionLi"><label class="carbs" for="finalResultsForm">Carbs: </label>${carbValue}${newResponseJson.report.foods[0].nutrients[3].unit}</li><br>
                <li class="nutritionLi"><label class="sugars" for="finalResultsForm">Sugars: </label>${newResponseJson.report.foods[0].nutrients[1].value}${newResponseJson.report.foods[0].nutrients[1].unit}</li><br>
            </ul>
            <div class-"BSContainer"
                <label class="recBS">Recommended Insulin Dose: <span class="providedBS">${recommendedBS}</span></label>
                <hr>
            </div>
            <div class = "recipes">
                <h2 class ="recipeIdeasTitle">Recipe Ideas</h2>
                <ul class=recipeUl>
                </ul>
                <div class="reDoSearchButtonContain"><button class="reDoSearchButton">Continue Searching</button></div>
            </div>
        </form>`)
        findRecipeID(food);
}


$(initialize);