var nome, pf, alignment;

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

    $('#closeModal').on('click', function(){
        $('#inputName').val("");
        $('#pf').val("");
        alignment = "";
    })
    
    $('#salvaCard').on('click', function(){
        creaCard();
        $('#modalAdd').hide();
        $('#inputName').val("");
        $('#pf').val("");
        alignment = "";
    })

    $(document).on('click', '.deleteCard', function(){
        $(this).parent().parent().parent().remove();
    })
})

function creaCard(){
    nome = $('#inputName').val();
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
        <div class="card squareCard ${alignment}">
            <div class="card-header">
                <div class="cardHeader">
                    ${icon}
                    <h6>${nome}</h6>
                    <button type="button" class="btn btn-danger deleteCard"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <div class="col-12 d-flex mt-2">
                <input type="number" class="col-6 noBorder"></input>
                <p class="col-6">/ ${pf} pf</p>
            </div>
        </div>
    `

    $('#cardsContainer').append(card);
}