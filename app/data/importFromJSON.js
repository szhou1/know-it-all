// Purpose: imports the key value pairs from JSON to DB
// To use: copy keyvaluepairs.json to window.temp1, run as snippet

var req = window.indexedDB.open("know-it-all");
req.onsuccess = function() {
  db = req.result;
  var transaction = db.transaction("keyvaluepairs", "readwrite");
  var objectStore = transaction.objectStore("keyvaluepairs");
  Object.entries(window.temp1).forEach(([key, value]) => {
    console.log(value, key);
    var request = objectStore.add(value, key);
    request.onsuccess = function(event) {
      console.log("added: ", event.target);
    };
    request.onerror = function(err) {
      console.error(err);
    };
  });
};
