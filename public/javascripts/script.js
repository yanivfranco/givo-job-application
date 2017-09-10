  $(document).ready(function(){
  		$(".tree_container").hide();
  		$(".info_container").hide();
     // $(".tree_container2").hide();

  		$(".json-btn").click(function(){
  			$(".info_container").fadeOut();
        $(".tree_container").fadeOut(function(){$(".tree_container2").fadeIn()});
  		});

  		$(".info-btn").click(function(){

  			$(".tree_container2").fadeOut();
        $(".tree_container").fadeOut(function(){$(".info_container").fadeIn()});
  		});

     $(".viewer-btn").click(function(){
        $(".info_container").fadeOut();
        $(".tree_container2").fadeOut(function(){$(".tree_container").fadeIn()});
        
      });



      

		var treeData;
		var oReq = new XMLHttpRequest();
		oReq.onload = reqListener;
		oReq.open("get", "dev-to-be.json", true);
		oReq.send();

		function reqListener(e) {
		    treeData = JSON.parse(this.responseText);
		    $('.tree').jsonViewer(treeData,{collapsed: false});

        var final_tree = [];
        if(treeData.questions != undefined){
          if((treeData.questions).length > 0){
            q_array = treeData.questions;
              final_tree = createNode1(q_array[0],(undefined),final_tree);
          }
        }
        var my_chart = new Treant(final_tree);
		}   
 });



function createNode1(curr,child_instance,final_tree){ //builds the json tree with Treant
  if(child_instance == undefined){//first insert
    if(curr.answers != undefined){
      var children = [];
      for(var i=0; i < (curr.answers).length; i++){
       children.push({text: {name: (curr.answers)[i].tags[0]+". "+(curr.answers)[i].text}, children: []});
      }
      final_tree = { chart: {container: "#tree-simple" }, nodeStructure:  {  'text': { 'name': curr.text }, children: children}};
      for(var i=0; i < (curr.answers).length; i++){
        console.log("first insert11");
        console.log(final_tree);
        final_tree =  createNode1(curr.answers[i], final_tree.nodeStructure.children[i], final_tree);
      } 
      return final_tree;     
    }

  }
  else if(curr.answers != undefined){ //if its a question node
      for(var i=0; i < (curr.answers).length; i++){
        child_instance.children.push({text: {name: (curr.answers)[i].tags[0]+". "+(curr.answers)[i].text}, children: []});
      }
      for(var i=0; i < (curr.answers).length; i++){
        final_tree =  createNode1(curr.answers[i], child_instance.children[i], final_tree);
      }
      return final_tree;
  }

  else if(curr.tags != undefined){ //if its answer node
    if(curr.questions != undefined){ //if there are follow-up questions
      for(i=0; i < (curr.questions).length; i++){
         child_instance.children.push({text: {name: (curr.questions)[i].text}, children: []});
       }
      for(i=0; i < (curr.questions).length; i++){
         final_tree =  createNode1((curr.questions)[i],child_instance.children[i],final_tree);
      }
      return final_tree;
    }
    else{//no more questions
      return final_tree;
    }
  }
}


