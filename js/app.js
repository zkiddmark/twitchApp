var initialData = ["ESL_SC2", 
"OgamingSC2", 
"cretetion", 
"freecodecamp", 
"storbeck", 
"habathcx", 
"RobotCaleb", 
"noobs2ninjas"];

var Twat = function(data){
    this.user = ko.observable(data.display_name);
    this.game = ko.observable(data.game);
    this.status = ko.observable(data.status);
    this.logo = ko.observable(data.logo);
    this.banner = ko.observable(data.profile_banner);
    this.url = ko.observable(data.url);
}

var model = {
    TwatArray: ko.observableArray(),

    baseUrl: "https://wind-bow.gomix.me/twitch-api/",
    apiCall: function(type, user) {
        $.getJSON(`${this.baseUrl}${type}/${user}?callback=?`,function(response){
            // model.CreateCollection(response);
            ViewModel.twatList.push(new Twat(response));
        });
    },

    GenerateData: function(type){
        for(let i = 0; i < initialData.length; i++){
            this.apiCall(type, initialData[i]);
        }
    },

    CreateCollection: function(response){
        this.TwatArray.push(new Twat(response));
    },

    GetTwats: function(){
        return this.TwatArray();
    },

    init: function(){
        this.GenerateData("channels");
        // console.log(this.TwatArray())
    },
    
}



////////////////////////
//All-Cards component
///////////////////////
ko.components.register('all-cards', {
    template: '<div class="all-cards" data-bind="foreach: cards">\
        <twitch-card params="{text: $data}"></twitch-card>\
     </div>',

    viewModel: function(params){
        var self = this;

        self.message = ko.observable("Hello from All cards!!");

        self.cards = ko.observableArray();

        self.initData = ko.observableArray(initialData);
        self.initData().forEach(element => {
            self.cards().push(element);
        });
        console.log(self.cards())

    }

});



///////////////////////
//Twitch card component
//////////////////////
ko.components.register('twitch-card', {
    template: '<div>\
    <div class="card" data-bind="with: card">\
        <div class="banner">\
        <img data-bind="attr: {src: banner}"/>\
        </div>\
            <img class="logo" data-bind="attr: {src: logo}" src="" alt="Logo" />\
            <ul>\
                <li data-bind="text: user"></li>\
                <li data-bind="text: game"></li>\
                <li data-bind="text: status"></li>\
            </ul>\
    </div>',
    viewModel: function(params){
        var self = this;
        
        self.baseUrl = "https://wind-bow.gomix.me/twitch-api/";
        var ctx = params.text;
        self.createCard = function(){
            self.apiCall("channels", ctx);
        };
        self.apiCall = function(type, user) {
            $.getJSON(`${self.baseUrl}${type}/${user}?callback=?`,function(response){
                self.card(new Twat(response));
            });
        };

        self.card = ko.observable();

        self.createCard()
       
    }
});
ko.applyBindings();