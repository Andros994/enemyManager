var nome, pf, alignment, inziativa, init;

$(document).ready(function(){
    $('#modalAdd').hide();

    $('.btnAdd').on('click', function(){
        if (this.id == "addEnemy"){
            alignment = "enemy"
        } else if (this.id == "addAlly"){
            alignment = "ally"
        } else {
            alignment = "npc"
        }
        $('#modalAdd').show();
    })

    $('#randomName').on('click', function(){
        var arrayName = [];
        $.ajax({
            type: "GET",
            url: 'https://randommer.io/api/Name?nameType=fullname&quantity=1',
            headers: {"X-Api-Key": "9e63af1a0c8f4659934478690939fc20"},
            success: function(data){
                arrayName = data
                $('#inputName').val(arrayName[0])
            },
            error: function(error){
                console.log(error)
            }
        });
    })

    $(document).on('click', '#closeModal', function(){
        $('#modalAdd').hide();
        $('#inputName').val("");
        $('#iniziativa').val("");
        $('#pf').val("");
        alignment = "";
    })
    
    $(document).on('click', '#salvaCard', function(){
        creaCard();
        $('#modalAdd').hide();
        $('#inputName').val("");
        $('#iniziativa').val("");
        $('#pf').val("");
        alignment = "";
    })

    $(document).on('click', '.deleteCard', function(){
        $(this).parent().parent().parent().remove();
    })

    $(document).on('click', '#sortIniziativa', function(){
        var arrayToCreate = [];
        var listaIniziative = [];
        var inputIniziativa = Object.values($(document).find('.inputIniziativa'));
        var listaCards = Object.values($(document).find('.card')).slice(0,-2);
        inputIniziativa.forEach(el => {
            if(el.className && el.className != ""){
                listaIniziative.push(el.value);
            }
        })
        listaIniziative.sort(function(a, b){return a - b});
        listaIniziative = removeDuplicates(listaIniziative);
        listaIniziative.forEach(el => {
            listaCards.forEach(card => {
                if (card.attributes && card.attributes.iniziativa && card.attributes.iniziativa.value == el){
                    arrayToCreate.push(card);
                }
            })
        })
        arrayToCreate.forEach(el => {
            $('#cardsContainer').append(el);
        })
    })
})

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

function creaCard(){
    nome = $('#inputName').val();
    init = $('#iniziativa').val();
    pf = $('#pf').val();
    
    var icon = "";
    if (alignment == "enemy"){
        icon = '<i class="fa-solid fa-ghost"></i>';
    } else if (alignment == "ally"){
        icon = '<i class="fa-solid fa-shield"></i>'
    } else {
        icon = '<i class="fa-solid fa-user"></i>'
    }

    var card = `
        <div class="card squareCard ${alignment}" iniziativa="${init}">
            <div class="card-header">
                <div class="cardHeader">
                    ${icon}
                    <h6>${nome}</h6>
                    <button type="button" class="btn btn-danger deleteCard"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <div class="col-12">
                <p>Iniziativa</p>
                <input type="number" class="form-control inputIniziativa" refName="${nome}" value="${init}"></input>
            </div>
            <div class="col-12 d-flex mt-2">
                <input type="number" class="col-6 noBorder"></input>
                <p class="col-6">/ ${pf} pf</p>
            </div>
        </div>
    `

    $('#cardsContainer').append(card);
}