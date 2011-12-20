class window.FlagDetector
  constructor: (@context, @canvas) ->
    @image_data = @context.getImageData(0, 0, 72, 72)
    @accuracy = 9
    @sensivity = 25
  
  search: () ->
    @grayscale(@image_data)
    @filter(249)
    @filter(30)
    @filter(74)
    @black()
    for i in [0..10]
      @denoise()
    @image_data

  grayscale: () ->
    for x in [0..@image_data.width]
      for y in [0..@image_data.height]
        i = x*4+y*4*@image_data.width
        luma = Math.floor(@image_data.data[i] * 299/1000 + @image_data.data[i+1] * 587/1000 + @image_data.data[i+2] * 114/1000)
        @image_data.data[i] = luma
        @image_data.data[i+1] = luma
        @image_data.data[i+2] = luma
        @image_data.data[i+3] = 255
    @image_data

  filter: (colour) ->
    for x in [0..@image_data.width]
      for y in [0..@image_data.height]
        i = x*4+y*4*@image_data.width
        if Math.abs(@image_data.data[i] - colour) < @accuracy
          @image_data.data[i] = 255
          @image_data.data[i+1] = 255
          @image_data.data[i+2] = 255
    @image_data
  
  black: () ->
    for x in [0..@image_data.width]
      for y in [0..@image_data.height]
        i = x*4+y*4*@image_data.width
        if @image_data.data[i] != 255
          @image_data.data[i] = 0
          @image_data.data[i+1] = 0
          @image_data.data[i+2] = 0
    @image_data
          
          
  denoise: () ->
    for x in [0..@image_data.width]
      for y in [0..@image_data.height]
        i = x*4+y*4*@image_data.width
        above = x*4+(y-1)*4*@image_data.width
        below = x*4+(y+1)*4*@image_data.width
        up = (x-1)*4+y*4*@image_data.width
        down = (x+1)*4+y*4*@image_data.width
        if @image_data.data[i] == 255 && ((@image_data.data[above] == 0 && @image_data.data[below] == 0) || (@image_data.data[up] == 0 && @image_data.data[down] == 0))
          @image_data.data[i] = 0
          @image_data.data[i+1] = 0
          @image_data.data[i+2] = 0
    @image_data
    
  find: () ->
    result = false
    white_blocks = 0
    for x in [0..(@image_data.width / 6 - 1)]
      for y in [0..(@image_data.height / 6 - 1)]
        whites = 0
        for x1 in [x*6..(x*6+6)]
          for y1 in [y*6..(y*6+6)]
            i = x1*4+y1*4*@image_data.width
            if @image_data.data[i] == 255
              whites += 1
        white_blocks += 1 if whites > @sensivity
    white_blocks / 36
            
        
        
      