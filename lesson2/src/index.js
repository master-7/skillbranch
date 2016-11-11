import express from 'express';

var app = express();

//Task 1
var parseDigitParam = param => {
  let digit = parseInt(param);
  return digit ? digit : 0;
};

app.get('/', function (req, res) {
  const a = parseDigitParam(req.query.a);
  const b = parseDigitParam(req.query.b);
  let result = a + b;
  result = result || "0";
  res.status(200);
  res.send("Result: " + result);
});

//Task 2
var fullnameFormater = result => {
  var checkName = name => {
    return name[0] ? name[0] + "." : "";
  };
  switch (result.length) {
    case 1:
      return result[0];
      break;
    case 2:
      return `${result[result.length - 1]} ${checkName(result[0])}`;
      break;
    case 3:
      return `${result[result.length - 1]} ${checkName(result[0])} ${checkName(result[1])}`;
      break;
  }
};

app.get('/name', function (req, res) {
  const fullname = req.query.fullname;
  let result = fullname.split(" ");
  if (!result.length || result.length > 3) {
    res.status(400);
    res.send("Invalid fullname!");
  }
  else {
    res.status(200);
    res.send(fullnameFormater(result));
  }
});

//Task 3

app.get('/username', function (req, res) {
  const username = req.query.username;

  const regExp = /(https?:)?(\/\/)?(\w+\.\w+)?(\/)?([\w\.\-]+)/gi;

  res.status(200);
  res.send(`\@${regExp.exec(username)[5]}`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
