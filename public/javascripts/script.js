  $(document).ready(function(){
  		$(".tree_container").hide();
  		$(".info_container").hide();

  		$(".json-btn").click(function(){
  			$(".info_container").fadeOut();
  			$(".tree_container").fadeIn();
  		});

  		$(".info-btn").click(function(){
  			$(".info_container").fadeIn();
  			$(".tree_container").fadeOut();
  		});
		var treeData;
		var oReq = new XMLHttpRequest();
		oReq.onload = reqListener;
		oReq.open("get", "dev-to-be.json", true);
		oReq.send();

		function reqListener(e) {
		    treeData = JSON.parse(this.responseText);
		    $('.tree').jsonViewer(treeData,{collapsed: true});
		}



            

 });
