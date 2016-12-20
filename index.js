var q = require('q');
var request = require('request');
var colors = require('colors');
var fs = require('fs');
var select = require('soupselect').select;
var htmlparser = require("htmlparser");
var util = require('util');

function Main()
{
  return {
    init: _init
  };



  function _init()
  {
      console.log("NODE App Loading....".red);
      return mainTask();
  }

  function mainTask()
  {
      var mainPromise = q.defer();

      var REST_URL = "https://parivahan.gov.in/rcdlstatus/vahan/rcstatus.xhtml";
      // https://parivahan.gov.in/rcdlstatus/vahan/rcDlHome.xhtml;jsessionid=E7EC4F7CA0705FDDE355DF1AECE9F0F3
      var BASE_URL = "https://parivahan.gov.in/rcdlstatus/vahan/rcDlHome.xhtml;";
      var vInfo = {
        first: 'GJ23BA',
        second: '6510'
      };
      //1. Get Cookies from Requested URL
      function getCookies()
      {
          var retPromise = q.defer();

          var options = {
              url: REST_URL,
              method: "GET",
          };
          request(options, function(error, response, body) {
            //   console.log("Response: ", response);

            console.log("Cookies: ".green,response.headers['set-cookie']);
            var cookies = (response.headers['set-cookie']).toString();
            var jsessionid = cookies.split(';');
            jsessionid = jsessionid[0];
            console.log("My Cookie:",jsessionid);

            var options = {
                url: BASE_URL+ jsessionid,
                method: "POST"
            };
            request(options, function(error, response, body) {
                retPromise.resolve(body);
            });
            // console.log("Response Body: ".yellow,body);
          });

          return retPromise.promise;
      }

      function parseHTMLFirst(html)
      {
          console.log("parseHTMLFirst".red);
          var retPromise = q.defer();
          var handler = new htmlparser.DefaultHandler(function(err, dom) {
              if(err)
              {
                  console.log("Error: ",err);
              }
              else {
                  var ViewState = select(dom, 'input #j_id1:javax.faces.ViewState:0');
                //   console.log("ViewState: ".magenta,ViewState);
                  retPromise.resolve(ViewState[0].attribs.value);
              }


          });

          var parser = new htmlparser.Parser(handler);
          parser.parseComplete(html);
          return retPromise.promise;
      }


      getCookies()
        .then(function(resp) {
            // console.log("HTML BODY: ".yellow,resp);
            return parseHTMLFirst(resp);
        })
        .then(function(resp) {
            console.log("ViewState: ".blue,resp);
            mainPromise.resolve(true);
        })
        .catch(function(err) {
            console.log("Error: ".red,err);
            mainPromise.reject(err);
        });
      return mainPromise.promise;
  }






  //
  // function _getMethod()
  // {
  //   var returnPromise = q.defer();
  //   var options = {
  //     url: "http://ip.jsontest.com/",
  //     method: "GET",
  //   };
  //   console.log("Initializing Node App....".rainbow);
  //   console.log("Please wait.........".green);
  //   console.log("Please wait.........".green);
  //   console.log("Hello World!");
  //   request(options, function(error, response, body) {
  //       console.log("Body: ", body);
  //       returnPromise.resolve(true);
  //   });
  //
  //   return returnPromise.promise;
  // }
}

var main = Main();
main.init();
