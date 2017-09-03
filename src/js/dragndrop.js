/**
 * Checking if file upload is supported.
 */
var isAdvancedUpload = function () {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

var fileApiSupoorted = window.File && window.FileReader && window.FileList && window.Blob; // Check for the various File API support.
if (fileApiSupoorted) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        space_geoJSON = JSON.parse(e.target.result);
        renderMap();
    };

    // Read in the image file as a data URL.
    reader.readAsText(f);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);