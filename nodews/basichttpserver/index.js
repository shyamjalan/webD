const http = require("http");
const port = 8000;
const fs = require("fs"); //Used for reading/writing files

function requestHandler(request, response) {
  console.log(request.url);
  response.writeHead(200, { "content-type": "text/html" });
  let filePath;

  switch (request.url) {
    case "/":
      filePath = "./index.html";
      break;
    case "/profile":
      filePath = "./profile.html";
      break;
    default:
      filePath = "./404.html";
  }
  fs.readFile(filePath, function(err, data) {
    if (err) {
      console.log("error: ", err);
      return response.end("<h1>Error!</h1>");
    }
    return response.end(data);
  });
}

const server = http.createServer(requestHandler);

server.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is up and running on port : ", port);
});
