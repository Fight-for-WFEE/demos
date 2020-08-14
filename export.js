代码1：
$(document).on("click","a[ectype='sync_export_goods']",function(){
		{
			var content=`<div class="pb-bd"><div class="pb-ct">	<div class="pb-bd">
									<div class="pb-ct"> 
										<div class='item' style='height:40px'>
											<label >价格区间：</label>
													<input id="input1" type="text" oninput="inputChange(this)" onchange="compare()" />
													<span class='m05'>-</span>
													<input id="input2" type="text" oninput="inputChange(this)" onchange="compare()" />
										</div>
										<div class='item' style='height:40px'>
											<lable>所需商品信息：</lable>
											商品ID<input  type="checkbox" name="item" value="goods_id" title="商品ID"/>&nbsp;
											商品编号<input  type="checkbox" name="item" value="goods_sn" 	title="商品编号"/>&nbsp;
											商品名称<input  type="checkbox" name="item" value="goods_name" title="商品名称"/>&nbsp;
											类目ID<input  type="checkbox" name="item" value="cat_id" title="类目ID"/>&nbsp;
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											品牌<input  type="checkbox" name="item" value="brand_name" title="品牌"/>
											进价<input  type="checkbox" name="item" value="cost_price" title="进价"/>
											市场价<input  type="checkbox" name="item" value="shop_price" title="市场价"/>
										</div>
								</div></div></div>`;
								
		
							
		pb({
			id:"sync_export_goods",
			title:"一键导出商品",
			width:520,
			content:content,
			ok_title:"{$lang.button_submit_alt}",
			cl_title:"{$lang.cancel}",
			drag:true,
			foot:true,
			onOk:function(){
				var items = [];//定义一个空数组
				var itemsName=[]
				$("input[name='item']:checked").each(function(i){//把所有被选中的复选框的值存入数组
						items[i] =$(this).val();
						itemsName[i]=$(this).attr("title");

				});
				$.ajax(
					{
						type : "POST",   //提交方式  
						url : "goods.php?act=form", //路径       
						data : {

							"input1":$("#input1").val(),
							"input2":$("#input2").val(),
							"itemsName":itemsName,
							"items":items
						}, //数据，这里使用的是Json格式进行传输  
						 dataType: "json",
						success : function(result) {  //返回数据根据结果进行相应的处理  
							console.log(result['content']);
							// var content=result['content'];
							var content=result['content'];
							var th=result['th'];
							let str="";
							for(var i=0;i<th.length;i++){
								if(i==th.length-1){
									str+=th[i]+'\n';
								}else{
									str+=th[i]+',';
								}
								
							}
							// let str = `姓名,电话,邮箱\n`;
							//增加\t为了不让表格显示科学计数法或者其他格式
							for(let i = 0 ; i < content.length ; i++ ){
								for(let item in content[i]){
										str+=content[i][item] + '\t,';   
								}
								str+='\n';
							}
							//encodeURIComponent解决中文乱码
							//  window.location.href = "export.php";
							let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
							//通过创建a标签实现
							let link = document.createElement("a");
							link.href = uri;
							//对下载的文件命名
							link.download =  "json数据表.csv";
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);

						}  
					}
				);
			}
		});

	}
	});
代码2：
<?php
        /**导出excel**/
        header("Content-type:application/vnd.ms-excel");   //声明内容类型为excel
        header("Content-Disposition:attachment;filename=excel导出.xls");  //content-disposition设置attachment为弹窗下载，inline时会内嵌浏览器显示，当然对jpg等文件有效，excel文件不能内嵌，可自行翻阅文档了解；filename定义文件名称与扩展名
        echo "订单编号\t";
        echo "用户名\t";
        echo "商品名称\t";
        echo "订单状态\t";
        echo "支付方式\t";
        echo "支付流水号\t";
        echo "下单时间";

        for($i=1; $i<=20;$i++){
            echo "\n";
            echo date("YmdHis").rand(1000,9999)." \t";
            echo "第{$i}个用户\t";
            echo "商品名称 $i\t";
            echo "支付成功\t";
            echo "微信支付\t";
            echo uniqid()."\t";
            echo date("Y-m-d H:i:s");
        }

	
