const allTags = [];

function getTags(item) {
    const description = item['description']
    if (description.indexOf('|') > -1) {
        return description.split("|")[1].split(',');
    }
    return [];
}

const does = (container) => ({
    "contain": (what) => {
        return container.indexOf(what) > -1;
    },
});

const doesnt = (container) => ({
    "contain": (what) => {
        return container.indexOf(what) < 0;
    },
});

function generateTagsNav(tags) {
    let output = `<button onclick="filter('todos');" class="tags-filter__filter-btn">Mostrar todos</button> `;
    
    tags.forEach((tag) => {
        output += `<button onclick="filter('${tag}');" class="tags-filter__filter-btn">#${tag}</button> `;
    });
    
    const div = document.createElement('div');
    
    div.innerHTML = output;
    
    document.querySelector(".tags-filter").appendChild(div);
    
}

function filter(tag) {
    document.querySelectorAll('.bloco').forEach((el)=>{
        const tagList = el.getAttribute('data-tags');
        const tags = tagList ? tagList.split(',') : null;
        
        if (!tags) {
            return;
        }
        
        if ( does(tags).contain(tag) || tag == "todos") {
            el.style.display = 'inline-block';
        } else {
            el.style.display = 'none';
        }
        console.log( does(tags).contain('todos') );
    });
}

function callback(json) {

    json.data.forEach(item => {
        
        const tags = getTags(item);

        if ( does(tags).contain('hidden') ) {
            return;
        }
        
        tags.forEach((tag)=>{
            if ( doesnt(allTags).contain(tag) ) {
                allTags.push(tag);
            }
        });

        const a = document.createElement('a');
        const img = document.createElement('img');
        const div = document.createElement('div');        
        const descricao = document.createElement('p');
        const title = document.createElement('h1');

        a.setAttribute('href', item['homepage']);
        a.setAttribute('target', 'filipeteixeira');
        img.setAttribute('src', item['html_url'] + '/blob/master/thumb.png?raw=true');
        title.innerHTML = item['name'].replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
        
        let descricaoContent = item['description'];
        if ( does(descricaoContent).contain('|') ) {
            descricaoContent = descricaoContent.split('|')[0];
        }
        
        descricao.innerHTML = descricaoContent;

        div.appendChild(title);
        div.setAttribute('class', 'bloco');
        div.setAttribute('data-tags', tags.join(','));
        div.appendChild(a);
        a.appendChild(img)
        div.appendChild(descricao);
        
        const cta = item['homepage'] ? `<button class="call-to-action__acessar" onclick="window.open('${item['homepage']}', 'filipeteixeira')">Acessar página</button>` : '';
        
        div.innerHTML += `
        <div class="call-to-action">
        ${cta}
        <button class="call-to-action__codigo" onclick="window.open('${item['html_url']}', 'filipeteixeira')">Acessar repositório</button>
        </div>
        `

        document.getElementById('portfolio_wrapper').appendChild(div);
    });
 
    generateTagsNav(allTags);
 
}