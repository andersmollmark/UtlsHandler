import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, OnInit} from '@angular/core';

import {remote, ipcRenderer} from 'electron';
import * as FileSystem  from 'fs';

let {dialog} = remote;

@Component({
    selector: 'myapp',
    template: '<h1>Utls-handler</h1>'
})

export class AppComponent {

    constructor() {
    }

    text;
    ngOnInit(){
        let _this = this;
        var menu = remote.Menu.buildFromTemplate([{
            label: 'Menu',
            submenu: [
                {
                    label: 'open',
                    click: function () {
                        dialog.showOpenDialog(_this.handleFile);
                    }
                },
                {
                    label: 'opencustom',
                    click: function () {
                        ipcRenderer.send('open-custom');
                        let notification = new Notification('Customdialog', {
                            body: 'This is a custom window created by us'
                        })

                    }
                }
            ]
        }]);
        remote.Menu.setApplicationMenu(menu);
    }


    handleFile(fileNamesArr: Array<any>) : void{
        if(!fileNamesArr){
            console.log("No file selected");
        }
        else{
            // (path) => this.readFile(fileNamesArr[0]);
            var reader = new FileReader();
            reader.onload = file => {
                var contents: any = file.target;
                this.text = contents.result;
            };
            reader.readAsText(fileNamesArr[0]);
            console.log(reader.readAsText(fileNamesArr[0]));

            // FileSystem.readFile(fileNamesArr[0], 'utf-8', function (err, data) {
            //     if(err){
            //         alert("an error occured");
            //         return;
            //     }
            //     console.log('Filecontent:' + data);
            // });
        }
    }

    readFile(filepath: string) : void{
        FileSystem.readFile(filepath, 'utf-8', function (err, data) {
            if(err){
                alert("an error occured");
                return;
            }
            console.log('Filecontent:' + data);
        });
    }
}


bootstrap(AppComponent);

