if (Meteor.isClient) {

  var commentTimer;

  Meteor.startup(function () {
    resetRender();
  });

  Template.post.events({
    'keypress .get-comment' : function (event) {
      if(isEnter(event.keyCode)) {
        postMessage();
      }
    },
    'focus .get-comment' : function () {
      commentTimer = Meteor.setInterval(checkCommentAction, 300);
    },

    'blur .get-comment' : function () {
      Meteor.clearInterval(commentTimer);
    },

    'click .post-button' : function () {
      postMessage();
    }
  });

  var checkCommentAction = function() {
    if(isComment()) {
      okPostButton();
    } else {
      disabledPostButton();
    }
  }

  var postMessage = function() {
    if(isComment()) {
      EntryController.createEntry($('.get-comment').val());
      resetRender();
    }
  }

  var resetRender = function() {
    $('.get-comment').val('');
    disabledPostButton();
  }

  var isEnter = function(keyCode) {
    if(_.isEqual(keyCode, 13)) {
      return true;
    }
    return false;
  }

  var isComment = function() {
    if(_.isEqual($('.get-comment').val(), '')) {
      return false;
    }
    return true;
  }

  var okPostButton = function() {
    var postButton = $('.post-button');
    if(postButton.hasClass('disabled')) {
      postButton.removeClass('disabled');
      postButton.removeAttr('disabled');
    }
  }

  var disabledPostButton = function() {
    var postButton = $('.post-button');
    if(!postButton.hasClass('disabled')) {
      postButton.addClass('disabled');
      postButton.attr('disabled', 'disabled');
    }
  }

}
