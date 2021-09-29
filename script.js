/*When clicked on, the corresponding text with the user details on should be 
replaced with an input box which contains the current value of that user detail 
and a new button with the text “Update”. For example, when clicking on the 
“Edit” button next to “Name: Dipper”, the following should be shown:*/

//Add an upload ability to the image
$('img').closest('div').children().replaceWith(
	$("<span></span>", {
		title: "Drag & Drop to change Profile Picture"
	}).append(
		$('<form></form>', {
			action: 'index.html',
			id: 'profileForm',
			method: 'POST',
			enctype: 'multipart/form-data'
		}).append(
			$('<div></div>', {
				id: 'drop-area'
			}).append(
				$('<input></input>', {
					accept: "image/*",
					type: "file",
					id: 'uploadProfileIcon',
					name: "uploadProfileIcon",
					style: "display: none;"
				})
			).append(
					$('<img></img>', {
						style: "cursor:pointer;",
						src: "no-profile-image.png",
						class: "img-fluid" ,
						alt: "Responsive image",
					})
			)
		)
	)
);

//on 'Edit' button click
$('button').on('click', function(){
	if ($(this).attr("id") != "picEdit") {
		if ($(this).text() == "Edit") {
			$(this).text("Update");
			$labelType = $(this).siblings('b').text();
			$(this).siblings('b').text("");
			$current = $(this).siblings('span').text();

			$(this).closest('div').addClass("form-group row");
			$(this).addClass("form-control col-2 ml-auto");

			if ($current.includes("@")) {
				$(this).siblings('span').replaceWith(
					$("<input></input>", {
						type: "email",
						class: "needs-input form-control col-9 mr-1",
						placeholder: $current
					})

				);
			}
			else if($current.includes(" ")){
				$(this).siblings('span').replaceWith(
					$("<input></input>", {
						type: "date",
						class: "needs-input form-control col-9 mr-1",
						placeholder: $current
					})

				);
			}
			else{
				$(this).siblings('span').replaceWith(
					$("<input></input>", {
						type: "text",
						class: "needs-input form-control col-9 mr-1",
						placeholder: $current
					})

				);
			}
		}
		else {
			if ($(this).siblings('input').val() != ""){
				$(this).removeClass('btn-warning');
				$(this).addClass('btn-dark');
				$(this).text("Edit");
				$(this).siblings('b').text($labelType);
				$new = $(this).siblings('input').val();

				if ($(this).siblings('input').attr('type') == 'date') {
					$date = $new.substring(8, 11);
					$month = $new.substring(5, 7);
					$year = $new.substring(0, 4);
						
					switch($month){
						case "01":
						$m = "January";
						break;
						case "02":
						$m = "February";
						break;
						case "03":
						$m = "March";
						break;
						case "04":
						$m = "April";
						break;
						case "05":
						$m = "May";
						break;
						case "06":
						$m = "June";
						break;
						case "07":
						$m = "July";
						break;
						case "08":
						$m = "August";
						break;
						case "09":
						$m = "September";
						break;
						case "10":
						$m = "October";
						break;
						case "11":
						$m = "November";
						break;
						case "12":
						$m = "December";
						break;
					}

					$newDate = $date + " " + $m + " "+ $year;
					$(this).siblings('input').replaceWith(
						$("<span></span>", {
							html: $newDate
						})
					);
				}
				else {
					$(this).siblings('input').replaceWith(
						$("<span></span>", {
							html: $new
						})
					);
				}

				$(this).closest('div').removeClass("form-group row");
				$(this).removeClass("form-control col-2 ml-auto");
			}
			else {
				$(this).removeClass('btn-dark');
				$(this).addClass('btn-warning');
				$(this).text("No input");
			}

		}
	}
});


$('input#uploadProfileIcon').on('change', function(){
	const [file] = uploadProfileIcon.files
  if (file) {
    $x = URL.createObjectURL(file)

    console.log(URL.createObjectURL(file));
    $('img').attr("src",$x);
  }

});


let dropArea = document.getElementById('drop-area');

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
  uploadProfileIcon.onchange();

}

function handleFiles(files) {
  uploadProfileIcon.onchange = evt => {
  const [file] = [...files]
  if (file) {
    $x = URL.createObjectURL(file)

    console.log(URL.createObjectURL(file));
    $('img').attr("src",$x);
  }
}
}
