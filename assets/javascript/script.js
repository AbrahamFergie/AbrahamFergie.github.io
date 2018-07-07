$(document).ready(function(){
    $("#projects-container")
        .hide()
    $("#menu")
        .hide()
        .text("X Close")
    $("#about-me-container")
        .hide()
    $(".menu-item").hover(function(){
        $(this).css("border-bottom", "2px solid #1c1c1c")
    }, function(){
        $(this).css("border-bottom", "")            
    })
    $("#about-me").click(function() {
        $(this).hide()
        $("#projects").hide()
        $("#menu").fadeIn("slow")
        if($("#about-me-container").children().length > 1){
            $("#about-me-container").fadeIn("slow")
        }else {
            $("#about-me-container").append("<h3>Hello World</h3>")        
            $("#about-me-container").fadeIn("slow")
        }
    })
    $("#projects").click(function(){
        $(this).hide()
        $("#about-me").hide()
        $("#menu").fadeIn("slow")
        $("#projects-container").css("position", "absolute")
        $("#projects-container").css("top", "10%")
        if($("#projects-container").children().length <= 2){
            $("#projects-container").append($("<h1>Projects</h1>"), $("<h3 id='loading'>Loading...</h3>"))
            $.get("https://api.github.com/users/abrahamfergie/repos", function(data){
                console.log(data)
                const projectsContainer = $("#projects-container")
                data.forEach(repo => {
                    const row = $("<div class='row repos'>"),
                    col1 = $("<div class='center'>"), 
                    col2 = $("<div class='center'>"), 
                    col3 = $("<div class='center'>")
                    row.append(                    
                        col1.append("<strong>Repository Name:</strong>&nbsp" + repo.name),
                        col2.text(repo.description),
                        col3.append("<a href='" + repo.html_url + "' target='_blank'>" + "<u>Check Out The Repo</u></a>"),                    
                    )
                    projectsContainer.append(row)
                })
                $(".repos").hover(function(){
                    $(this).css({
                        transform: "translateY(-12px)",
                        boxShadow: "0px 5px 50px #1c1c1c"
                    })
                }, function(){
                    $(this).css("transform", "")
                    $(this).css("box-shadow", "0px 10px 50px #1c1c1c")            
                })
                $("#loading").remove()
            })
            $("#projects-container").fadeIn("slow")
        }else {
            $("#projects-container").fadeIn("slow")
        }
    })
    $("#menu").click(function(){
        $(this).hide()
        $("#projects-container").hide()
        $("#about-me-container").empty().hide()
        $("#about-me").fadeIn("slow")
        $("#projects").fadeIn("slow")
    })
})