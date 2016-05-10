(function() {

	$("#submit_btn").click(eventSubmitClickHandler);
  $("#skip_btn").click(eventSkipClickHandler);
  $("#page_type").change(eventChangePageTypeHandler);
  $("#source_id").change(eventChangeSourceIdHandler);

  function eventSubmitClickHandler(){
      alert("submit");
  }

  function eventSkipClickHandler(){
      alert("skip");
  }

  function eventChangePageTypeHandler(){
      alert("Page Type");
  }

  function eventChangeSourceIdHandler(){
      alert("source");
  }

  var port = chrome.runtime.connect({name: "sendDomToPanel"});
  port.onMessage.addListener(function (msg) {
    $("#xpath_selector").val(msg.xpath);
    $("#css_selector").val(msg.css_path);
});
})();
