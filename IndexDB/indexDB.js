function connectDB() {
    var dbName = "mydb1";
    var dbVersion = 8;
    var idb;
    var dbRequest = indexedDB.open(dbName, dbVersion);
    dbRequest.onsuccess = function (e) {
        idb = e.target.result;
        console.log("success");

    }
    dbRequest.onerror = function (e) {
        console.log("error");
    }
    dbRequest.onupgradeneeded = function (e) {
        var oldVer = e.oldVersion;
        var newVer = e.newVersion;
        console.log("new Version" + newVer + " old Version" + oldVer);
        idb = e.target.result;
        tx = e.target.transaction;
        var name = "student";
        var options = { keyPath: "StuId", autoIncrement: false };
        var store = idb.createObjectStore(name, options);
        console.log("Object Store created!");
        var store = tx.objectStore("student");
        var idx1 = store.createIndex("nameIndex", "name", { unique: true });
        var idx2 = store.createIndex("ageIndex", "age", { unique: false });
        var idx3 = store.createIndex("addressIndex", "address", { unique: false });

    }
}
function inputData() {
    var ss = [{ StuId: 1, name: "rose", age: 19, address: "Beijing" },
              { StuId: 2, name: "kellen", age: 20, address: "ShangHai"},
              { StuId: 3, name: "Tom", age: 21, address: "Guangdong" },
              { StuId: 4, name: "Mike", age: 22, address: "ShenZhen" }];
    var myDB = { dbName: "mydb1", dbVersion: 9 };
    var idb;
    var dbRequest = indexedDB.open(myDB.dbName, myDB.dbVersion);
    dbRequest.onsuccess = function (e) {
        idb = e.target.result;
        var tx = idb.transaction(["student"], "readwrite");
        var store = tx.objectStore("student");
        for (var i = 0; i < ss.length; i++) {
            var reg = store.put(ss[i]);
        }
        reg.onsuccess = function () {
            console.log("data input success");
        }
        reg.onerror = function () {
            console.log("data input error");
        }
            console.log("connect success");
        
    }
    dbRequest.onerror = function (e) {
        console.log("Connect error");
    }
}
function searchDB() {
    var idb;
    var dbRequest = indexedDB.open("mydb1", 9);
    dbRequest.onsuccess = function (e) {
        idb = e.target.result;
        var tx = idb.transaction(["student"], "readonly");
        var store = tx.objectStore("student");
        //var idx = store.index("nameIndex");
        var reg = store.get(3);
       // var reg = idx.get("Mike");
        reg.onsuccess = function () {
            if (this.result == undefined)
                alert("not found");
            else {
                document.getElementById("target").innerHTML = this.result.name + " " + this.result.address;

            }
            console.log("data output success");
        }
        reg.onerror = function () {
            console.log("get data on error");
        }
        console.log("connect success");
    }
    dbRequest.onerror = function () {
        console.log("connect error");
    }

}
function deleteData() {
    var dbRequest = indexedDB.open("mydb1");
    var idb;
    dbRequest.onsuccess = function (e) {
        idb = e.target.result;
        var tx = idb.transaction(["student"], "readwrite");
        var store = tx.objectStore("student");
        var reg = store.delete(4);
        reg.onsuccess = function () {
            console.log("delete success");
        }
        reg.onerror = function () {
            console.log("delete error")
        }
        console.log("connect success");
    }
    dbRequest.onerror = function () {
        console.log("connect error");
    }
}
function traverseDB() {
        var idb;
        var dbRequest = indexedDB.open("mydb1");
        dbRequest.onsuccess = function (e) {
        idb = e.target.result;
        var tx = idb.transaction(["student"], "readonly");
        var store = tx.objectStore("student");
        var target = document.getElementById("target");
        var idx = store.index("ageIndex");
        var range = IDBKeyRange.only(19);
        var direction = "next";//限制遍历范围
        var reg = idx.openCursor(range,direction);
        var str = "";
        reg.onsuccess = function (e) {
            var cursor = this.result;
            
            if (cursor) {
               str += " id= " + cursor.key + " name: " + cursor.value.name + " address: " + cursor.value.address + "<br>";
               cursor.continue();
            }
            else {
                console.log("finished");
                target.innerHTML = str;
            }
        }
        reg.onerror = function () {
            alert("search error");
        }
    }
}