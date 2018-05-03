$(document).ready(function () {

    $.ajax({
        url: "LocalDataJson/sideNavMenu.json",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function(response){

            for (var i = 0; i < response.sideNavMenu.length; i++) {

                $(".side_nav_menu").append("" +
                    "<div id='side_nav_menu_div"+i+"' class='side_nav_menu_div' >\n" +
                    "    <div class='side_nav_menu_head' >\n" +
                    "        <div class='side_nav_menu_head_name_icon' >\n" +
                    "            <i class='"+response.sideNavMenu[i].icon+"'></i>\n" +
                    "            <h6>"+response.sideNavMenu[i].menuName+"</h6>\n" +
                    "        </div>\n" +
                    "        <div class='side_nav_menu_head_rotate_icon' >\n" +
                    "            <i id='rotate"+i+"' class='fas fa-angle-down'></i>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "    <div id='side_nav_sub_menu_list"+i+"' class='side_nav_sub_menu_list' >");

                console.log(response.sideNavMenu[i].menuName);
                console.log("----Sub Menu----");

                for (var j = 0; j < response.sideNavMenu[i].subMenu.length; j++) {
                    console.log(response.sideNavMenu[i].subMenu[j].name);
                    $("#side_nav_sub_menu_list"+i).append("<a href='#' > <i class='fas fa-arrow-right'></i> "+response.sideNavMenu[i].subMenu[j].name+"</a>");
                }

                $(".side_nav_menu").append("" +
                    "    </div>\n" +
                    "</div>");
            }

            // show and hide side menu ....
            $(".side_nav_sub_menu_list").hide();

            $(".side_nav_menu_div").click(function () {

                var selected_side_nav_menu_div_id = this.id;

                var lastChar = selected_side_nav_menu_div_id.charAt(selected_side_nav_menu_div_id.length - 1);

                // hide and show sub menu list ....
                $("#side_nav_sub_menu_list"+lastChar+"").toggle("slow");

                // rotate the icon ....
                $("#rotate"+lastChar+"").toggleClass("down");

                hideUnActiveSubMenuList(lastChar);

            });

            function hideUnActiveSubMenuList(lastChar) {
                for (var i = 0; i < response.sideNavMenu.length; i++) {
                    if (i != lastChar){
                        $("#side_nav_sub_menu_list"+i+"").hide("slow");
                    }
                }
            }

        },
        error:function (response) {
            alert("ERROR -> " + response);
        }
    });

});
