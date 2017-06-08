var fs = require('fs');

database = {

  storage: { results: [] },

  readDB: function() {
    fs.readFile('./server/database.txt', function(err, data) {
      if (err) {
        console.log(err);
      } 

      console.log('reading data');
  
      var string = String.fromCharCode.apply(null, data);
      string.slice(0, string.length - 2).split(', ').map(item => {
        database.storage.results.push(JSON.parse(item));
      });


  // dataArrayPreparsed = something.slice(0, something.length - 2);
  // dataParsed = testThing.split(', ').map(function(item) {
  //   mockData.results.push(JSON.parse(item));
  // });

      // console.log(dataParsed, typeof dataParsed);

    });
  }
};

exports.database = database;

