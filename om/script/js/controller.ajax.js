    //Nav bar position
    $('#toggleNavPosition').click(function() {
      $('body').toggleClass('fixed-nav');
      $('nav').toggleClass('fixed-top static-top');
    });

    //Navbar Color
    $('#toggleNavColor').click(function() {
      $('nav').toggleClass('navbar-dark navbar-light');
      $('nav').toggleClass('bg-dark bg-light');
      $('body').toggleClass('bg-dark bg-light');
    });

    //Nav Bar VBiew
    $("#navbarbtn").click(function(){
        $.post("php/navbar.ajax.php",function(data) {$("#navbarview").html(data); });     
        $('#navbarview').removeAttr('hidden');
        $('#tablebtn').attr('hidden','true');
        $('#dashboardview').attr('hidden','true');
    });
    
    //Table Show
    $("#tablebtn").click(function(){
        $.post("php/tables.ajax.php",function(data) {$("#tableview").html(data); });
        $('#tableview').removeAttr('hidden');
        $('#navbarview').attr('hidden','true');
        $('#dashboardview').attr('hidden','true');
    }); //table display end
    


function logview(ipadd, hostname) {

var width = 800;
var height = 500;
var left = (screen.width*.5) - (width*.5);
var top = (screen.height*.5) - (height*.5);    
    
currentip = ipadd;

switch (currentip)
{
        
//Marvin
//Vlan 33
case "33":
	link = "//172.16.33.242/omph/Sky/IT/33/"+hostname;
break;

//Vlan 35
case "35":
	link = "//172.16.33.242/omph/Sky/IT/35/"+hostname;
break;

//Vlan 37
case "37":
	link = "//172.16.33.242/omph/Sky/IT/37/"+hostname;
break;

//Vlan 39
case "39":
	link = "//172.16.33.242/omph/Sky/IT/39/"+hostname;
break;

//6789
//Vlan 62
case "62":
	link = "//172.16.60.60/6789$/Sky/62/"+hostname;
break;

///Vlan 63
case "63":
	link = "//172.16.60.60/6789$/Sky/63/SEO/"+hostname;
break;        

//Vlan 64
case "64":
	link = "//172.16.60.60/6789$/Sky/78&64/TM&BD/"+hostname;
break;        

//Vlan 68
case "68":
	link = "//172.16.60.60/6789$/Sky/68/"+hostname;
break;        

//Vlan 73
case "73":
	link = "//172.16.60.60/6789$/Sky/73/"+hostname;
break;        

//Vlan 75
case "75":
	link = "//172.16.60.60/6789$/Sky/75/"+hostname;
break;        

//Vlan 76
case "76":
	link = "//172.16.60.60/6789$/Sky/76/"+hostname;
break;        
 
//Vlan 78
case "78":
	link = "//172.16.60.60/6789$/Sky/78&64/TM&BD/"+hostname;
break;
        
//PBCOM
//Vlan 11
case "11":
	link = "//172.16.17.2/Software/Sky/11/"+hostname;
break;
//Vlan 11
case "12":
	link = "//172.16.17.2/Software/Sky/12/"+hostname;
break;
//Vlan 11
case "14":
	link = "//172.16.17.2/Software/Sky/14/"+hostname;
break;
//Vlan 11
case "15":
	link = "//172.16.17.2/Software/Sky/15"+hostname;
break;
//Vlan 11
case "17":
	link = "//172.16.17.2/Software/Sky/17/"+hostname;
break;

        
//Default Link
default:
	link = "Not Available";
}
    

    $.post("php/encode.ajax.php",{data:link},function(data) {encodeddata = data;});
    
    var myWindow = window.open("./fileviewer/.index.php?data="+encodeddata,"Log View of"+hostname, "toolbar=no,scrollbars=yes,resizable=no,top="+ top +",left="+ left +",width="+width+",height="+height);
    //myWindow.document.write("<a href=\""+link+"\">Click Here to Open </a><p>Please wait, File is loading. <br>If this did not redirect after a few seconds<br> please check the shared folder if the file <strong>does exist</strong><br><br> Path: " + myWindow.name + "</p>"+encodeddata);
    //window.open("", "_blank");

    link = "";
    encodeddata = "";
  
}