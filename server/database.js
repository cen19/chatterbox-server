var fs = require('fs');

database = {

  storage: { results: [] },

  readDB: function() {
    fs.readFile('./server/database.txt', function(err, data) {
      if (err) {
        console.log(err);
      } 

      console.log('Getting data from database...');
  
      var string = String.fromCharCode.apply(null, data);
      string.slice(0, string.length - 3).split('&*&').map(item => {
        database.storage.results.push(JSON.parse(item));
      });
    });
  }
};

exports.database = database;

