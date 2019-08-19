
const p =

window.onload = function() {

  // Image Drop
	var obj = document.getElementById("image");
	obj.addEventListener("dragover",
			function(ev){ ev.preventDefault();}, false);
	obj.addEventListener("drop",
			function(ev){ ev.preventDefault(); GetImage(ev);}, false);
}

function GetImage(ev){

	var targetObj = ev.currentTarget;
	var file = ev.dataTransfer.files[0];
	var fileType = file.name.slice(-4).toLowerCase();

	if( fileType == ".jpg"){

		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function(){

			targetObj.setAttribute("src",reader.result);

      mobilenet.load().then(model => {
        // Classify the image.
        var img = document.getElementById('image');
        model.classify(img).then(predictions => {
          var txt="";
          for(i=0; i<predictions.length; i++){
           txt += "ClassName：" + predictions[i].className +'<br>';
           txt += "Probability：" + predictions[i].probability.toFixed(3) +'<br>';
           txt += '<br>';
          }
          document.getElementById('predictions').innerHTML = txt;
          console.log(predictions);
        });
      });

		}

	}else{
		alert("File available only .jpg");
	}
}


// Load the model.
