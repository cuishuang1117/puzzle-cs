var rows;
var empty;
function move(id,target){//移动
    $('#'+target).html($('#'+id).html()).css("background","#1abf8a");//把需要移动的表格单元td的内容给目标td
    $('#'+id).html("").css("background","#2693e7");
    empty = parseInt(id);
}
function clickPic(id){
    if (id - rows == empty)//点击图像上方是否为空
    {
        move(id, id - rows);//move()为执行的移动函数需要传两个值，一个移动元素id，另一个为目标id
    }
    else if ((parseInt(id) + parseInt(rows) == empty))//点击图像下方是否为空
    {
        move(parseInt(id), parseInt(id) + parseInt(rows));
    }
    else if ((id % rows) != 1 && (id - 1) == empty)//点击图像左方是否为空
    {
        move(id, id - 1);
    } else if ((id % rows) && (parseInt(id) + 1) == empty)//点击图像右方是否为空
    {
        move(parseInt(id), parseInt(id) + 1);
    }
}
function isWin(){
   let flag = 1;
  for(let i = 1; i < rows * rows; i++){
      if($('#'+i).text()!=i){ //判断id从1到rows*rows-1的格子是否都填对了
          flag = 0;
          break;
      }
  }
  if(flag)
      alert("恭喜你，游戏胜利! 请点击确定按钮。");
}
$(document).ready(function(){
    debugger;
$('#create').click(function () {
    try {
        rows = $("#rows").val();
        if (rows < 3)
            throw "太小";
        else if (rows > 9)
            throw "太大";
        else
            $("#demo").html("");
    } catch (err) {
        $("#demo").html(err);
    }
    if(rows >= 3 && rows <= 9) { //如果输入rows合法
        var tab = '<table  align="center" ';
        for (let i = 0; i < rows; i++) {
            tab += '<tr>';
            for (let j = 0; j < rows; j++) {
                if (i == rows - 1 && j == rows - 1)
                    tab += "<td  style='background-color: #2693e7'>" + "</td>";
                else
                    tab += "<td  style='background-color: #1abf8a'>" + (i * rows + j + 1) + "</td>";
            }
            tab += "</tr>";
        }
        tab += "</table>";
        $('#main').html(tab); //初始化拼图
        $('#target').html(tab); //初始化目标
        $('#main td').each(function (index, obj) {  //给每个表格单元指定id
            $(obj).attr("id", index + 1);
        });
        empty = rows * rows;
        //开始打乱拼图
        for (let i = 0; i < rows * rows * 10; i++) {
            let picId = Math.floor(Math.random() * rows * rows + 1);
            clickPic(picId);
        }
    }
});
$("#main").on("click", "td", function () {
    clickPic(this.id);
    isWin();
});
$(document).keydown(function(event){
    if(event.keyCode == 37){ //左
        if(empty % rows != 1) {
            move(empty - 1, empty);
            isWin();
        }
    }
    else if (event.keyCode == 39){ //右
               if(empty % rows) {
                   move(parseInt(empty) + 1, empty);
                   isWin();
               }
    }
    else if(event.keyCode == 38){ //上
        if(empty > rows) {
            move(empty - rows, empty);
            isWin();
        }
    }
    else if(event.keyCode == 40){ //下
        if(empty < rows * rows - 1) {
            move(parseInt(empty) + parseInt(rows), empty);
            isWin();
        }
    }
});



});
