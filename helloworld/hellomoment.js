let http = require('http');
let moment = require('moment');

function serverCallback(req, res){
  let timeBegin = moment('09:00', 'HH:mm');
  let timeEnd = moment('17:00', 'HH:mm');

  let message = `Hello Zenva!
Welcome to our page.
Now it is ${moment().format('HH:mm:ss')}.
Our business hours is from ${timeBegin.format('HH:mm')} to ${timeEnd.format('HH:mm')}.
`
  let beginDifference = timeBegin.diff(moment(), 'minutes');
  let endDifference = moment().diff(timeEnd, 'minutes');

  if (beginDifference > 0) {
    message += `Please come back in ${beginDifference} minutes.`
  }
  if (endDifference > 0) {
    message += `Please come back tomorrow.`
  }
  res.writeHead(200, {'Content-Type': 'text/plain'});
  // res.end(`Hello ${process.argv[2]}`);
  res.end(message)
}

http.createServer(serverCallback).listen(4500);