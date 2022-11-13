let flag=0;
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
	alert("Changed")
    }
});
document.getElementById("but1").click();
const colorpicker = document.getElementById('inputcol');
colorpicker.addEventListener('input', ()=>{pic();});
const inpt1 = document.getElementById('11');
inpt1.addEventListener('input', ()=>{ document.getElementById("but1").click();});
const inpt2 = document.getElementById('12');
inpt2.addEventListener('input', ()=>{ document.getElementById("but1").click();});
const inpt3 = document.getElementById('13');
inpt3.addEventListener('input', ()=>{ document.getElementById("but1").click();});
const inpt4 = document.getElementById('14');
inpt4.addEventListener('input', ()=>{ document.getElementById("but1").click();});
function check(a){
    if(a[a.length-1]=="%") return a.substring(0, a.length - 1);
    else if(isNaN(a)) return 0;
    else return a;
}
function getval(){
    let arr = [];
    var select = document.getElementById("sel");
    let cs = select.value;
    document.getElementById("RGB").classList.remove('hide');
    document.getElementById("CMYK").classList.remove('hide');
    document.getElementById("HSV").classList.remove('hide');
    document.getElementById(cs).classList.add('hide');
    if(cs!="CMYK" && document.getElementById(cs).classList.contains('hide')) document.getElementById("14").classList.add('hide');
    else if(cs=="CMYK") document.getElementById("14").classList.remove('hide');
    if(cs=="CMYK" && !document.getElementById("15").classList.contains('hide')){
        document.getElementById("15").classList.add('hide');
        document.getElementById("16").classList.remove('hide');
    }
    
    if(cs!="CMYK" && document.getElementById("15").classList.contains('hide')){
        document.getElementById("15").classList.remove('hide');
        document.getElementById("16").classList.add('hide');
    }
    for(var i=1;i<11;i++){
        arr[i-1]=check(document.getElementById(i).value);
    }
    if(cs=="RGB"){
        document.getElementById('11').value=arr[0];
        document.getElementById('12').value=arr[1];
        document.getElementById('13').value=arr[2];
    }
    if(cs=="CMYK"){
        document.getElementById('11').value=arr[3];
        document.getElementById('12').value=arr[4];
        document.getElementById('13').value=arr[5];
        document.getElementById('14').value=arr[6];
    }
    if(cs=="HSV"){
        document.getElementById('11').value=arr[7];
        document.getElementById('12').value=arr[8];
        document.getElementById('13').value=arr[9];
        document.getElementById("15").classList.add('hide');
        document.getElementById("16").classList.remove('hide');
    }
    for(var i=1;i<11;i++) document.getElementById(i).value="";
    document.getElementById("but1").click();
}
function rgb2hex(r, g, b) {
    r=parseInt(r);
    g=parseInt(g);
    b=parseInt(b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
function frgb(r,g,b){
    document.getElementById('but1').style.borderColor=rgb2hex(r,g,b);
    document.getElementById('15').value=(rgb2hex(r,g,b)).toUpperCase();
    document.getElementById('16').value=(rgb2hex(r,g,b)).toUpperCase();
    var cs= document.getElementById('sel').value;
    //filRGB
    document.getElementById('1').value=Math.round(check(r));
    document.getElementById('2').value=Math.round(check(g));
    document.getElementById('3').value=Math.round(check(b));
    if(cs=="RGB" && flag==1){
        document.getElementById('11').value=Math.round(check(r));
        document.getElementById('12').value=Math.round(check(g));
        document.getElementById('13').value=Math.round(check(b));
     }
    document.getElementById('inputcol').value = rgb2hex(r,g,b);
    document.getElementById('sel').style.borderColor=rgb2hex(r,g,b);
    //rgb2cmyk
    r=r/255; g=g/255; b=b/255;
    var k=1-Math.max(r,g,b);
    document.getElementById('7').value=(check(k)*100).toFixed(1)+"%";
    var c=(1-r-k)/(1-k);
    document.getElementById('4').value=(check(c)*100).toFixed(1)+"%";
    var m=(1-g-k)/(1-k);
    document.getElementById('5').value=(check(m)*100).toFixed(1)+"%";
    var y=(1-b-k)/(1-k);
    document.getElementById('6').value=(check(y)*100).toFixed(1)+"%";
    if(cs=="CMYK" && flag==1){
        document.getElementById('11').value=(check(c)*100).toFixed(1)
        document.getElementById('12').value=(check(m)*100).toFixed(1)
        document.getElementById('13').value=(check(y)*100).toFixed(1)
        document.getElementById('14').value=(check(k)*100).toFixed(1)
     }
    //rgb2hsv
    var h = 0;
    var s = 0;
    var v = 0;
    var minRGB = Math.min(r,g,b);
    var maxRGB = Math.max(r,g,b);
   
    if (minRGB==maxRGB) {
     v = minRGB;
     document.getElementById('8').value=(0*100).toFixed(1);
     document.getElementById('9').value=(0*100).toFixed(1)+"%";
     document.getElementById('10').value=(check(v)*100).toFixed(1)+"%";
    }
   
    var d,h;
    if(r==minRGB) d=g-b;
    else if(b==minRGB) d=r-g;
    else d=b-r;
    if(r==minRGB)  h=3;
    else if(b==minRGB) h=1
    else h=5;
    h = 60*(h - d/(maxRGB - minRGB));
    s = (maxRGB - minRGB)/maxRGB;
    v = maxRGB;
    document.getElementById('8').value=(check(h)).toFixed(1);
     document.getElementById('9').value=(check(s)*100).toFixed(1)+"%";
     document.getElementById('10').value=(check(v)*100).toFixed(1)+"%";
     if(cs=="HSV" && flag==1){
        document.getElementById('11').value=(check(h)).toFixed(1);
        document.getElementById('12').value=(check(s)*100).toFixed(1);
        document.getElementById('13').value=(check(v)*100).toFixed(1)
     }
     flag=0;
}
function hex2rgb(h) {
    document.getElementById('sel').style.borderColor=h;
    let r = 0, g = 0, b = 0;
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    frgb(r,g,b);
  }
function pic(){
    flag=1;
    hex2rgb(document.getElementById('inputcol').value);
    
}
function cal(){
    var select = document.getElementById("sel");
    var value = select.value;
    if(value=="RGB"){
        var r=document.getElementById('11').value,g=document.getElementById('12').value,b=document.getElementById('13').value;
        if(Math.max(r,g,b)<=255 && Math.min(r,g,b)>=0) frgb(r,g,b);
        else alert("Bad data");
    }
    else if(value=="CMYK"){
        var c=document.getElementById('11').value/100,m=document.getElementById('12').value/100,y=document.getElementById('13').value/100,k=document.getElementById('14').value/100;
        if(Math.max(c,m,y,k)<=1 && Math.min(c,m,y,k)>=0){
            var r=255*(1-c)*(1-k);
            var g=255*(1-m)*(1-k);
            var b=255*(1-y)*(1-k);
            frgb(r,g,b);
        }
        else alert("Bad data");
    }
    else if(value=="HSV"){
        var h=document.getElementById('11').value,s=document.getElementById('12').value/100,v=document.getElementById('13').value/100;
        if(h>=0 && h<=360 && Math.max(s,v)<=1 && Math.min(s,v)>=0){
            var k = (n) => (n + h / 60) % 6;
            var f = (n) => v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
            frgb(255 * f(5), 255 * f(3), 255 * f(1));
        }
        else alert("Bad data");
    }
}
