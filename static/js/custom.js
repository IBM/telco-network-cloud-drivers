function setIdOnBody() {
    var bodyId = "";
    if (window.location.pathname === "/telco-network-cloud-drivers/" || window.location.pathname === "/TNC/alm-docs.github.io/" || window.location.pathname === "/") {
        bodyId = "product-overview";
    } else {
        bodyId = window.location.pathname.replace(/\//g, "-");
        bodyId = bodyId.substring(1, bodyId.length-1);
    }
    bodyId = bodyId + "-body";
    $("body").attr("id", bodyId);
}

function replaceHomeButton() {
    $("body > article > aside > ul > li:nth-child(1) > a").text("Home");
}

function adjustSidebar() {
    $('.haschildren > div > a').each(function( index ) {
        $(this).attr('href', 'javascript:void(0)');
        $(this).click(function() {
            $(this).parent().children('i').toggleClass("fa-angle-down fa-angle-right") ;
            $(this).parent().parent().children('ul').toggle();
        });
    });
}

function displaySite() {
    $("body").show();
}

function showVersionDropdown() {
    document.getElementById("versionDropdown").classList.toggle("show");
}

function addVersionDropdown() {
    var versionDropdown =
        '<div class="dropdown">'
            + 'Version 2.2.0'
        + '</div>';
    $( "header > nav.shortcuts > li:last-child" ).html(versionDropdown);
}

// Close the version dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function tweakPage() {
    setIdOnBody();
    replaceHomeButton();
    adjustSidebar();
    addVersionDropdown();
    displaySite();
}

$(tweakPage)
