$(document).ready(function() {

    $("input[name='radioButton']").click(function(){
        let radioValue = $("input[name='radioButton']:checked").val();  
        $('.flex').removeClass('flex').addClass(radioValue); 
        $('.float').removeClass('float').addClass(radioValue); 
      });

    $("#searchButton").click(function() {
        // Remove tags when new search
        $('.flex').remove();
        $('.float').remove();

        var search = $("#search").val();
        if (search === "") {
            alert("Random Search gone fishing, type in something bro!");
            $("#search").focus();
            return;
        }
        var sendSearch = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(sendSearch, {            
            tags: search,
            tagmode: "any",
            format: "json"}).done(function(result) {
            $.each(result.items, function(i,item){
                //Radiobuttons chooses display style
                let radioValue = $("input[name='radioButton']:checked").val();
                //console.log(result.items);

                let container = $("<div>").addClass(radioValue);
                $("<img>").width(300).attr("src", item.media.m).addClass("img").appendTo(container);
                container.appendTo(".col");
                return i < 8;
            });
            //modal for both display styles with increase in img size
            $('.flex, .float').on("click", function () {
                $("#dialog").empty();
                
                let imageSrc = $(this).children().first().attr("src");
                let description = $(this).children().first().attr("alt");

                $("<img>").width(400).attr("src", imageSrc).attr("alt", description).appendTo("#dialog");
                $("<p>").text(description).appendTo("#dialog");
                $("#dialog").dialog(
                    {
                    position : ['center',10],
                    dialogClass: "fixed-dialog",
                    width: 'auto',
                    height: 'auto'
                });
            });
            $('input[type="text"]').val('');
            $('input[type="radioButton"]').val('');
        });
    });
  });