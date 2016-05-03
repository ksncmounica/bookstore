
function display() {

  $(document).ready(function(){
    
    var info = {};
    $("#submit").click(function(){
      info.bookisbn = $("#bookisbn").val();
      info.bookname = $("#bookname").val();
      info.authorid = $("#authorid").val();
      info.authorname = $("#authorname").val();
      console.log(info);
      $.post("http://localhost:3000/books/createbook",info,
        function(info,status){
            alert("Info: " + info + "\nStatus: " + status);
        });
      });

  });

}