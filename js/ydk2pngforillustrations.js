var
    fileInput = document.getElementById('file'),
    // info = document.getElementById('test-file-info'),
    preview = document.getElementById('preview'),
    mainpreview = document.getElementById('main-preview'),
    extrapreview = document.getElementById('extra-preview'),
    sidepreview = document.getElementById('side-preview');
deckinfo = document.getElementById('deckinfo');
ad = document.getElementById('ad');

function match(){
    // 获取比赛信息:
    var
        matchinfo = document.getElementById('matchinfo'),
        playerinfo = document.getElementById('playerinfo'),
        ad_input = document.getElementById('ad_input');

}
// 监听change事件:
fileInput.addEventListener('change', function ()
{
    document.getElementById('canvas').style.display = "none";
    document.getElementById('preview').style.display = "block";
    // 获取File引用:
    var file = fileInput.files[0];
    // 获取File信息:
    var filename = file.name.substring(0,file.name.lastIndexOf("."));
    // info.innerHTML = '文件: ' + filename + '<br/>' ;
    var reader = new FileReader();
    //将文件以文本形式读入页面
    reader.readAsBinaryString(file);
    reader.onload=function(f)
    {
        //显示文件
        var str=this.result;
        var str2= new Array();
        var deck= new Array(); //定义卡组
        var main= new Array(); //定义主卡
        var extra= new Array(); //定义额外
        var side= new Array(); //定义side
        deck=str.split("\r\n");//得到卡组数组
        if(deck.length<5){deck=str.split("\n");}
        //清除#main前面的内容
        for(var i=0;i<deck.length;i++)
        {
            if(deck[i].search("#main")!=-1){deck.splice(0,i+1);i=-1;}
        }

        for(var i=0;i<deck.length;i++)
        {
            if(deck[i].length == 0){deck.splice(i,1);i=-1;}
        }
        //给main赋值
        for(var i=0;i<deck.length;i++)
        {
            if(deck[i].search("#extra")!=-1){deck.splice(0,i+1);break;}
            main[i]="<li style='background-image: url(./pics/"+deck[i]+".png);'></li>";
        }
        //给extra赋值
        for(var i=0;i<deck.length;i++)
        {
            if(deck[i].search("!side")!=-1){deck.splice(0,i+1);break;}
            extra[i]="<li style='background-image: url(./pics/"+deck[i]+".png);'></li>";
        }
        //给side赋值
        for(var i=0;i<deck.length;i++)
        {
            side[i]="<li style='background-image: url(./pics/"+deck[i]+".png);'></li>";
        }
        // var mainhtml,extrahtml,sidehtml;
        var mainhtml;
        var myDate = new Date();
        if(matchinfo.value==""){matchinfo.value=filename}
        mainhtml="<span style='text-align:center;float: left;font-size:50px'>"+matchinfo.value+(main.length+extra.length+side.length)+"张"+myDate.toLocaleDateString()+"</span><ul>";
        for(var i=0;i<main.length;i++)
        {
            mainhtml+=main[i];
        }
        // mainhtml+="</ul>";
        // extrahtml="<span>额外卡组"+extra.length+"张</span><ul>";
        for(var i=0;i<extra.length;i++)
        {
            mainhtml+=extra[i];
        }
        // extrahtml+="</ul>";
        // sidehtml="<span>副卡组"+side.length+"张</span><ul>";
        for(var i=0;i<side.length;i++)
        {
            mainhtml+=side[i];
        }
        mainhtml+="</ul>";
        mainpreview.innerHTML=mainhtml;
        // extrapreview.innerHTML=extrahtml;
        // sidepreview.innerHTML=sidehtml;
        // if(matchinfo.value==""&&playerinfo.value==""){matchinfo.value=filename}
        // if(ad_input.value==""){ad_input.value='Speed Dueling'}
        // deckinfo.innerHTML =matchinfo.value+ '<hr/>'+playerinfo.value ;
        // ad.innerHTML =ad_input.value;
    };

});
//生成指定div画布对象
$(function(){
    $("#btnSave").click(function(){
        $("canvas").remove();
        document.getElementById('preview').style.display = "block";
        document.getElementById('canvas').style.display = "none";
        html2canvas($("#preview"),{
            onrendered:function(canvas){
                document.getElementById('canvas').appendChild(canvas);
                document.getElementById('preview').style.display = "none";
                document.getElementById('canvas').style.display = "block";
            }
        });
    });
});
