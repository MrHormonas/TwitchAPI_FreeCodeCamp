var twitchers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

$(document).ready(function(){
    getLines ('all');
  });

$('.on').click(function(){
  $( ".on" ).toggleClass( "active" );
  $( ".search" ).val('');
  update();
});
$('.off').click(function(){
  $( ".off" ).toggleClass( "active" );
  $( ".search" ).val('');
  update();
});

var update = function(){
  if( $('.on').hasClass('active') && $('.off').hasClass('active') )
    getLines ('all');
  else if( $('.off').hasClass('active') )
    getLines ('off');
  else if( $('.on').hasClass('active') )
      getLines ('on');
  else
      getLines ('none');
};

var getLines = function(opt)
{
  $('.list').html('');
  for(var i = 0; i < twitchers.length; i++)
  {
    $.getJSON('https://api.twitch.tv/kraken/channels/' + twitchers[i] + '?callback=?', function(data) {
      console.log(data);
      if (opt == 'all' && data.status === null) //OFFLINE
        $('.list').append(getrows(data.logo, data.display_name, data.status, 'offline'));
      else if (opt == 'all' && data.status !== null) //ONLINE
        $('.list').append(getrows(data.logo, data.display_name, data.status, 'online'));
      else if (opt == 'on' &&  data.status !== null)
        $('.list').append(getrows(data.logo, data.display_name, data.status, 'online'));
      else if (opt == 'off' && data.status === null)
        $('.list').append(getrows(data.logo, data.display_name, data.status, 'offline'));
      var userList = new List('users', {valueNames: ['name']});

    });
  }
};

var getrows = function(logo, name, info, st)
{
  if (info === null)
    info = " ";
  str  =          "<tr class='" + st + "'>";
  str +=            getLogo(logo);
  str +=            "<td class='name'>" + name + "</td>";
  str +=            "<td class='info'>" + info + "</td>";
  str +=           "</tr>";
  return str;
};

var getLogo = function(lg)
{
  if ( lg !== null)
      return "<td class='logo'><img src='" + lg + "'/></td>";
  else
      return "<td class='logo'><img src='https://image.freepik.com/icones-gratis/ponto-de-interrogacao_318-52837.jpg' /></td>";

};
