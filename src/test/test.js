
//重置
function resetAll(){
	$("#sjbmc").val("");
	$("#sjy").val("");
}

//文件拖拽操作
 $(function(){ 
        //阻止浏览器默认行为。 
    $(document).on({ 
        dragleave:function(e){    //拖离 
            e.preventDefault(); 
        }, 
        drop:function(e){  //拖后放 
            e.preventDefault(); 
        }, 
        dragenter:function(e){    //拖进 
            e.preventDefault(); 
        }, 
        dragover:function(e){    //拖来拖去 
            e.preventDefault(); 
        } 
    }); 
    var box = document.getElementById('dropzone'); //拖拽区域     
	box.addEventListener("drop",function(e){  
		showMaskLayer();
    	var fileList = e.dataTransfer.files; //获取文件对象    
    	var filesName=fileList[0].name;
    	//检测是否是拖拽文件到页面的操作            
    	if(fileList.length == 0){                
       	 return false;            
    	}
    	//获取文件后缀
    	var extStart=filesName.lastIndexOf(".");
      	var ext=filesName.substring(extStart,filesName.length).toUpperCase();
    	if(ext!=".XLSX"&&ext!=".XLS"){ //判断是否是需要的 文件类型
       	 	$.alert("请选择XLSX、XLS类型的文件上传！");
       	 	hideMaskLayer();
      	  	return false;
  		}else{
    		test(fileList[0]);
    	}
    });
}); 
function del(role){
	//手动点击删除，提示是否删除
	if(role == "del"){
		$.confirm("提示信息","文件的信息也将被删除，是否继续？",function(){
			delDate();
		},function(){},null,null,{yes:"确定",no:"取消"});
	}
	//保存成功时，自动删除文件
	else if(role == "saveSuccess"){
		delDate();
	}
	
	
}
function delDate(delFlag){
	
	var url = $$pageContextPath + "fileResourceMgtController/del";
		$.request({
			url : url,
			params : {
				bbid: bbid////
			},
			success : function(response) {
				var delmessage=response.message;
				if('success' == delmessage){
					$.alert("提示信息","删除成功，上传文件的信息已删除！");
					$("#progressBar").hide();
		 			$("#wjts").show();
		 			$("#fileText").val("");
		 			$("#fileuploadfileField").val("");
		 			saveMessage = "error";
				}else{
					$.alert("提示信息","删除失败，请稍后重试。");
				}
			}
		});
		
}
// 侦查附件上传情况 ,这个方法大概0.05-0.1秒执行一次
function onprogress(evt){
    document.getElementById("progressBar").style.visibility="visible";
    var loaded = evt.loaded;       //已经上传大小情况
    var tot = evt.total;       //附件总大小
    var per = Math.floor(100*loaded/tot);   //已经上传的百分比
    document.getElementById("progressPersent").innerText =per +"%" ;
    document.getElementById("progress").style.width =per +"%" ;
}

