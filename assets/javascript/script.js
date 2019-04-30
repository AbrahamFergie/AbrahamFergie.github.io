$(document).ready(function(){
    $("#about-me-container")
        .hide()
    $("#projects-container")
        .hide()
    $("#menu")
        .hide()
        .html("<div class='center'><h4 id='menu-close'>X Close</h4><h4 id='esc-key'>Esc</h4></div>")
    $(".carousel").carousel({interval: false})
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
        } 
    })
    $(".social-icons").on('touchstart', function(e) {
        $(this).removeClass("fa-2x")
        $(this).addClass("fa-3x")
    })
    $(".social-icons").on('touchend', function(e) {
        $(this).removeClass("fa-3x")
        $(this).addClass("fa-2x")
    })
    $("#about-me").click(function() {
        $("#main-menu").fadeOut("fast")
        $("#side-bar").fadeOut("fast")
        $("#menu").fadeIn("slow")
        $("#about-me-container").css({"display": "block"})
    })
    const repoNames = [
        {name: "Peak", deployedURL: "https://peak-af.herokuapp.com"}, 
        {name: "React_BlackJack", deployedURL: "https://blackjack-af.herokuapp.com"}, 
        {name: "myBooky", deployedURL: "https://bookstore-af.herokuapp.com"}, 
        {name: "Quickness", deployedURL: "http://www.abrahamfergie.com/Quickness"},
        {name: "portfolio-af", deployedURL: "https://portfolio-af.herokuapp.com"}
    ]
    $("#projects").click(function(){
        $("#main-menu").fadeOut("fast")
        $("#side-bar").fadeOut("fast")
        window.outerWidth > 768 ? null : $("#social-media").fadeOut("fast")
        $("#menu").fadeIn("fast")
        $("#projects-container").css("position", "absolute")
        $("#projects-container").css("top", "10%")
        if($("#projects-container").children().length <= 2){
            $("#projects-container").append($("<h1>Projects</h1>"), $("<h3 id='loading'>Loading...</h3>"))
            getRepoInfo(repoNames)
        }else {
            $("#projects-container").fadeIn("fast")
        }
        if(window.outerWidth < 768) {
            $("#social-media").fadeOut("fast")
        }
    })
    // $("#icon").click(function(){

    // })
    $("#menu").click(menuEventHandler)
    $(document).keyup(menuEventHandler)
    $("#my-form-submit").click(sendEmail)
})
function getRepoInfo(repos) {
    $("#projects-container").fadeIn("fast")
    if(repos.length <= 0) {
        $("#loading").remove()
        $(".repos").hover(function(){
            $(this).css({
                transform: "translateY(-12px)",
                boxShadow: "0px 5px 50px #1c1c1c"
            })
        }, function(){
            $(this).css("transform", "")
            $(this).css("box-shadow", "0px 10px 50px #1c1c1c")            
        })
    } else {
        const repo = repos.shift()
        $.get("https://api.github.com/repos/abrahamfergie/" + repo.name, function(currentRepo){
            const projectsContainer = $("#projects-container")
            const row = $("<div class='row repos'>"),
            col1 = $("<div class='center text-center info-wrapper-name'>"), 
            col2 = $("<div class='center text-center info-wrapper'>"), 
            col3 = $("<div class='center text-center info-wrapper'>")
            row.append(
                col1.append("<strong>Repository Name:</strong><h5>" + currentRepo.name + "</h5>"),
                col2.append("<strong>Description:</strong>" + currentRepo.description),
                col3.append(
                    "<strong>URLS:</strong><div class='link-space'><a class='link' href='" +
                    currentRepo.html_url + "' target='_blank'>" +
                    "Check Out The Repo</a><a class='link' href='" +
                    repo.deployedURL + "' target='_blank'>" + "View The App</a></div>"
                )
            )
            if(isMobile()){
                fixColumns([col1, col2, col3])
            }
            projectsContainer.append(row)
            getRepoInfo(repos)
        })
        $("#projects-container").fadeIn("slow")
    }
}
function sendEmail(event) {
    event.preventDefault()
    //retrieve info from form
    const myform = $("#my-form")
    const service_id = "default_service"
    const template_id = "template_xwI0gqrA"
    myform.find("button").text("Sending...")
    emailjs.sendForm(service_id,template_id,"my-form")
        .then(function(){
            alert("Sent!")
            myform.find("button").text("Send")
        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err))
            myform.find("button").text("Send")
        })
}
function menuEventHandler(event){
    if(event.key === "Escape" || event.handleObj.type === "click"){
        $("#menu").hide()
        $("#projects-container").hide()
        $("#about-me-container").hide()
        $("#main-menu").fadeIn("slow")
        $("#side-bar").fadeIn("slow")
        $("#social-media").fadeIn("slow")
    }
}
function fixColumns(arr){
    arr.forEach((col)=> {
        col.removeClass("d-block")
        col.addClass("d-flex")
    })
}
function isMobile() {
    try{ document.createEvent("TouchEvent"); return true; }
    catch(e){ return false; }
}
