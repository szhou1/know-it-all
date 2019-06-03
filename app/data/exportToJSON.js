// Purpose: exports the key value pairs of the DB to JSON, then sets it as a global var
// To use: run as snippet, then `copy(window.knowitalldb)`, then paste into keyvaluepairs.json, then commit to repo

var req = window.indexedDB.open("know-it-all");
req.onsuccess = function() {
  db = req.result;
  var transaction = db.transaction("keyvaluepairs", "readonly");
  var objectStore = transaction.objectStore("keyvaluepairs");
  var allObjects = {};
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      allObjects[cursor.key] = cursor.value;
      cursor.continue();
    } else {
      console.log(allObjects);
      window.knowitalldb = allObjects;
    }
  };
};
