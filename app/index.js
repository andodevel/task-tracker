const electron = require('electron');
const { ipcRenderer, remote } = electron;

function boot() {
    const logger = remote.getGlobal('logger');
    angular.module('app').value('logger', logger);

    angular.bootstrap(document, ['app'], {
        strictDi: false
    });
}

document.addEventListener('DOMContentLoaded', boot);

ipcRenderer.on('update-message', function(event, method) {
    alert(method);
});
