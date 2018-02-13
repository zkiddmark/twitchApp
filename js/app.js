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

}

var apiCall = {
    baseUrl: "https://wind-bow.gomix.me/twitch-api/",

    ajaxCall: function(string) {
        $.getJSON(`${this.string}`)
        .done(function(data){
            console.log(data);
        })
    },
};

var TwitchUser = function() {

}

var TwitchChannel = function() {

}

var TwitchStream = function() {

}