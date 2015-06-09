var _paperId = $('#paper-id').val();
var _username = $('#username').val();
var _rootAPI = 'http://downey-n1.cs.northwestern.edu:8080/kpe-annotator/kp/';
var _initMaxList = false;
var _currentKey = '';
var _currentKeyId = '';

function updateHeader() {
 $(".persist-area").each(function() {
  var el         = $(this),
  //offset         = el.offset(),
  scrollTop      = $(window).scrollTop(),
  floatingHeader = $(".floatingHeader", this)
  if ((scrollTop > offset().top) && (scrollTop < offset().top + el.height())) {
   floatingHeader.css({"visibility": "visible"});
  } else {
   floatingHeader.css({"visibility": "hidden"});
  }});
  var el = $('#title-header');
  //var offset = el.offset();
  var scrollTop = $(window).scrollTop();
  var persist = false;
  if (scrollTop > offset().top) persist = true;
  if (persist) {
   $("#left-column").css({"position": "fixed"});
   $("#right-column").css({"position": "fixed"});
  } else {
   $("#left-column").css({"position": "relative"}); 
   $("#right-column").css({"position": "relative"});
  }
}
// function updateHeader() {
//  $(".persist-area").each(function() {
//   var el         = $(this),
//   offset()         = el.offset()(),
//   scrollTop      = $(window).scrollTop(),
//   floatingHeader = $(".floatingHeader", this)
//   if ((scrollTop > offset()().top) && (scrollTop < offset()().top + el.height())) {
//    floatingHeader.css({"visibility": "visible"});
//   } else {
//    floatingHeader.css({"visibility": "hidden"});
//   }});
//   var el = $('#title-header');
//   var offset() = el.offset()();
//   var scrollTop = $(window).scrollTop();
//   var persist = false;
//   if ((scrollTop > offset()().top) && (scrollTop < offset()().top + el.height())) persist = true;
//   if (persist) {
//    $("#left-column").css({"position": "fixed"});
//    $("#right-column").css({"position": "fixed"});
//   } else {
//    $("#left-column").css({"position": "relative"}); 
//    $("#right-column").css({"position": "relative"});
//   }
// }

function updateKPList(){
 var url = _rootAPI + 'all/paper/'+_paperId+'/user/'+_username;
 var countURL = _rootAPI + 'count/paper/' + _paperId;
 $.getJSON(url, function(data) {
  var items = [];
  var sortKPs = [];
  $.each(data['response'], function(index, obj){
    sortKPs.push([obj, obj['value']]);
  });
  sortKPs.sort();
  $.each(sortKPs, function(index, kp){
    var obj = kp[0];
    items.push(renderKP(obj));
  });
  $('#kp-list').html(items.join(""));
  $('#kp-list li span.existing-kp-text').click(function(e){
    _currentKey = $(this).text();
    _currentKeyId = $(this).attr('data');
    $('#kp-list li span.existing-kp-text').removeClass('green');
    $(this).addClass('green');
    initRelatedKeys();
  });
  $('#kp-list li span.delete-text-btn').click(function(e){
    var deletingId = $(this).attr('data');
    deleteKP(deletingId);
  });
  $('#kp-user-num').text("Key Phrases (" + items.length + ")");
  if(_initMaxList){
   $('.maxlist-more').remove();
  }
  $('#kp-list').hideMaxListItems({ 'max':7, 'moreText':'more ([COUNT])', 'lessText':'less', 'speed':10 });
  _initMaxList = true;
 });
 $.getJSON(countURL, function(data){
  $('#kp-all-num').text(data['response'] + ' annotated');
 });
}

function renderKP (obj) {
  var c = 'existing-kp-text';
  if (obj['data'] == _currentKeyId){
    c += ' green';
  }
  var str = "<li><span class='"+c+"' data='" + obj['data'] + "'>";
  str+= obj['value'] + "</span> <span data='"+obj['data']+"' class='delete-text-btn'>[x]</span></li>";
  return str;
}

function addKP (key) {
 _currentKey = key;
 var url = _rootAPI + 'add/paperId/'+_paperId+'/surface/'+key+'/user/'+_username;
 $.getJSON(url, function(data){
  _currentKeyId = data['response']['id'];
  updateKPList();
  initRelatedKeys();
 });
}

function deleteKP(keyId) {
  var url = _rootAPI + 'removeKp/paper/'+_paperId+'/user/'+_username+'/kpId/'+keyId;
  $.getJSON(url, function(data){
    updateKPList();
  }); 
  if(keyId == _currentKeyId) {
    _currentKeyId = '';
    _currentKey = '';
    initRelatedKeys();
  }
}

