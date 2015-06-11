$(document).ready( function() {
    $( "#hidden_block").hide();
    $( "#hidden_info").hide();
	$(".lined").linedtextarea(	
	);
    $('#copy').tooltip({
            trigger: 'click',
            delay: { "show": 1500, "hide": 2000 }
    });
    $("body")
      .on("copy", ".zclip", function(e) {
        e.clipboardData.clearData();
        e.clipboardData.setData("text/plain", $( "#textToCopy" ).text());
        e.preventDefault();
        $('#copy').tooltip('show');
    });

    $( "#back" ).click(function() {
          parent.history.back();
            return false;
    });
    $( "#convert" ).click(function() {
        //clear the previous text
        $( "#textToCopy" ).text('');
        var nb_line_matched = 0;
        var lines = $('#text_to_convert').val().split('\n');
        var myRegexp = /(\ *)(.*?)\ (.*?)\ (.*?)\ \((.*?)\)/g;
        for(var i = 0;i < lines.length;i++){
            var match = myRegexp.exec(lines[i].toString());
            if(match != null) {
                nb_line_matched++;
                var matched_string = '&lt;dependency name="' +  match[2] + '" type="' +match[5] + '"/&gt;' + '\n';
                $( "#textToCopy" ).append(matched_string);
            }
        }
        if(nb_line_matched>0) {
            $( "#hidden_info").hide();
            $( "#hidden_block").show();
        } else {
            $( "#hidden_info").show();
            $( "#hidden_block").hide();
        }
    });
});
