function NewElement(TagName,Parent,Window_Op,Proties_Op) {
  var nill = undefined
  var Yo
  if (Parent == nill || Parent == null) {Parent = document.body}
  if (Window_Op !== nill) {
    Yo = Window_Op.document.createElement(TagName)
    Parent.appendChild(Yo)
  } else {
    Yo = document.createElement(TagName)
    Parent.appendChild(Yo)
  }
  if (Proties_Op !== nill && Proties_Op !== {}) {
    for (var index in Proties_Op) {
      Yo[index] = Proties_Op[index]
    }
  }
  return Yo
}

function setCookie(cname, cvalue/*, exdays*/) {
  /*const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();*/
  document.cookie = cname + "=" + cvalue +/* ";" + expires + */";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function setInnerHTML(elm, html) {
  elm.innerHTML = html;
  
  Array.from(elm.querySelectorAll("script"))
    .forEach( oldScriptEl => {
      const newScriptEl = document.createElement("script");
      
      Array.from(oldScriptEl.attributes).forEach( attr => {
        newScriptEl.setAttribute(attr.name, attr.value) 
      });
      
      const scriptText = document.createTextNode(oldScriptEl.innerHTML);
      newScriptEl.appendChild(scriptText);
      
      oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
  });
}
function Show(data,popup) {
    if (typeof(data) == 'string') {
        data = JSON.parse(data)
    }
    if (data[1] == '') {return alert('empty!')}
    var body = document.body
    if (popup) {body = popup.document.body}
    Oh = NewElement('div',body)
    Time = new Date(data[0])
    Time1 = Time.getDate()+'/'+(Time.getMonth()+1)+'/'+Time.getFullYear()
    Time2 = Time.getHours().toString().padStart(2,'0') + ':' + Time.getMinutes().toString().padStart(2, '0') + ':' + Time.getSeconds().toString().padStart(2, '0');
    //Oh.title = Time
    Oh.innerHTML = '<div title="'+Time1+'('+Time2+')">'+Time1+'</div>'
    if (data[1].match('<.+>.+<.+>') || data[1].match('<.+><.+>')) {
        NewElement('a',Oh,window,{
            //href: '#',
            title:'click to show!',
            onclick:function(e){
                e.srcElement.remove()
                setInnerHTML(Oh,Oh.innerHTML+data[1])
            },
            innerText:'Specical Content'
        })
    } else {
        setInnerHTML(Oh,Oh.innerHTML+data[1])
    }
    return Oh
}
//Show([Number(new Date()),'Oh!<script>alert("Baka!")</script>'])
if (getCookie('NhatKy') == '') {
    setCookie('NhatKy','[]')
}
Showing = JSON.parse(getCookie('NhatKy'))
for (i in Showing) {
    Show(Showing[i])
}
Create = NewElement('button',document.body,window,{
    innerText:'Tạo một cái',
    onclick:function(e) {
        Popup = open('about:blank','','directories=no,titlebar=no,toolbar=no,status=no,menubar=no,scrollbars=no')
        if (Popup !== null) {
            Create.hidden = true
            Popup.onclose = function() {
                Create.hidden = false
            }
        }
        Time = Number(new Date())
        This = NewElement('textarea',Popup.document.body,Popup)
        _3 = NewElement('div',Popup.document.body)
        NewElement('button',Popup.document.body,Popup,{
            innerText:'Tạo cho ngày hôm nay',
            onclick:function(e) {
                console.log(This.value)
                _2 = NewElement('p',Popup.document.body,Popup,{
                    innerText:'Nó sẽ như này'
                })
                Test = Show([Time,This.value],Popup)
                e.srcElement.hidden = true
                This.hidden = true
                _ = NewElement('button',Popup.document.body,Popup,{
                    innerText:'Ok luôn',
                    onclick:function(){
                        Popup.close()
                        Show([Time,This.value])
                        stor = JSON.parse(getCookie('NhatKy'))
                        console.log(stor)
                        stor[stor.length] = [Number(Time),This.value]
                        console.log(stor)
                        setCookie('NhatKy',JSON.stringify(stor))
                        location.reload()
                    }
                })
                _1 = NewElement('button',Popup.document.body,Popup,{
                    innerText:'Khoan,tutu',
                    onclick:function(){
                        _.remove()
                        _1.remove()
                        _2.remove()
                        Test.remove()
                        e.srcElement.hidden = false
                        This.hidden = false
                    }
                })
            }
        })
    }
})