function test(file){
  //新建一个FormData对象 
  var formData = new FormData();
  formData.append("name", file.name);
  formData.append("size", file.size);
  formData.append("upload", file);//设置和点击上传一样的upload
  formData.append("flag", '1');
  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", onprogress, false);//添加事件监听器
  ////
  var url = $$pageContextPath + "fileResourceMgtController/upload?bbid="+bbid;
  xhr.open('POST', url,true); 
  //发送请求  
  xhr.send(formData);
  $("#wjts").hide();
  $("#progressBar").show();
  //ajax返回  
  xhr.onreadystatechange = function(){ //第四步
　　　if ( xhr.readyState == 4 && xhr.status == 200 ) {
		var result = xhr.responseText;
		ckjg(result);
	  	document.getElementById("progress").style.width ="100%" ;
     	document.getElementById("progressPersent").innerText ="100%" ;
     	document.getElementById("complete").innerText =file.name+"上传成功！";
      	hideMaskLayer();//隐藏遮罩
　　 } else{
		document.getElementById("complete").innerText =file.name+"上传失败！";
		hideMaskLayer();//隐藏遮罩
	}
　};
};
function isEmpty(obj){
	    if(typeof obj == "undefined" || obj == null || obj == ""){
	        return true;
	    }else{
	        return false;
	    }
}
//查看结果
function ckjg(result){
	var jsonObject= jQuery.parseJSON(result);
	var msg = jsonObject.parameters.msg;
	var info = '0';
	if(isEmpty(msg)){
		var code = jsonObject.parameters.code;
		var info = '1';
		if(code == "3"){
	        info = "导入数据不能为空！";
	    }
	    else if(code == "5"){
	    	info = "文件记录不能为空！";
	    }
	    else if(code == "1"){
	    	info = "Excel表内字段首字母简写相同！";
	    }
	    else if(code == "2"){
	    	info = "数据表在数据库中已存在！";
	    }
	    else if(code == "4"){
	    	info = "数据源连接失败！";
	    }
	    else if(code.indexOf('blz') != -1){
	    	info = "表内字段{"+code.split('@')[1]+"}简写与数据库保留字相同！";
	    }
	    else if(code == "7"){
	    	info = "数据量超过1万，上传失败！";
	    }
	    else if(code == "error"){
	    	info = "上传失败,未知原因！";
	    }
	    if(info != '1'){
	    	$.alert("提示信息", info);
	    	$("#wjts").show();
	        $("#progressBar").hide();
	        hideMaskLayer();
	        $("#fileText").val("");
			$("#fileuploadfileField").val("");
	        return;
	    }
	    if(code == "success" && info =='1'){
	    	//解析result 拼接数据至数据预览
	    	var resultObj = jQuery.parseJSON(jsonObject.parameters.result)
	    	//数值文本日期..
	    	debugger;
	    	var zdType = jQuery.parseJSON(jsonObject.parameters.zdType)
	    	var zdsz = jsonObject.parameters.zdsz.split(',');
	    	var zdhtml = "<tr class='bt result_title'><th style='width:50px;'>表头</th>";
				for(var i=0;i<zdsz.length;i++){
					var zdyw = zdsz[i].split("#")[0];
					var zdzw = zdsz[i].split("#")[1];
					//zdhtml += "<th style=''>"+zdyw+"("+zdzw+")</th>"
					zdhtml += "<th style=''>"+zdzw+"</th>"
				}
				zdhtml+="</tr>";
				//$("#ylhead").html(zdhtml);
				$("#ylhead").append(zdhtml);
			var zdzhtml ="";
				for(var j=0;j<resultObj.length;j++){

                    if (j % 2 == 0) {
						zdzhtml += "<tr class='' style='white-space: nowrap;'><td>"+(j+2)+"</td>";
					} else {
						zdzhtml += "<tr class='odd' style='white-space: nowrap;'><td>"+(j+2)+"</td>";
                    }
                    
					
					//var zdzjson = JSON.parse(zdzsz[j]);
					for(var k=0;k<zdsz.length;k++){
						//var zdyw = zdsz[k].split("#")[2];
						var zdyw = zdsz[k].split("#")[0];
						zdzhtml += "<td>"+resultObj[j][zdyw]+"</td>";
					}
					zdzhtml +="</tr>";
				}
			//$("#ylbody").html(zdzhtml);
			$("#ylbody").append(zdzhtml);
	    	saveMessage = "success";
	    }
	}
	else{
		$.alert("提示信息", msg,function(){
			$("#wjts").show();
            $("#progressBar").hide();
            $("#fileName").val(""); 
        });
	}
   	
 if( saveMessage=="error"){
	 $.alert("提示信息", "保存基本信息失败，请重试！");
	 $("#wjts").show();
	 $("#progressBar").hide();
     hideMaskLayer();
     $("#fileText").val("");
	 $("#fileuploadfileField").val("");
     return;
 }
}
