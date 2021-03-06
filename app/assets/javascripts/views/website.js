HackReactor.Views.Website = Backbone.View.extend({
  template: _.template('<div class="row" data-id="<%= id %>">'+
                        '<div class="span12">'+
                          '<div class="row">'+
                            '<section id="projects">'+
                              '<div class="row">'+
                                '<div id="thumbs">'+
                                    '<div class="item-thumbs span5 design">'+
                                      '<a href="/s/<%= id %>/<%= name %>" target="_blank"><img src="./assets/<%= id * 8 %><%= name.length * 8 %>_<%= name.toLowerCase() %>.png" style: "max-height:240px;max-width:100%;width:100% !important"></a>'+
                                    '</div>'+
                                    '<div class="span7">'+
                                      '<div class="info-block">'+
                                        '<h3 class="spec" style="text-transform:capitalize;"><%= name %>'+
                                          '<small class="pull-right" style="margin-top: 15px;margin-right: 10px;">'+
                                            '<span class="color-text">Views:</span> <span class="website-view"><%= views %></span>'+
                                          '</small>'+
                                        '</h3>'+
                                        '<div class="info-text">'+
                                          '<a href="/s/<%= id %>/<%= name %>" target="_blank" ><span class="color-text"><%= url %></span></a>'+
                                          '<p><%= content %></p>'+
                                          '<div class="like-tweet">'+
                                            '<a href="https://twitter.com/share" class="twitter-share-button" data-url="<%= url %>" data-via="HackReactor" data-related="yolo" data-hashtags="HackReactor" data-dnt="true">Tweet</a>'+
                                            "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script><br>"+
                                            '<div class="fb-like" data-href="<%= url %>" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false" data-colorscheme="dark"></div><br>'+
                                            '<iframe src="http://ghbtns.com/github-btn.html?user=<%= github %>&repo=<%= github_repo %>&type=watch&count=true"allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>'+
                                          '</div>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</section>'+
                          '</div>'+
                        '</div>'+
                      '</div>'),
  initialize: function(){
    var update_image_ID = 'website.update:'+this.model.attributes.id+'';
    var update_views_ID = 'website.update:views.'+this.model.attributes.id+'';
    HackReactor.Vent.on(update_image_ID, this.reloadImage, this);
    HackReactor.Vent.on(update_views_ID, this.reloadViews, this);
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.removeIt, this);
  },
  events: {
    'click a.button': 'vote'
  },
  reloadImage:  function(message) {
    this.render();
  },
  reloadViews:  function(message) {
    console.log('==============-update-view-',message.website.views,'-============');
    var website_id = $('*[data-id="'+message.id+'"]');
    website_id.find('.website-view').text(message.website.views);
  },
  destroyIt: function() {
    this.model.destroy();
  },
  removeIt: function(){
    this.$el.remove();
  },
  updateIt: function() {
    this.model.fetch();
  },
  render: function() {
    this.$el.empty();
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
