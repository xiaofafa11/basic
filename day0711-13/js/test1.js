let btn = document.querySelector("button");
console.log(btn);
btn.onclick = function () {
    import('./test2.js').then(module => {
        module.hello();
    })
}