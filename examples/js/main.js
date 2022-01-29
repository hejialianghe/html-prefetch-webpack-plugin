import('./common.css')
import(/* webpackChunkName: 'big-file'
*/'./big-file').then(result => {
        console.log(result.default);
});

var h1 = document.createElement('h1');
h1.innerHTML = 'Hello world!';
document.body.appendChild(h1);
