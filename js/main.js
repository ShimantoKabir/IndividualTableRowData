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

    // hide and show side nav
    var sideNavHideShowController = 0;
    $(".side_nav_close_btn").click(function () {

        sideNavHideShowController++;
        $(".main_container").css("width","100%");
        $(".main_container").css("margin-left","0%");
        $(".side_nav").css("width","0%");

        if (sideNavHideShowController>1){
            sideNavHideShowController=0;
            $(".main_container").css("width","80%");
            $(".main_container").css("margin-left","20%");
            $(".side_nav").css("width","20%");
        }

    });

    // my data table ....
    myDataTable("flexiLoadHistoryTbl");
    function myDataTable(tableId) {

        configurePagination(5);

        // configure show entries per page ..
        $('#entries').change(function(){
            configurePagination($(this).val());
        });

        // configure search box ...
        $('#searchInput').keyup(function(){
            searchTableData($(this).val());
        });

        function searchTableData(value){
            $('#'+tableId+' tbody tr').each(function(){
                var found = 'false';
                $(this).each(function(){
                    if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){
                        found = 'true';
                    }
                });
                if(found == 'true'){
                    $(this).show();
                }else{
                    $(this).hide();
                }
            });
        }

        // configure pagination ....
        function configurePagination(numberOfEntries) {

            $(".pagination a").remove();
            $(".pagination button").remove();

            var perPage = numberOfEntries;
            var currentPage = 0;
            var pageIncrement = 0;

            $("#"+tableId+" tbody tr").hide();
            $("#"+tableId+" tbody tr").slice(0,perPage).show();
            var numRows = $("#"+tableId+" tbody tr").length;

            var numPages = Math.ceil(numRows / perPage);

            $(".pagination").append('<button class="btn btn-secondary" id="prev" > prev </button>');
            for (var i = 0; i < numPages; i++) {
                $(".pagination").append('<a style="color: white" class="btn btn-secondary" id="'+i+'" >'+(i+1)+'</a>');
            }
            $(".pagination").append('<button class="btn btn-secondary" id="next" > next </button>');

            $(".pagination button").css("margin-left","4px");
            $(".pagination a").css("margin-left","4px");

            $("#next").click(function () {
                $("#prev").css("color","white");
                pageIncrement++;
                if (pageIncrement > numPages - 1){
                    pageIncrement = numPages - 1;
                    $("#next").css("color","red");
                }else {
                    $("#next").css("color","white");
                }
                showTableRow(pageIncrement);
            });

            $("#prev").click(function () {
                $("#next").css("color","white");
                pageIncrement--;
                if (pageIncrement < 0){
                    pageIncrement = 0;
                    $("#prev").css("color","red");
                }else {
                    $("#prev").css("color","white");
                }
                console.log(pageIncrement);
                showTableRow(pageIncrement);
            });

            $(".pagination a").click(function (event) {

                currentPage = parseInt(event.target.id);
                console.log(currentPage);
                showTableRow(currentPage);
            });

            var ancorTaglenght = $(".pagination a").length;

            function showTableRow(currentPage) {

                for (var i = 0; i < ancorTaglenght; i++) {
                    if (i == currentPage){
                        console.log("mathc"+i);
                        $("#"+i+"").css("color","red");
                    }else {
                        $("#"+i+"").css("color","white");
                        console.log("not match"+i);
                    }
                }

                $("#"+tableId+" tbody tr").hide();
                $("#index").text("Showing : "+(currentPage * perPage)+" - "+((currentPage + 1) * perPage)+" | "+numRows+"");
                $("#"+tableId+" tbody tr").slice(currentPage * perPage,(currentPage + 1) * perPage).show();
            }

        }

    }

    // Extract individual table row data ....
    $("#flexiLoadHistoryTbl > tbody > tr > td > i").click(function () {

        var inputName = ["name","position","office","age","startdate","balance","edit"];

        var columnName = $("#flexiLoadHistoryTbl > thead > tr > th");

        $("#show_selected_data_in_form").html("");

        var data = $(this).closest('tr').find('td');
        for (var i = 0; i < data.length-1; i++) {
            $("#show_selected_data_in_form").append("\n" +
                "<div class='form-group'>\n" +
                "    <label>"+columnName[i].innerHTML+"</label>\n" +
                "    <input name='"+inputName[i]+"' type='text' value='"+data[i].innerHTML+"' class='form-control'>\n" +
                "</div>");
        }

        $("#show_selected_data_in_form").append("<button type='submit' class='btn btn-primary'>Save</button>");

        $("#myModal").show();

    });

    $(".close").click(function () {
        $("#myModal").hide();
    });


});
