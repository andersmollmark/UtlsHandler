import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';

import {remote, ipcRenderer} from 'electron';

let {dialog} = remote;

@Component({
    selector: 'myapp',
    template: '<h1>Utls-handler</h1>'
})

export class AppComponent {

    constructor() {
        var menu = remote.Menu.buildFromTemplate([{
            label: 'Menu',
            submenu: [
                {
                    label: 'open',
                    click: function () {
                        var file;
                        dialog.showOpenDialog(function (fileNamesArr) {
                            if(!fileNamesArr){
                                console.log("No file selected");
                            }
                            else{
                                this.readFile(fileNamesArr[0]);
                            }
                        });
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
        }])
        remote.Menu.setApplicationMenu(menu);
    }

    readFile(filepath): void {
        fileSystem.readFile(filepath, 'utf-8', function (err, data) {
            if(err){
                alert("an error occured");
                return;
            }
            console.log('Filecontent:' + data);
        });
    }
}


bootstrap(AppComponent);

