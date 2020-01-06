function callback(json) {
    json.data.forEach(item => {
		if (item['name'] == 'shuantsu.github.io') return;
        const a = document.createElement('a');
        const img = document.createElement('img');
        const div = document.createElement('div');
        const descricao = document.createElement('p');
        const title = document.createElement('h1');

		img.setAttribute('src', item['html_url'] + '/blob/master/thumb.png?raw=true');
        a.setAttribute('class', 'bloco');
        a.setAttribute('href', item['html_url']);
        title.innerHTML = item['name'].replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
        descricao.innerHTML = item['description'];
        a.appendChild(div);

        div.appendChild(title);
		div.appendChild(img);
        div.appendChild(descricao);

        document.getElementById('portfolio_wrapper').appendChild(a);
    });

    scrollTo();
}

function scrollAnchors(e, respond = null) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function () {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1';
            targetAnchor.focus();
            window.history.pushState('', '', targetID);
            clearInterval(checkIfDone);
        }
    }, 100);

}

function scrollTo() {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if ((link.href && link.href.indexOf('#') != -1) && ((link.pathname == location.pathname) || ('/' + link.pathname == location.pathname)) && (link.search == location.search)) {
            link.onclick = scrollAnchors;
        }
    }
}