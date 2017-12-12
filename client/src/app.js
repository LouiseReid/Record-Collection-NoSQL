var RecordsView = require('./views/recordsView')

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200)return;
  var jsonString = this.responseText;
  var records = JSON.parse(jsonString);
  var ui = new RecordsView(records);
}

var app = function(){
  var url = '/records'
  makeRequest(url, requestComplete)
}



window.addEventListener('load', app);
