var q = require('q');
var request = require('request');
var colors = require('colors');

function Main()
{
  return {
    init: _init
  };



  function _init()
  {
      console.log("NODE App Loading....".red);

  }

  function mainTask()
  {
      var mainPromise = q.defer();

      var vInfo = {
        first: 'GJ23BA'  ,
        second: '6510'
      };
      //1. Get Cookies from Requested URL
      function getCookies()
      {
          
      }





      return mainPromise.promise;
  }







  function _getMethod()
  {
    var returnPromise = q.defer();
    var options = {
      url: "http://ip.jsontest.com/",
      method: "GET",
    };
    console.log("Initializing Node App....".rainbow);
    console.log("Please wait.........".green);
    console.log("Please wait.........".green);
    console.log("Hello World!");
    request(options, function(error, response, body) {
        console.log("Body: ", body);
        returnPromise.resolve(true);
    });

    return returnPromise.promise;
  }
}

var main = Main();
main.getMethod();
