
  window.FlagDetector = (function() {

    function FlagDetector(context, canvas) {
      this.context = context;
      this.canvas = canvas;
      this.image_data = this.context.getImageData(0, 0, 72, 72);
      this.accuracy = 9;
      this.sensivity = 25;
    }

    FlagDetector.prototype.search = function() {
      var i;
      this.grayscale(this.image_data);
      this.filter(249);
      this.filter(30);
      this.filter(74);
      this.black();
      for (i = 0; i <= 10; i++) {
        this.denoise();
      }
      return this.image_data;
    };

    FlagDetector.prototype.grayscale = function() {
      var i, luma, x, y, _ref, _ref2;
      for (x = 0, _ref = this.image_data.width; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.image_data.height; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          i = x * 4 + y * 4 * this.image_data.width;
          luma = Math.floor(this.image_data.data[i] * 299 / 1000 + this.image_data.data[i + 1] * 587 / 1000 + this.image_data.data[i + 2] * 114 / 1000);
          this.image_data.data[i] = luma;
          this.image_data.data[i + 1] = luma;
          this.image_data.data[i + 2] = luma;
          this.image_data.data[i + 3] = 255;
        }
      }
      return this.image_data;
    };

    FlagDetector.prototype.filter = function(colour) {
      var i, x, y, _ref, _ref2;
      for (x = 0, _ref = this.image_data.width; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.image_data.height; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          i = x * 4 + y * 4 * this.image_data.width;
          if (Math.abs(this.image_data.data[i] - colour) < this.accuracy) {
            this.image_data.data[i] = 255;
            this.image_data.data[i + 1] = 255;
            this.image_data.data[i + 2] = 255;
          }
        }
      }
      return this.image_data;
    };

    FlagDetector.prototype.black = function() {
      var i, x, y, _ref, _ref2;
      for (x = 0, _ref = this.image_data.width; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.image_data.height; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          i = x * 4 + y * 4 * this.image_data.width;
          if (this.image_data.data[i] !== 255) {
            this.image_data.data[i] = 0;
            this.image_data.data[i + 1] = 0;
            this.image_data.data[i + 2] = 0;
          }
        }
      }
      return this.image_data;
    };

    FlagDetector.prototype.denoise = function() {
      var above, below, down, i, up, x, y, _ref, _ref2;
      for (x = 0, _ref = this.image_data.width; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.image_data.height; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          i = x * 4 + y * 4 * this.image_data.width;
          above = x * 4 + (y - 1) * 4 * this.image_data.width;
          below = x * 4 + (y + 1) * 4 * this.image_data.width;
          up = (x - 1) * 4 + y * 4 * this.image_data.width;
          down = (x + 1) * 4 + y * 4 * this.image_data.width;
          if (this.image_data.data[i] === 255 && ((this.image_data.data[above] === 0 && this.image_data.data[below] === 0) || (this.image_data.data[up] === 0 && this.image_data.data[down] === 0))) {
            this.image_data.data[i] = 0;
            this.image_data.data[i + 1] = 0;
            this.image_data.data[i + 2] = 0;
          }
        }
      }
      return this.image_data;
    };

    FlagDetector.prototype.find = function() {
      var i, result, white_blocks, whites, x, x1, y, y1, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
      result = false;
      white_blocks = 0;
      for (x = 0, _ref = this.image_data.width / 6 - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.image_data.height / 6 - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          whites = 0;
          for (x1 = _ref3 = x * 6, _ref4 = x * 6 + 6; _ref3 <= _ref4 ? x1 <= _ref4 : x1 >= _ref4; _ref3 <= _ref4 ? x1++ : x1--) {
            for (y1 = _ref5 = y * 6, _ref6 = y * 6 + 6; _ref5 <= _ref6 ? y1 <= _ref6 : y1 >= _ref6; _ref5 <= _ref6 ? y1++ : y1--) {
              i = x1 * 4 + y1 * 4 * this.image_data.width;
              if (this.image_data.data[i] === 255) whites += 1;
            }
          }
          if (whites > this.sensivity) white_blocks += 1;
        }
      }
      return white_blocks / 36;
    };

    return FlagDetector;

  })();
