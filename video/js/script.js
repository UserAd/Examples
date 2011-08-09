var player;

$(function(){
  var params = { allowScriptAccess: "always" };
  var atts = { id: "videoinner" };
  swfobject.embedSWF("http://www.youtube.com/v/DEEgVj5fYEc?enablejsapi=1&playerapiid=videoinner", "videoinner", "640", "363", "8", null, null, params, atts);
});

function onYouTubePlayerReady(playerId) {
  player = document.getElementById("videoinner");
  player.addEventListener('onStateChange', 'Player.state_changed');
}

var Player = {
  timer: null,
  
  state_changed: function(state) {
    if (state == 5) {
      GmapVideo.init();
    } else if(state == 1) {
      this.start_timer();
    } else if((state == 2) || (state == 0)) {
      this.stop_timer();
    }
  },
  
  start_timer: function() {
    this.timer = setInterval(Player.on_timer, 500);
  },
  
  stop_timer: function() {
    clearInterval(this.timer);
  },
  
  on_timer: function() {
    var time = player.getCurrentTime();
    GmapVideo.set_position(time);
  }
  
}



var GmapVideo = {
  options: {
    points: [[55.78246060095496,37.56644818252562],[55.78253299948598,37.566791505279525],[55.776523463615696,37.57434460586546],[55.77620968729068,37.57447335189818],[55.77594418227324,37.57391545242308],[55.77589590843936,37.573271722259506],[55.775751086579035,37.572799653472885],[55.77553385277947,37.57198426193236],[55.77558212706181,37.57164093917845],[55.77572694954998,37.57142636245726]],
    center: [55.77909392069617,37.56968829101562],
    end_point: [],
    distance: 0,
    duration: 80.58,
    speed: 0
  },
  
  distances: [0],
  map: null,
  marker: null,
  
  set_position: function(time) {
    var distance = this.options.speed * time;
    var leg_distance, start_leg_point, end_leg_point, current_point, bearing;
    for(var i=0;i<this.distances.length - 1;i++) {
      if ((distance >= this.distances[i]) && (distance < this.distances[i + 1])) {
        leg_distance = distance - this.distances[i];
        start_leg_point = new LatLon(this.options.points[i][0], this.options.points[i][1]);
        end_leg_point = new LatLon(this.options.points[i + 1][0], this.options.points[i + 1][1]);
        bearing = start_leg_point.bearingTo(end_leg_point);
        current_point = start_leg_point.destinationPoint(bearing, leg_distance);
        this.marker.setPosition(new google.maps.LatLng(current_point.lat(), current_point.lon()));
      }
    }
  },
  
  draw_route: function() {
    var route = [];
    var previous_point = new LatLon(this.options.points[0][0],this.options.points[0][1]);
    var current_point;
    var distance;
    for(var i=0;i<this.options.points.length;i++) {
      route.push(new google.maps.LatLng(this.options.points[i][0], this.options.points[i][1]));
      if (i > 0) {
        current_point = new LatLon(this.options.points[i][0],this.options.points[i][1]);
        distance = parseFloat(previous_point.distanceTo(current_point));
        this.options.distance = this.options.distance + distance;
        this.distances.push(this.options.distance);
        previous_point = current_point;
      }
    }
    var routePath = new google.maps.Polyline({
        path: route
    });
    routePath.setMap(this.map);
  },
  
  init: function() {
    var center = new google.maps.LatLng(this.options.center[0], this.options.center[1]);
    console.log(this.options.center);  
    var myOptions = {
      zoom: 15,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("map"), myOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(this.options.points[0][0], this.options.points[0][1])
    });
    this.draw_route();
    this.options.speed = this.options.distance / this.options.duration; 
  }
  
};