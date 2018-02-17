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


// var ViewModel = function() {
//     var self = this;
    
//     self.baseUrl = "https://wind-bow.gomix.me/twitch-api/";
   

//     self.apiCall = function(type, user) {
//         $.getJSON(`${self.baseUrl}${type}/${user}?callback=?`,function(response){
//             // model.CreateCollection(response);
//             self.twatList.push(new Twat(response));
//         });
//     };

//     initialData.forEach(function(user){
//         self.apiCall("channels", user);
//     });

//     self.twatList = ko.observableArray();
//     // self.twatList(model.GetTwats());

//     self.refresh = function(){
//         // self.twatList().forEach(element => {
//         //     self.twats.push(element);
//         // });
//         // console.log(self.twatList()[0].game());
//         console.log(self.twatList().length)
//     }
    
//     console.log(self.twatList());
// }

// model.init();
// ko.applyBindings(new ViewModel());

////////////////////////
//All-Cards component
///////////////////////
ko.components.register('all-cards', {
    template: '<div class="all-cards" data-bind="foreach: cards"><twitch-card params="cards()[0]"></twitch-card> </div>',

    viewModel: function(){
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
    template: '<div>'
    +'<div class="card">'
            +'<ul>'
                +'<li data-bind="text: card.user"></li>'
                +'<li data-bind="text: card.game"></li>'
                +'<li data-bind="text: card.status"></li>'
            +'</ul>'
        +'</div>'
    +'</div>',
    viewModel: function(){
        var self = this;
        
        self.baseUrl = "https://wind-bow.gomix.me/twitch-api/";
        self.usr = ko.observable();
        self.createCard = function(){
            self.apiCall("channels", usr);
        }
        self.apiCall = function(type, user) {
            $.getJSON(`${self.baseUrl}${type}/${user}?callback=?`,function(response){
                // model.CreateCollection(response);
                // self.twatList.push(new Twat(response));
                self.card() = new Twat(response);
            });
        };

        self.card = ko.observable();
    
        // initialData.forEach(function(user){
        //     self.apiCall("channels", user);
        // });
    
        // self.twatList = ko.observableArray();
        // // self.twatList(model.GetTwats());
    
        // self.refresh = function(){
        //     // self.twatList().forEach(element => {
        //     //     self.twats.push(element);
        //     // });
        //     // console.log(self.twatList()[0].game());
        //     console.log(self.twatList().length)
        // }
        
        console.log(self.usr())
    }
});
ko.applyBindings();