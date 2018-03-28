import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
    selector: 'page-bookform',
    templateUrl: 'bookform.html',
})
export class BookformPage {
    book: any = {
        judul: '',
        penerbit: '',
        pengarang: ''
    }
    title = '';
    bookID = '';
    toaster: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, 
                public toastCtrl: ToastController, public db: DatabaseProvider) {
        this.title = 'Tambah Buku';
        this.bookID = navParams.get("bookID");
        if (this.bookID != null || this.bookID != undefined) {
            this.title = 'Edit Buku';
        }
        this.toaster = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom'
        });
    }

    ionViewDidLoad() {
        if (this.bookID != '') {
            this.db.getOrGenerateDB().then((db: SQLiteObject) => { 
                db.executeSql('SELECT * FROM buku where id = ?', [this.bookID]).then(res => {
                    this.book = {
                        id: res.rows.item(0).id,
                        judul: res.rows.item(0).judul,
                        penerbit: res.rows.item(0).penerbit,
                        pengarang: res.rows.item(0).pengarang
                    }
                }).catch(e => console.log(e));
            });
        }
    }

    save() {
        if (this.book.judul == '' || this.book.penerbit == '' || this.book.pengarang == '') {
            this.toaster.setMessage('All fields are required');
            this.toaster.present();
        } else {
            // Jika edit
            if (this.bookID) {
                var sql = 'UPDATE buku SET judul=?, penerbit=?, pengarang=? where id = ?';
                var param = [this.book.judul, this.book.penerbit, this.book.pengarang, this.book.id];
            } else {
                console.log(this.book);
                param = [null, this.book.judul, this.book.penerbit, this.book.pengarang]
                sql = 'INSERT INTO buku values (?,?,?,?)';
            }

            this.db.getOrGenerateDB().then((db: SQLiteObject) => { 
                db.executeSql(sql, param).then(res => {
                    setTimeout(()=>{
                        this.navCtrl.pop();
                    }, 300) 
                }).catch(e => console.log(e));
            });
        }
    }

    deleteBook() {
        this.db.getOrGenerateDB().then((db: SQLiteObject) => { 
            db.executeSql('DELETE FROM buku where id = ?', [this.bookID]).then(res => {
                setTimeout(()=>{
                    this.navCtrl.pop();
                }, 300) 
            }).catch(e => console.log(e));
        });
    }
}
