$(document).ready(function() {
    let info = {}
    let results = []
    let count = 1;
    getCharacter().then(json=>{
        parseCharacters(json,0)
    })

    function parseCharacters(json,previous){
        if(!json.ok){
            $('.page-master').addClass('disable');
            $('.page-master-text').text(`0 of 1`)
            return;
        }
        count = count + previous
        info = json.info;

        const leftClass = info.prev ? 'removeClass' : 'addClass'
        const rightClass = info.next ? 'removeClass' : 'addClass'
        $('.page-master.left')[leftClass]('disable');
        $('.page-master.right')[rightClass]('disable');
        $('.page-master-text').text(`${count} of ${info.pages}`)

        
        results = json.results;

        let cards = results.map( cardHtml ).join('');

        $('main .content').html(cards);

        console.log(results)
    }

    function cardHtml(data){
        return `
        <div clas="col-sm-12 col-md-6 col-lg-3">
            <div class="character-card py-4 sm:py-3" data-url="${data.url}">
                <img src="${data.image}" alt="" class="mb-0 sm:mb-4" srcset="">
                <div class="card-content">
                    <div class="title">
                        ${data.name}
                    </div>
                    <div class="subtitle">
                        <i class="fa fa-circle ${data.status == 'Alive'?'':'dead'}"></i> ${data.status} - ${data.species}
                    </div>
                </div>
            </div>
        </div>`
    }

    function modalHtml(data){
        let gender = data.gender;
        let faIcon = 'fa-genderless'
        if(gender == 'Male'){
            faIcon = 'fa-mars'
        }
        else if(gender == 'Female'){
            faIcon = 'fa-venus'
        }
        return`
        <a href="#close-modal" rel="modal:close" class="fa fa-times"></a>
        <div class="profil">
            <img src="${data.image}" alt="" srcset="">
            <h2>
                ${data.name}
            </h2>
            <div class="subtitle">
                <i class="fa fa-circle ${data.status == 'Alive'?'':'dead'}"></i> ${data.status} - ${data.species}
            </div>
        </div>
        <div class="exta-data">
            <div class="gender">
                Gender:&nbsp;<i class="fa ${faIcon} fa-lg" style="font-weight:700"></i><span class="gender-text">&nbsp;${gender}</span>
            </div>
            <div class="location">
                Last seen location: ${data.location.name}
            </div>
            <div class="episodes">
                Number of episodes appeared:  ${data.episode.length}
            </div>
        </div>
        `
    }


    $('main').on('click','.page-master',function(){
        let direction = this.dataset.hasOwnProperty('left') ? info.prev : info.next
        let count = this.dataset.hasOwnProperty('left') ? -1 : 1
        getCharacter(direction).then(json=>{
            parseCharacters(json,count)
        })
    })

    $('main').on('click','.character-card[data-url]',async function(){
        let url = this.dataset.url
        let data = await getCharacter(url);
        console.log(data)
        $('#character-modal').html( modalHtml(data) ).modal({closeClass: 'icon-remove'})
    })
});



