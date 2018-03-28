import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {
    db:SQLiteObject = null;

    constructor(private sqlite: SQLite) { }

    getOrGenerateDB() {
        // Generate DB adalah proses asynchronus, jadi bagusnya kita pakai promise
        // Walaupun prosesnya hanya sepersekian detik, tetap saja harus di tunggu.
        return new Promise((resolve, reject) => {
            if (this.db != null) {
                resolve(this.db)
            } else {
                this.sqlite.create({
                    name        : 'myDatabase.db',
                    location    : 'default'
                }).then((db: SQLiteObject) => {
                    this.db = db;
                    resolve(this.db)
                }).catch((e) => {
                    console.log(e);
                    reject(e);
                });
            }
        });
    }
   
    createTable() {
        this.getOrGenerateDB().then((db: SQLiteObject) => { 
            var sql = 'create table IF NOT EXISTS buku (' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, '+ 
            'judul VARCHAR(255), '+
            'penerbit VARCHAR(50), '+  
            'pengarang VARCHAR(50))';

            db.executeSql(sql, {})
                .then(() => console.log('tabel buku berhasil di create'))
                .catch(e => console.log(e));

            // db.executeSql('DELETE FROM buku', {})
            //     .then(() => console.log('tabel buku berhasil di delete'))
            //     .catch(e => console.log(e));

            // db.executeSql('INSERT INTO buku values (?, ?,?,?)', 
            //               [null, "judullll", "penerbittt", "ppengarang OKEOKE"])
            //     .then(() => console.log('tabel buku berhasil di tambah'))
            //     .catch(e => console.log(e));


            // Untuk create table lainnya bisa ditambahkan di sini
            // contoh
            // var sql = 'create Tabel 2 IF NOT EXISTS delivery_form (' +
            //     'number VARCHAR(255) PRIMARY KEY, '+ 
            //     'round_id VARCHAR(255), '+
            //     'state VARCHAR(50), '+  
            //     'has_returns INTEGER(2), '+  
            //     'has_annotations INTEGER(2))';
            // db.executeSql(sql, {})
            //     .then(() => console.log('delivery_form table has created'))
            //     .catch(e => console.log(e));
        })
    }

}
