import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('placesImage.db'); // connect OR create db, SQLite.openDatabase(name, version, description, size)

export const init = () => {
  const customPromise = new Promise((resolve, reject) => {
    db.transaction((tx) => { // db.transaction(callback, error, success)
      tx.executeSql( // tx.executeSql(sqlStatement, arguments, success, error)
        'CREATE TABLE IF NOT EXISTS placesImage (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, description TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return customPromise;
};