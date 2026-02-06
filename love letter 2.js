$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var evasiveBtns = $(".no-btn");

  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
  }
  function close() {
    envelope.addClass("close").removeClass("open");
  }

  // Make any button with `.no-btn` evade the cursor
  var threshold = 140; // pixels
  var maxShift = 160; // maximum distance to move (px)

  // Prevent actual clicking of the no buttons
  evasiveBtns.on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  });

  $(document).on('mousemove', function (e) {
    if (!evasiveBtns.length) return;
    evasiveBtns.each(function () {
      var $btn = $(this);
      var rect = this.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < threshold) {
        var strength = (1 - dist / threshold);
        var shift = Math.max(40, strength * maxShift);
        var nx = -dx / (dist || 1);
        var ny = -dy / (dist || 1);
        var tx = Math.round(nx * shift);
        var ty = Math.round(ny * shift * 0.35);
        $btn.css('transform', 'translate(' + tx + 'px,' + ty + 'px)');
      } else {
        $btn.css('transform', '');
      }
    });
  });
});
