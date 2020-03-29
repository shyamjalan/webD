$('#fetch-button').click(function(){
    $('#button-container').remove();
    $.get("https://www.codingninjas.in/api/v3/courses", function(response){
    let courseContainer = $('#courses-container');
    let courses = response.data.courses;
    // console.log(courses);
    for(let index = 0; index < courses.length; ++index){
        courseContainer.append(`
            <div class="card shadow-sm mx-2 my-4" style="width: 18rem;">
                <img src="${courses[index].preview_image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${courses[index].name}</p>
                    <p class="card-text text-right">${courses[index].level}</p>
                </div>
            </div>
        `
        );
    }
}).fail(function (xhr, textStatus, errorThrown) {
    console.error("Request failed due to Error : " + errorThrown);
});
});