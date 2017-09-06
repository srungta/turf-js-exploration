var turf = require('turf');
var fs = require('fs');

var mapFile = fs.readFileSync('./src/assets/a.json', 'utf8');
mapFile = JSON.parse(mapFile);

//Create a union for all objects
var first = mapFile.features[0];
var merged = turf.union(first, first);
mapFile.features.forEach(function (element) {
    try {
        merged = turf.union(merged, element);
    } catch (error) {
        console.log("error at entity");
    }
}, this);
mapFile.features = [merged];


fs.writeFileSync('./src/assets/output.json', JSON.stringify(mapFile));

console.log('saved output.json');