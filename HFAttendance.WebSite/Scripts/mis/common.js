var Func = {
	ajax:function(url,arr){
			var ret={'errno':true,'data':'操作失败'};
			$.ajax({
				url:url,
				data:arr,
				type:'post',
				async:false,
				dataType:'json',
				success:function(msg){
					if(!msg.errno){
						ret={'errno':false,'data':msg.data};
					}else{
						ret={'errno':true,'data':msg.error};
					}
				}	
			});
			return ret;
		}
	
};

function closeWinBox(){
	$("#popDiv").hide();
}

$(document).ready(function(){
	
$('a.del').click(function (){
        var el = $(this);
        var msg ='确定要删除吗？';
        if (confirm(msg)){
            $.post(el.data("url"),{id:el.data("id")}, function(ref){
				if(ref==1){
					alert('删除成功');
					window.location.reload();
				}else{
					alert('删除失败');
				}
			});
		}
});

$('a.res').click(function () {
	var el = $(this);
	if (confirm('确定要还原吗？') ){
		$.ajax({
			url:el.data("url"),
			data:{'id':el.data("id")},
			type : "post",
			success : function(msg){
				if(msg==1){
					alert('还原成功');
					window.location.reload();
				}else{
					alert('还原失败');
				}    
			}
		});
	}	
});

});