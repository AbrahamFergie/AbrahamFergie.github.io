$(document).ready(function(){
    const repoNames = [
        {name: "Peak", deployedURL: "https://peak-af.herokuapp.com"}, 
        {name: "React_BlackJack", deployedURL: "https://blackjack-af.herokuapp.com"}, 
        {name: "myBooky", deployedURL: "https://bookstore-af.herokuapp.com"}, 
        {name: "portfolio-af", deployedURL: "https://portfolio-af.herokuapp.com"} 
    ]
    $("#projects-container")
        .hide()
    $("#menu")
        .hide()
        .html("<div class='center'><h4>X Close</h4><h4 id='esc-key'>Esc</h4></div>")
    $("#about-me-container")
        .hide()
    $(".menu-item").hover(function(){
        $(this).css("border-bottom", "2px solid #1c1c1c")
    }, function(){
        $(this).css("border-bottom", "")            
    })
    $("#social-icon1").click(function(){
        $("#social-modal1").fadeIn("fast")
    })
    $(".close-modal").click(function(){
        $(this).parent().fadeOut("fast")
    })
    $(".social-icons").hover(function(){
        if(window.outerWidth > 768) {
            if($(this).hasClass("fa-2x")){
                $(this).removeClass("fa-2x")
                $(this).addClass("fa-3x")
            }else {
                $(this).removeClass("fa-3x")
                $(this).addClass("fa-2x")
            }
        } else {
            if($(this).hasClass("fa-1x")){
                $(this).removeClass("fa-1x")
            }else {
                $(this).addClass("fa-1x")
            }
        }
    })
    console.log(window)
    if(window.outerWidth > 768) {
        if(!$("#social-icon1").hasClass("fa-2x")){
            $("#social-icon1, #social-icon2, #social-icon3").addClass("fa-2x")
        }
    } else {
        $("#social-icon1, #social-icon2, #social-icon3").removeClass("fa-2x")
    }
    $("#about-me").click(function() {
        $("#main-menu").fadeOut("fast")
        $("#menu").fadeIn("fast")
        if($("#about-me-container").children().length > 1){
            $("#about-me-container").fadeIn(900)
        }else {
            $("#about-me-container").html("<h3>Hello World</h3>")        
            $("#about-me-container").fadeIn(900)
        }
    })
    $("#projects").click(function(){
        $("#main-menu").fadeOut("fast")
        $("#menu").fadeIn("fast")
        $("#projects-container").css("position", "absolute")
        $("#projects-container").css("top", "10%")
        if($("#projects-container").children().length <= 2){
            $("#projects-container").append($("<h1>Projects</h1>"), $("<h3 id='loading'>Loading...</h3>"))
            getRepoInfo(repoNames)
        }else {
            $("#projects-container").fadeIn("fast")
        }
    })
    $("#menu").click(menuEventHandler)
    $(document).keyup(menuEventHandler)

    function menuEventHandler(event){
        if(event.key === "Escape" || event.handleObj.type === "click"){
            $("#menu").fadeOut("fast")
            $("#about-me-container").hide()
            $("#projects-container").fadeOut("fast")
            $("#main-menu").fadeIn(900)
        }
    }
    function getRepoInfo(repos) {
        $("#projects-container").fadeIn("fast")
        if(repoNames.length <= 0) {
            $("#loading").remove()
        } else {
            const repo = repos.shift()
            $.get("https://api.github.com/repos/abrahamfergie/" + repo.name, function(currentRepo){
                const projectsContainer = $("#projects-container")
                const row = $("<div class='row repos'>"),
                col1 = $("<div class='center text-center'>"), 
                col2 = $("<div class='center text-center'>"), 
                col3 = $("<div class='center text-center'>")
                row.append(
                    col1.append("<strong>Repository Name:</strong>&nbsp" + currentRepo.name),
                    col2.append("<strong>Description:</strong>&nbsp" + currentRepo.description),
                    col3.append("<strong>URLS:</strong><a href='" + currentRepo.html_url + "' target='_blank'><u>" + "Check Out The Repo</u></a>"),
                    col3.append("<a href='" + repo.deployedURL + "' target='_blank'><u>" + "View The App</u></a>")
                )
                projectsContainer.append(row)
                $(".repos").hover(function(){
                    $(this).css({
                        transform: "translateY(-12px)",
                        boxShadow: "0px 5px 50px #1c1c1c"
                    })
                }, function(){
                    $(this).css("transform", "")
                    $(this).css("box-shadow", "0px 10px 50px #1c1c1c")            
                })
                getRepoInfo(repos)
            })
        }
    }
})
