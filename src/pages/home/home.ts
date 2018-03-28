import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';

import { DatabaseProvider } from '../../providers/database/database';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    data:any=[];
    
    constructor(public navCtrl: NavController, public zone: NgZone,
                public db: DatabaseProvider) { }

    ionViewDidEnter() { 
        this.db.getOrGenerateDB().then((db: SQLiteObject) => { 
            db.executeSql('SELECT * FROM buku', {}).then(res => {
                this.data = [];
                this.zone.run(() => {
                    for (var i = 0; i < res.rows.length; i++) {
                        this.data.push({
                            id: res.rows.item(i).id,
                            judul: res.rows.item(i).judul
                        })
                    }
                })
            }).catch(e => console.log(e));
        });
    }

    edit(id) {
         this.navCtrl.push("BookformPage", {bookID: id})
    }

    add() {
        this.navCtrl.push("BookformPage")
    }

}
