MEME = {
  $: jQuery,


  render: function() {
    this.canvas && this.canvas.render();
  },

  scrapeCallback: function(data,status,xhr) { // check arguments for JQuery Ajax callback
    // do something to parse data
    // make an object
    obj = {
     "headlineText": "",
     }
    this.model.bulkUpdate(obj);
  },
  init: function() {
    this.model = new this.MemeModel(window.MEME_SETTINGS || {});

    // Create renderer view:
    this.canvas = new this.MemeCanvasView({
      el: '#meme-canvas-view',
      model: this.model
    });

    // Create editor view:
    this.editor = new this.MemeEditorView({
      el: '#meme-editor-view',
      model: this.model
    });

    // Re-render view after all fonts load:
    this.waitForFonts().then(function() {
      MEME.render();
    });
    this.scrapeCallback("hello");
  }
};

MEME.$(function() {
  MEME.init();
});

