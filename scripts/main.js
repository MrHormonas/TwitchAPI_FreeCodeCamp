var twitchers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var str = "";

$(document).ready(function(){
    getLines ('all');
});

$('.all').click(function()
{
  if( !$('.all').hasClass('active') )
  {
    getLines ('all');
    $('.tw').html('');
    $('.on').removeClass('active');
    $('.off').removeClass('active');
    $('.all').addClass('active');
  }
});

$('.on').click(function(){
  if( !$('.on').hasClass('active') )
  {
    getLines('on');
    $('.tw').html('');
    $('.all').removeClass('active');
    $('.off').removeClass('active');
    $('.on').addClass('active');
  }
});

$('.off').click(function(){
  if( !$('.off').hasClass('active') )
  {
    getLines('off');
    $('.tw').html('');
    $('.all').removeClass('active');
    $('.on').removeClass('active');
    $('.off').addClass('active');
  }
});



var getLines = function(opt)
{
  for(var i = 0; i < twitchers.length; i++)
  {
    $.getJSON('https://api.twitch.tv/kraken/channels/' + twitchers[i] + '?callback=?', function(data) {
      console.log(data);
      if (opt == 'all')
      {
        str  = "<tr><a href='" + data.url + "'>";
        str += getLogo(data.logo);
        str += "<td colspan='4' class= 'name'>" + data.display_name + "</td>";
        if (data.status === null)
          str += "<td colspan='1'></td><td colspan='1'>OFFLINE</td></a></tr>";
        else
          str += "<td colspan='1'>" +  data.status + "</td><td colspan='1'>ONLINE</td></a></tr>";
        $('.tw').append(str);
      }

      else if (opt == 'on' &&  data.status !== null)
      {
        str  = "<tr><a href='" + data.url + "'>";
        str += getLogo(data.logo);
        str += "<td colspan='6' class= 'name'>" + data.display_name + "</td></a></tr>";
        $('.tw').append(str);
      }
      else if (opt == 'off' && data.status === null)
      {
        str  = "<tr><a href='" + data.url + "'>";
        str += getLogo(data.logo);
        str += "<td colspan='6' class= 'name'>" + data.display_name + "</td></a></tr>";
        $('.tw').append(str);
      }
    });
  }
};

var getLogo = function(lg)
{
  if ( lg !== null)
      return "<td colspan='1' class='logo'><img src='" + lg + "'/></td>";
  else
      return "<td colspan='1' class='logo'><img src='https://image.freepik.com/icones-gratis/ponto-de-interrogacao_318-52837.jpg' /></td>";

};
