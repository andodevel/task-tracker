const tt = require('electron-tooltip');

tt({
    position: 'bottom',
    width: 50,
    style: {
        backgroundColor: '#413242c5',
        borderRadius: '4px'
    }
})

function selectListItem(e) {
    e.preventDefault();
  [].map.call(document.querySelectorAll('.tracked-item'), function(el) {
        el.classList.remove('active');
    });

    this.classList.add('active');
}
var items = document.querySelectorAll('.tracked-item');
for (var i = 0; i < items.length; ++i) {
    items[i].addEventListener('click', selectListItem);
}
