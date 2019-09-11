function startButton(){
    $('.start').on('click', event=>{
        event.preventDefault();
        showMainUi();
    })
}

function showMainUi(){
    $('.welcomeScreen').remove();
    $('.displayMainUi').append(`<Header class="mainUiHeader">
                                    <h1 class="mainUiTitle">Please Enter User Data</h1>
                                </Header>

                                    <div class="foodSearch">
                                        <img class="foodImg" src="https://www.graphicsprings.com/filestorage/stencils/a72ca2a6d939600e94d114713eb276f1.png?width=500&height=500">
                                        <input class="foodSearchInput" type="text" value="Food Item To Search"/>
                                    </div>

                                    <div class="ratio">
                                        <img class="ratioImg" src="https://images.ctfassets.net/yixw23k2v6vo/62cF6PI0rSwc46UIUqisEW/88f4abbb4952387b151855e54e335dbb/iS-Your_Insulin-to-Carbohydrate_Ratio__What_s_Yours_-iStock-522854112.jpg?w=600&h=400&fm=jpg&fit=thumb&q=65&fl=progressive">
                                        <input class="ratioInput" type="text" value='"X" divided by carbohydrates'/>
                                    </div>

                                    <div class="bloodSugar">
                                        <img class="bloodSugarImg" src="https://cdn.dribbble.com/users/1131932/screenshots/2695717/diabetes-dribbble.png">
                                        <input class="bloodSugarInput" type="text" value="Current Blood Sugar"/>
                                        <div class="mainUiButtonContainer">
                                            <button class="mainUiButton" type="text" value="ConfirmUserInput">Confirm User Input</button>
                                        </div>
                                    </div>`);
}

$(startButton);