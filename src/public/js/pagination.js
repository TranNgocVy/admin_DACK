function generatePagination(ttPage, crPage, mainUri) {
    var pagi = document.getElementById("pagination");
    pagi.innerHTML = "\n";
    for (let i = 0; i < ttPage; i++) {
        var className = "page-item";
        if (i + 1 == crPage) {
            className += " active";
        }
        var liDiv = `<li class="${className}"><a class="page-link" href="${mainUri}${i+1}" onclick="onPageChanged(${i+1})">${i+1}</a></li>\n`;
        pagi.innerHTML += liDiv;

    }

}