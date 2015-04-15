/* calling in html using this statement */
/* onclick="capturePhoto(pictureSource.PHOTOLIBRARY);" */


 function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

// A button will call this function
//
function capturePhoto(source) {
	//sessionStorage.removeItem('imagepath');
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType:source
	});
}

function onPhotoDataSuccess(imageURI) {
	// Uncomment to view the base64 encoded image data
	// console.log(imageData);
	console.log(imageURI);
	// Get image handle
	//
	//var imgProfile = document.getElementById('imgProfile');

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	//imgProfile.src = imageURI;
	//if (sessionStorage.isprofileimage == 1) {
	//	getLocation();
	//}
	movePic(imageURI);
}

// Called if something bad happens.
// 
function onFail(message) {
	alert('Failed because: ' + message);
}

function movePic(file) {
	window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
}

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry) {
	var d = new Date();
	var n = d.getTime();
	//new file name
	var newFileName = n + ".jpg";
	var myFolderApp = "MyAppFolder";

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
		//The folder is created if doesn't exist
		fileSys.root.getDirectory(myFolderApp, {
			create : true,
			exclusive : false
		}, function(directory) {
			entry.moveTo(directory, newFileName, successMove, resOnError);
		}, resOnError);
	}, resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
	//Store imagepath in session for future use
	// like to store it in database
	sessionStorage.setItem('imagepath', entry.fullPath);
	console.log(entry);
	console.log(entry.fullPath);
	var imgProfile = document.getElementById('imgProfile');

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	imgProfile.src = entry.fullPath;
}

function resOnError(error) {
	alert(error.code);
}
