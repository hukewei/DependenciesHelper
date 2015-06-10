$(document).ready( function() {
    $( "#hidden_block").hide();
    $( "#hidden_info").hide();
	$(".lined").linedtextarea(	
	);
    $('#copy').tooltip({
            trigger: 'click',
            delay: { "show": 500, "hide": 100 }
    });
    $("body")
      .on("copy", ".zclip", function(e) {
        e.clipboardData.clearData();
        e.clipboardData.setData("text/plain", $( "#textToCopy" ).text());
        e.preventDefault();
        $('#copy').tooltip('show');
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
    $( "#sort" ).click(function() {
        //clear the previous text
        var matched_deps = [];
        var lines = $('#text_to_convert').val().split('\n');
        for(var i = 0;i < lines.length;i++){
            var cleaned_text = lines[i].replace(/^ +/gm, '');
            if(cleaned_text != '') {
                matched_deps.push(cleaned_text);
                console.log(cleaned_text);
            }
        }
        console.log(matched_deps.length);
        if(matched_deps.length > 0) {
            matched_deps.sort();
            var sorted_text = matched_deps[0];
            for (var index = 1; index < matched_deps.length; index++) {
                sorted_text += '\n' + matched_deps[index];
            }
            $( "#hidden_info").hide();
            $( "#hidden_block").show();
            console.log(sorted_text);
            $('#textToCopy').text(sorted_text);
        } else {
            $( "#hidden_info").show();
            $( "#hidden_block").hide();
        }
    });
});
