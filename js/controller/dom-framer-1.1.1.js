/* Created By John Melvin Gusago*/
/* Generate Using DOM */
/* Version 1.1.1*/

//Card
function createCard(value, parent, classes, attribute){

    var card = document.createElement("div");
    card.classList.add("card");
    parent.appendChild(card);
    //Add Class
    for (var i = 0; i < classes.length; i++){
        card.classList.add(classes[i]);
    }
    //Add Attribute
    for (var j = 0; j < attribute.length; j++){
        set = attribute[j].split(":");
        card.setAttribute(set[0],set[1]);
    }
    var cardheader = document.createElement("div");
    cardheader.classList.add("card-header");
    card.appendChild(cardheader);

    var cardbody = document.createElement("div");
    cardbody.classList.add("card-body");
    card.appendChild(cardbody);

    cardfooter = document.createElement("div");
    cardfooter.classList.add("card-footer");
    cardfooter.classList.add("small");
    cardfooter.classList.add("text-muted");
    card.appendChild(cardfooter);

    value.card = card;
    value.head = cardheader;
    value.body = cardbody;
    value.foot = cardfooter;
}

// Table
function createTable(value, parent, classes, attribute){

    tablediv = document.createElement("div");
    tablediv.classList.add("table-responsive")
    parent.appendChild(tablediv);

    table = document.createElement("table");
    //adding Class
    for (var i = 0; i < classes.length; i++){
        table.classList.add(classes[i]);
    }

    //adding attributes
    for (var j = 0; j < attribute.length; j++){
        set = attribute[j].split(":");
        table.setAttribute(set[0],set[1]);
    }
    tablediv.appendChild(table);

    tbody = document.createElement("tbody");
    tbody.setAttribute("role","row");
    thead = document.createElement("thead");
    thead.setAttribute("role","row");
    tfoot = document.createElement("tfoot");
    tfoot.setAttribute("role","row");

    table.appendChild(tbody);
    table.appendChild(thead);
    table.appendChild(tfoot);

    value.table = table;
    value.head = thead;
    value.body = tbody;
    value.foot = tfoot;

}

// createTableContent(-Retun Value-,-Parent Element-,-Classes to be added-,-Attribute to be Added-,-Element-,-data to be added-)
function createTableContent(value, parent, classes, attribute, element, data){

    var tr = document.createElement("tr");
    tr.setAttribute("role","row");
    parent.appendChild(tr)

    for (var i = 0; i < classes.length; i++){
        tr.classList.add(classes[i]);
    }
    for (var j = 0; j < attribute.length; j++){
        set = attribute[j].split(":");
        tr.setAttribute(set[0],set[1]);
    }

    for (var l = 0; l < data.length; l++){
        var dt = document.createElement(element);
        tr.appendChild(dt);

        var newelement = data[l].split("`");
        if (newelement.length > 1){
          var newvalue = [];
          neweclasses = newelement[1].split("~");
          neweattribs = newelement[2].split("~");
          createnewElement(newvalue, dt, newelement[0], neweclasses, neweattribs, newelement[3]);
        }
        else{
        var minidata = data[l].split("~");
        if (minidata.length > 1){
            for (var m = 0; m < minidata.length; m++){
                var minitr = document.createElement("tr");
                dt.appendChild(minitr);
                var node = document.createTextNode(minidata[m]);
                minitr.appendChild(node);
            }
        }
        else{
            var node = document.createTextNode(data[l]);
            dt.appendChild(node);

        }//Closing of minidata IF function
      }//Closing of ELement IF function

    }

    value.tr = tr;
}
//Pagination Trigger
function pagination(id){
    var set = setInterval(function(){
    key = document.getElementById(id);
    if (!key) {
      var text = document.createTextNode(key+"-none ");
      //id.appendChild(text);
    }
    else {
       $("#"+id).DataTable(
         {
           dom: "<'row'<'col-sm-12 col-md-12 d-flex flex-row-reverse'B>>"+
                "<'row mt-2'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>"+
                "<'row'<'col-sm-12'tr>>"+
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
           "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
           buttons: [
             'copyHtml5',
             'excelHtml5',
             'csvHtml5',
             'pdfHtml5',
     ],
         }
       );
       clearInterval(set);
    }

}, 500);
}
function idgenerator(){
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

//Create a list
function createList(value, parent, listtype, length, ulclass, ulattribute){
  var lilist = [];
  var ul = document.createElement(listtype);
  parent.appendChild(ul);
  //add Classes
  for (var i = 0; i < ulclass.length; i++){
    ul.classList.add(ulclass[i]);
  }
  //add Attribute
  for (var j = 0; j < ulattribute.length; j++){
    var attrib = ulattribute[j].split(":");
    ul.setAttribute(attrib[0],attrib[1]);
  }
  for (var k = 0; k < length; k++){
    var li = document.createElement("li");
    ul.appendChild(li);5
    lilist.push(li);
  }

  value.ul = ul;
  value.li = lilist;

}
//Create OnClick link
function createLink(value, parent, data, classes, attributes){

  var link = document.createElement("a");
  parent.appendChild(link);
  //add text
  var textnode = document.createTextNode(data);
  link.appendChild(textnode);
  //add Classs
  for (var i = 0; i <  classes.length; i++){
    link.classList.add(classes[i]);
  }
  //add attributes
  for (var j = 0; j < attributes.length; j++){
    var attrib = attributes[j].split(":");
    link.setAttribute(attrib[0],attrib[1]);
  }

  value.link = link;
}

//Onclick Function creator
function createOnClick(value, onclickfunction, list){

  for (var  i = 0; i < list.length; i++){
    newlist.push(onclickfunction+"("+list[i]+")");
  }

  value.list = newlist;

}

function createnewElement(value, parent, element, classes, attribute, data){
  var newelement = document.createElement(element);
  for (var i = 0; i < classes.length; i++){
    newelement.classList.add(classes[i]);
  }
  for (var j = 0; j < attribute.length; j++){
    attrib = attribute[j].split(":");
    newelement.setAttribute(attrib[0],attrib[1]);
  }
  newnode = document.createTextNode(data);
  newelement.appendChild(newnode);
  parent.appendChild(newelement);

  value.newelement = newelement;

}
// Return Value Array, Parent Element, Classes in Array, Attributes, element option list
function createSelection(value, parent, classes, attribute, data){
  var selection = document.createElement("select");
  for (var i = 0; i < classes.length; i++){
    selection.classList.add(classes[i]);
  }
  for (var j = 0; j < attribute.length; j++){
    attrib = attribute[j].split(":");
    selection.setAttribute(attrib[0],attrib[1]);
  }
  for (var k = 0; k < data.length; k++){
    newdata = data[k].split(":");
    option = document.createElement("option");
    option.setAttribute("name",newdata[0]);
    optionnode = document.createTextNode(newdata[1]);
    option.appendChild(optionnode);
    selection.appendChild(option);
  }
  parent.appendChild(selection);
  value.select = selection;
}
