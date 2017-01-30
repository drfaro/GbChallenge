var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')
var listCollections = [];

var api = {}

api.addCollision = function (req, res, next) {
  
  var postCollisions;

  postCollisions = req.body.toString()

  postCollisions = postCollisions.split(/[\n|\n\r]/);
  db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS collision (info TEXT)')
    var stmt = db.prepare('INSERT INTO collision VALUES (?)')
    postCollisions.forEach(function(collision,key){
      if (collision.length > 0){
        stmt.run(collision);
      }
    })
    stmt.finalize()
    res.send(true);
  })


};

api.prepareListCollisions = function (req, res, next) {
  db.serialize(function () {
  listCollections = [];
    db.each('SELECT rowId AS id, info FROM collision', function (err, row) {
      listCollections[row.id] = row.info
    },function(){
      next();
    })

  })
  //db.close()
};

api.getNetwork = function (req, res, next) {
    result = []
    listCollections.forEach(function(data,key){
      result.push({collision:data,network:settingCollision(data)});
    })


    function settingCollision(str){

      var arrayNetwork = [];
      var mapNetwork = new Map();
      var arrayGroup = str.replace(/\ /gi,"").replace(/\)/gi,"").split("(");

      arrayGroup.forEach(function(strCollection,key) {

          isAdded = [];
          if (strCollection !== "" && strCollection.length > 0){
            arrayCollection = []
            arrayCollection = strCollection.split(",");

              mapNetwork.forEach(function(val,key) {
                    if (val.indexOf(arrayCollection[0]) != -1 || val.indexOf(arrayCollection[1]) != -1){
                      isAdded.push(val);
                    }
                });
                
            if (arrayCollection[0].length > 0){                  
                  factoryNetwork = [];
                  mapNetwork.forEach(function (dataGroup,index, array) {
                    arrayCollectionNet = dataGroup.toString().split(",")
                    if (arrayCollectionNet.indexOf(arrayCollection[0]) !== -1 || arrayCollectionNet.indexOf(arrayCollection[1]) !== -1 ){
                        //arrayNetwork.splice(index, dataGroup.length);
                        arrayCollectionNet = arrayCollectionNet.concat(arrayCollection)
                        array.delete(index)
                        factoryNetwork.push(arrayCollectionNet);
                      
                    }
                  });

                  if (factoryNetwork.length == 0 && isAdded.length == 0){
                    factoryGroup = arrayGroup.filter(function (data,index, array) {
                      arrayCollectionNet = data.toString().split(",")
                      if (arrayCollectionNet.indexOf(arrayCollection[0]) !== -1 || arrayCollectionNet.indexOf(arrayCollection[1]) !== -1 ){
                        return data
                      }
                    });
                    factory = factoryGroup
                  }else{
                    factory = factoryNetwork
                  }

                  factory = factory.toString().split(",").filter(function(x, n, s) { return s.indexOf(x) == n })
                  arrayNetwork.push(factory);
                
                mapNetwork.set(key,factory)
                            }

          }
      });
      
      return  Array.from(mapNetwork.values());
  }

  res.send(result);
  //db.close()
};

api.deleteCollisions = function (req, res, next) {
  
  db.serialize(function () {
    
    db.run('DELETE FROM collision')
    
    res.send(true);
  })
};





module.exports = api;