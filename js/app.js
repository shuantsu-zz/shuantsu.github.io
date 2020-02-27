function callback(json) {
    json.data.forEach(item => {
	if (item['name'] == 'shuantsu.github.io') return;
        const a = document.createElement('a');
        const img = document.createElement('img');
        const div = document.createElement('div');
        const descricao = document.createElement('p');
        const title = document.createElement('h1');

        img.setAttribute('src', item['html_url'] + '/blob/master/thumb.png?raw=true');
        title.innerHTML = item['name'].replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
        descricao.innerHTML = item['description'];

        div.appendChild(title);
        div.setAttribute('class', 'bloco');
        div.appendChild(img);
        div.appendChild(descricao);
        
        div.innerHTML += `
        <div class="call-to-action">
        <button class="call-to-action__acessar" onclick="window.open('${item['homepage']}', 'filipeteixeira')">Acessar</button>
        <button class="call-to-action__codigo" onclick="window.open('${item['html_url']}', 'filipeteixeira')">Ver código</button>
        </div>
        `

        document.getElementById('portfolio_wrapper').appendChild(div);
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
