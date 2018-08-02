var express = require('express')
var app = express()
app.use('/',express.static('./site'))
app.listen(8000, function(){
  console.log('Snowem-docs app listening on port 8000!')
});
