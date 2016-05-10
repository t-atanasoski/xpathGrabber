function getCssPath(obj) {
    if (obj.length != 1) throw 'Requires one element.';

    var path, node = obj;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) { 
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
    }

    return path;
};

function getXpath(obj){
	var path = obj.parents().andSelf();
    var xpath='/';
    for (var i = 0; i < path.length; i++)
    {
        var nd = path[i].nodeName.toLowerCase();
        xpath += '/';
        if (nd != 'html' && nd != 'body')
        {xpath += nd+'['+ ($(path[i-1]).children().index(path[i])+1) +']';}
        else
        {xpath += nd;}                    
    }

    return xpath;
}

(function(){
	var clicked = false;
	var clickedXpath = '';
	var port = chrome.runtime.connect({name: "sendDomToBackground"});

	$(document).delegate('*','mousedown',function(event){
		if (event.which==3) {
			if(clicked!=false){
				clicked.css('border', 'none');
			}		



			clicked = $(this);
			clicked.css('border', '1px solid blue');
			
			var css_path 	= getCssPath(clicked);
			var xpath 		= getXpath(clicked);			
		    port.postMessage({"xpath": xpath, "css_path": css_path});
		    return false;
	    }
	    else if(clicked!=false){
			clicked.css('border', 'none');
			return false;
		}
	});


})();
