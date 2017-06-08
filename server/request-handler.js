/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var mockData = {
  results: [{text: 'hi', username: 'marcus'}]
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {

  var responseHeaders = defaultCorsHeaders;
  var headers = request.headers;
  var method = request.method;
  var url = request.url;

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
 
  if ( (method === 'GET' || method === 'OPTIONS') && url === '/classes/messages') {

    responseHeaders['Content-Type'] = 'application/json';
    response.writeHead(200, responseHeaders);

    var message = JSON.stringify(mockData);
    response.end(message);

  } else if (method === 'POST') {
    response.writeHead(201, responseHeaders);

    var message = '';
    request.on('data', function(chunk) {
      console.log('BODY: ' + chunk);
      message += chunk;
    });

    request.on('end', function() {
      
      console.log(message.split('&'));
      mockData.results.push(JSON.parse(message));
      response.end('Reached POST route');
 
    });
    
  } else {

    responseHeaders['Content-Type'] = 'text/plain';
    response.writeHead(404, responseHeaders);
    response.end('404');
  
  }
};


exports.requestHandler = requestHandler;

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  // The outgoing status.
  // var statusCode = 200;     <-- need these later

  // See the note below about CORS headers.
  // var responseHeaders = defaultCorsHeaders;     <-- need these later

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // responseHeaders['Content-Type'] = 'text/plain';     <-- need these later

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCode, responseHeaders);     <-- need these later

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end('Hello, World! ' + request.url);

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
