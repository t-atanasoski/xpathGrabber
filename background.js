  /*var clicked = false;
  function clickSaveDom(info){    
      alert(this);
      alert(clicked);
      if(clicked!=false){
        clicked.css('border', 'none');
      }
      alert(clicked);
      clicked = $(this);
      alert(clicked);
      clicked.css('border', '1px solid blue');
      
        var path = $(this).parents().andSelf();
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
        console.log(xpath);
        return false;

  }

  chrome.contextMenus.create(
        {title: "Save Dom",
        contexts:["all"],
        onclick: clickSaveDom});
  */

  var port_obj = {};
  var ports_arr = [];

  function setPort(name, portObj){
      port_obj = {"name" : name, obj : portObj};

      if(!getPort(name))
        ports_arr.push(port_obj);
      else{
        unsetPort(name);
        ports_arr.push(port_obj);
      }
  } 

  function getPort(name){
      var obj = false;
      for (var i = 0; i < ports_arr.length; i++) {
          if(ports_arr[i].obj.name == name){
            obj = ports_arr[i].obj;
          }
      }
      return obj;
  }

  function unsetPort(name){
      for (var i = 0; i < ports_arr.length; i++) {
          if(ports_arr[i].obj.name == name){
             ports_arr.splice(i, 1);
          }
      }
  }


chrome.runtime.onConnect.addListener(function(port) {
  setPort(port.name, port);
  port.onMessage.addListener(function(msg) {
      if(port.name == "sendDomToBackground"){
        var panelPort = getPort("sendDomToPanel");
        panelPort.postMessage(msg);  
      }
  });
});