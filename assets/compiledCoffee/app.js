// Generated by CoffeeScript 1.6.3
(function() {
  var form;

  $.fn.serializeObject = function() {
    var a, o;
    o = {};
    a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] != null) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        if (this.value !== '') {
          return o[this.name].push(this.value || '');
        }
      } else {
        if (this.value !== '') {
          return o[this.name] = this.value || '';
        }
      }
    });
    return o;
  };

  form = $('form').serializeArray();

  $(form).each(function() {
    return console.log([this.name]);
  });

}).call(this);
