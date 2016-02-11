var twitchers = ["comster404", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];
$(document).ready(function(){
    getLines ('all');
  });

$('.on').click(function(){
  $( ".on" ).toggleClass( "active" );
  $( "#search" ).val('');
  update();
});
$('.off').click(function(){
  $( ".off" ).toggleClass( "active" );
  $( "#search" ).val('');
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
    url = 'https://api.twitch.tv/kraken/channels/' + twitchers[i] + '?callback=?';
    on ='';
    off='';
    none='';
    $.when(
      $.getJSON(url),
      $.getJSON(url.replace('channels', 'streams'))
    ).done(function(data, data2) {
      console.log(data2[0]);
      if (opt == 'all' && data[0].display_name === undefined) //username don't exist / account eliminated
        $('.list_none').append(getrows("", data[0].message.split("\'")[1], "Account don't exist/eliminated", 'error'));
      else if (opt == 'all' && data2[0].stream === null) //OFFLINE
        $('.list_off').append(getrows(data[0].logo, data[0].display_name, " ", 'offline'));
      else if (opt == 'all' && data[0].status !== null) //ONLINE
        $('.list_on').append(getrows(data[0].logo, data[0].display_name, data2[0].stream.game, 'online'));
      else if (opt == 'on' &&  data2[0].stream !== null &&  data2[0].stream !== undefined)
        $('.list_on').append(getrows(data[0].logo, data[0].display_name, data2[0].stream.game, 'online'));
      else if (opt == 'off' && data2[0].stream === null)
        $('.list_off').append(getrows(data[0].logo, data[0].display_name, " ", 'offline'));
      else if (opt == 'none')
        $('.list').append('');
    });
    $('.list').append(on + off + none);
  }
};

var getrows = function(logo, name, info, st)
{
  if (info === null)
    info = " ";
  link = "http://www.twitch.tv/" + name;
  if (st == 'error')
    link = "#";

  str  =          "<tr class='" + st + "'>";
  str +=            getLogo(logo);
  str +=            "<td class='name'><a href='" + link + "' target='_blank'>" + name + "</a></td>";
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


$('#search').keyup(function () {
      var searchitem = $('#search').val();
      if (searchitem === '' || searchitem === null || searchitem === undefined)           {
          $('table tbody  tr').show();
      }
      else {
          searchitem = searchitem.toUpperCase();
          $('table tbody tr').hide();
          $('table tbody tr').each(function () {
              if ($(this).children('td').slice(1, 2).text().toUpperCase().indexOf(searchitem) > -1) {
                  $(this).show();
              }
          });
      }
  });