function initRelatedKeys(){
  if(_currentKey == ''){
    $('#empty-related-kp').show();
    $('#related-kp').hide();
    return;  
  }
 var relatedURL = _rootAPI + 'findRelated/paperId/'+_paperId+'/query/'+_currentKey+'/user/'+_username;
 $.getJSON(relatedURL, function(data){
  var items = [];
  $.each(data['response'], function(index, obj){
   if (obj['relatedKp']['data'] != _currentKeyId) 
    items.push(renderRelatedKey(obj));
  });
  $('#current-kp').text(_currentKey);
  if (items.length > 0){
   $('#no-related-kp').hide();
   var info = '<span class="annotation-info">'
   info += '- Enter <b>e</b>qual, <b>p</b>arent, or <b>c</b>hild. <br />';
   info += '- Leave it <b>empty</b> for deleting annotation.</span>';
   $('#related-kp-list').html(info + items.join(''));
   setTimeout(function(){
    //wait for rendering
    initRelatedKeyAnno();
   }, 10);
   
  }else {
   $('#no-related-kp').show();
   $('#related-kp-list').html('');
  }
  $('#empty-related-kp').hide();
  $('#related-kp').show();
 });
}

function renderRelatedKey(obj){
  var c = 'related-kp-each';
  var type = obj['type'];
  if (type!='NONE'){
    c += ' related-kp-each-annotated';
  } else {
    type = '';
  }
  var str = '<div class="'+c+'">'+obj['relatedKp']['value'];
  str += '<br /><input data="'+obj['relatedKp']['data']+'"';
  str += ' class="related-kp-anno" type="text"';
  str += ' value="'+type+'" /></div>'
  return str;
}

function initRelatedKeyAnno(){
  $('.related-kp-anno').first().focus();
  $('.related-kp-anno').last().keydown(function(e){
    if(e.which==9){
      if(e.preventDefault) {
        e.preventDefault();
      }
      $('#kp-input').focus();
      return false;
    }
  });
  $('.related-kp-anno').keyup(function(e){
    var anno = $(this).val().toUpperCase();
    if(anno.length==0) return;
    if(anno.length>1) anno = anno.substr(1, 2);
    if(!(anno=='E' || anno=='C' || anno=='P')){
      anno = '';
    }
    $(this).val(anno);
    if(anno!=''){
      var relatedKPId = $(this).attr('data');
      var url = _rootAPI + 'add/paper/'+_paperId+'/user/'+_username;
      var box = $(this).parent();
      url+='/kpId/'+_currentKeyId+'/relatedKpId/'+relatedKPId+'/relType/'+anno;
      box.addClass('related-kp-each-annotating')
      $.getJSON(url, function(data){
        setTimeout(function(){
          box.removeClass('related-kp-each-annotating');
          if (anno == 'NONE'){
            box.removeClass('related-kp-each-annotated');
          } else{
            box.addClass('related-kp-each-annotated');
          }
        },200);
      });
    }
  }).blur(function(e){
    var anno = $(this).val();
    if(!(anno=='E' || anno=='C' || anno=='P' || anno=='')){
      if(e.preventDefault) {
        e.preventDefault();
      }
      $(this).val('');
      $(this).focus();
    } else{
      if (anno == '') anno = 'NONE';
      else return;
      var relatedKPId = $(this).attr('data');
      var url = _rootAPI + 'add/paper/'+_paperId+'/user/'+_username;
      var box = $(this).parent();
      url+='/kpId/'+_currentKeyId+'/relatedKpId/'+relatedKPId+'/relType/'+anno;
      box.addClass('related-kp-each-annotating')
      $.getJSON(url, function(data){
        setTimeout(function(){
          box.removeClass('related-kp-each-annotating');
          if (anno == 'NONE'){
            box.removeClass('related-kp-each-annotated');
          } else{
            box.addClass('related-kp-each-annotated');
          }
        },200);
      });
    }
  });
}

// DOM Ready      
$(function() {
 $('.paper-pdf').hide();
 $('#related-kp').hide();
 updateKPList();
 // persistent header
 var clonedHeaderRow;
 $(".persist-area").each(function() {
  clonedHeaderRow = $(".persist-header", this);
  clonedHeaderRow
  .before(clonedHeaderRow.clone())
  .css("width", clonedHeaderRow.width())
  .addClass("floatingHeader");

 });
 $(window)
 .scroll(updateHeader)
 .trigger("scroll");

 // toggle PDF/Text view
 $('#toggle-to-text').click(function(){
  $('.paper-area').show();
  $('.paper-pdf').hide();
 });
 $('#toggle-to-pdf').click(function(){
  $('.paper-area').hide();
  $('.paper-pdf').show();
 });

 // autocomplete
 $('#kp-input').autocomplete({
  serviceUrl: _rootAPI + 'find',
  onSelect: function (suggestion) {
   var e = jQuery.Event('keypress');
   e.which = 13;
   $('#kp-input').trigger(e);
  },
  deferRequestBy: 500,
  showNoSuggestionNotice: true,
  triggerSelectOnValidInput: false
 });
 $('#kp-input').keypress(function(e){
  if (e.which == 13) {
   var key = $('#kp-input').val();
   if (key == '' || key.length < 1) return;
   addKP(key);
   $('#kp-input').val('');
  }
 });

 // focus the annotation input
 $('#kp-input').focus();
});