
function show() {

  $(document).ready(function(){

    var data = {};
    $("#save").click(function(){
      data.name = $("#name").val();
      data.email = $("#email").val();
      data.password = $("#password1").val();
      console.log(data);
      $.post("http://localhost:3000/users/createuser",data,
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });

  });

}
function name1(){
    var a=$("#name").val();
    if(!(a.length>=5 &&a.length<=30))
    {
     document.getElementById("name").value="";
     document.getElementById("name").focus();
     document.getElementById("name").placeholder="9-30 characters";
    }
    else {document.getElementById("email").focus();}

}

function email1() {
    var x = document.getElementById("email").value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        document.getElementById("email").value="";
        document.getElementById("email").focus();
        document.getElementById("email").placeholder="Not a valid e-mail address";
        
    }
     else {document.getElementById("password1").focus();}
}
function password(){
    var a=document.getElementById("password1").value;
    if(a=null)
    {
     document.getElementById("password1").value="";
     document.getElementById("password1").focus();
     document.getElementById("password1").placeholder="enter password";
    }
    else {document.getElementById("password2").focus();}

}
function password11(){
    var a=document.getElementById("password1").value;
    var b=document.getElementById("password2").value;
    if(a!=b)
    {
     document.getElementById("password11").value="";
     document.getElementById("password11").focus();
     document.getElementById("password11").placeholder="re-enter password";
    }
    else {validateForm();}

}
function validateForm()
{

var y=document.getElementById("name").value;
var z=document.getElementById("email").value;
var a=document.getElementById("password1").value;
var b=document.getElementById("password2").value;

if (!(a==null || a=="") && !(z==null || z=="") && !(y==null || y=="")&& !(b==null || b==""))
  {
  document.getElementById('save').disabled = false;
  }
  else
    alert("please fill all values");
      
}
function load(){
    document.getElementById("name").focus();
}
