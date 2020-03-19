// var para1 = document.getElementById('para1');
// para1.innerHTML = 'Welcome to JS';

// $('#para1').html('jQuery Welcome');
$('p').css({
    'fontSize': '30px',
    'color': 'grey'
});

$('#para1').css('color','red');

$('div').css({
    'width': '100px',
    'height': '100px',
    'backgroundColor': 'cyan'
});

// $('div').click(function(){
//     alert("Div Clicked!");
// });

$('div').click(function(){
    var element = $(this);
    element.width(element.width()+10+'px');
});

$('a').on('click',function(event){
    // event.preventDefault();
    alert("Anchor Tag Clicked");
});
/*
    Rough idea of $ function

    function $(query){
        return document.querySelector(query);
    }
    
    $ returns a jQuery Object
*/