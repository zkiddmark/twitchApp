var initialData = ["ESL_SC2", 
"OgamingSC2", 
"cretetion", 
"freecodecamp", 
"storbeck", 
"habathcx", 
"RobotCaleb", 
"noobs2ninjas"];


var Model = {

    addToUserList: function(){
        initialData.forEach(function(user){
            var userList =  ko.observableArray([]);
            return userList().push(user);
        })
    },

}

var ViewModel = function() {
    var self = this;
    var data = ko.observableArray([])
    
    Model.addToUserList().forEach(function(user){
        data().push(user);
    });


}

var apiCall = {
    baseUrl: "https://wind-bow.gomix.me/twitch-api/",

    //pass in user, channels or streams as "type" parameter and a valid user as "user" parameter. 
    //The functions then returns a json data object.
    ajaxCall: function(type, user) {
        $.getJSON(`${this.baseUrl}${type}/${user}?callback=?`)
        .done(function(data){
            return data
        });
    },
};

// var TwitchUser = function() {

// }

var TwitchChannel = {
    getChannel: function(user){
        return apiCall.ajaxCall("channel", user);
    },

}

// var TwitchStream = function() {

// }

ko.applyBindings(ViewModel);