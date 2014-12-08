var postsSource;
var productShowTemplate;
var editProductSource;
var editProductTemplate;

// $(document).ready(function() {
	//Product display template
	postsSource = $("#show-posts-template").html();
	postShowTemplate = Handlebars.compile(postsSource);

	//Edit product template
	editPostSource = $("#edit-post-template").html();
	editPostTemplate = Handlebars.compile(editPostSource);


	
// });
$.ajaxSetup({
    beforeSend: function (xhr)
    {
       xhr.setRequestHeader("Authorization","Token token=f37d1226232281f48748e0352ca60eeb");        
    }
});

var Router = Backbone.Router.extend({
	routes: {
		"posts/:id":"post_show",
		"*action":"index"
	}
});

var router = new Router;

router.on("route:index", getPosts)

router.on("route:post_show", function(id){
    //Use id to make AJAX call and compile template
		$.ajax({
			url: "http://api.mediumapiclone.dev/posts/" + id,
			type: "GET",
			success: function(data) {
				var html = editPostTemplate(data);
				$("#content").html(html);
			},
			error: function(){
				alert("you have problems man!");
			}
		});
});

Backbone.history.start();

function getPosts() {
	$.ajax({
		url: "http://api.mediumapiclone.dev/posts",
		type: "GET",
		success: function(data) {
			var html = postShowTemplate({postData: data});
			$("#content").html(html);
		},
		error: function() {
			alert("Something went wrong here...");
		}
	});
}

//When user clicks edit button get the product information
//in preparation for editing


$(document).on("click", ".submit-edits", function(){
	$.ajax({
		url: "http://api.mediumapiclone.dev/posts/" + $(this).attr("id"),
		type: "PUT",
		data: { 
			post: {
				title: $("input[name=title]").val(),
				content: $("input[name=content]").val()
			}
		},
		success: function(data) {
			window.location.href = "#"
		},
		error: function(){
			alert("Something went wrong...");
		} 
	});
});
$(document).on("click", "#signup", function(){
	$.ajax({
		url: "http://api.mediumapiclone.dev/users",
		type: "POST",
		data: {
			user: {
				first: $("#add-first").val(),
				last: $("#add-last").val(),
				password: $("#add-password").val(),
				email:  $("#add-email").val()
			}
		},
		success: function(){
			$("#create-account-modal").modal("hide")
			getPosts()
		},
		error: function(a, b, error) {
			alert("Something wrong during signup");
			console.log(error)
		}
	});
});
$(document).on("click", "#new_post", function(){
	$.ajax({
		url: "http://api.mediumapiclone.dev/posts",
		type: "POST",
		data: {
			post: {
				title: $("#post-title").val(),
				content: $("#post-content").val()
			}
		},
		success: function(){
			$("#post-modal").modal("hide")
			getPosts()
		},
		error: function() {
			alert("Something wrong adding a post");
		}
	});
});
$(document).on("click", "#login", function(){
	$.ajax({
		url: "http://api.mediumapiclone.dev/login",
		type: "POST",
		data: {
				password: $("#login-password").val(),
				email:  $("#login-email").val()
		},
		success: function(){
			$("#login-modal").modal("hide")
			getPosts()
		},
		error: function() {
			alert("Something wrong adding a product");
		}
	});
});
// $(document).on("click", "#add-post", function(){
// 	$.ajax({
// 		url: "http://api.mediumapiclone.dev/posts",
// 		type: "POST",
// 		data: {
// 			post: {
// 				title: $("#post-title").val(),
// 				content:  $("#post-content").val()
// 			}
// 		},
// 		success: function(){
// 			$("#add-product-modal").modal("hide")
// 			getPosts()
// 		},
// 		error: function() {
// 			alert("Something wrong adding a product");
// 		}
// 	});
// });
