var api = require('../api/api'),
    path = require('path');

module.exports  = function(app) {
    
    app.post('/collisions', api.addCollision);
    app.get('/collisions', [api.prepareListCollisions,api.getNetwork]);
    app.delete('/collisions', api.deleteCollisions);
    // habilitando HTML5MODE
    app.all('/*', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });
};