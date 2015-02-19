(function() {
  'use strict';

  var uuid, avatar, color, logo;

  var randomColor = function() {
      var colors = ['navy', 'slate', 'olive', 'moss', 'chocolate', 'buttercup', 'maroon', 'cerise', 'plum', 'orchid'];
      return colors[(Math.random() * colors.length) >>> 0];
  };

  var randomLogo = function() {
      var logos = ['bugs', 'gooby', 'dolan'];
      return logos[(Math.random() * logos.length) >>> 0];
  };

  color = randomColor();
  logo = randomLogo();
  uuid = color + '-' + logo;
  avatar = 'images/' + logo + '.jpg';

  function showNewest() {
    var chatDiv = document.querySelector('.chat-list');
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }

  var template = document.querySelector('template[is=auto-binding]');

  template.channel = 'polymer-chat';
  template.uuid = uuid;
  template.avatar = avatar;
  template.color = color;

  template.items = [
    {title: 'Firebase', icon: 'cloud'},
    {title: 'Polymer', icon: 'polymer'}
  ];

  template.checkKey = function(e) {
    if(e.keyCode === 13 || e.charCode === 13) {
      template.publish();
    }
  };

  template.sendMyMessage = function(e) {
    template.publish();
  };

  template.publish = function() {
    if(!template.input) return;
    template.$.base.push({
      uuid: uuid,
      avatar: avatar,
      color: color,
      text: template.input,
      timestamp: Date.now()
    });
    template.input = '';
  };

  template.subscribeCallback = function(e) {
    template.async(showNewest);
  };

})();
