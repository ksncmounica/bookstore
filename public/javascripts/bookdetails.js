
function createTable(){
   $(document).ready(function(){
     var info={};
      $.get("http://localhost:3000/books/getbooks",
        function(info,status){
          $.each(info, function(i){
            var str='<tr>';
            str += '<td>' + this.bookisbn + '</td>';
            str += '<td>' + this.bookname + '</td>';
            str += '<td>' + this.authorid + '</td>';
            str += '<td>' + this.authorname + '</td>';
            str += '</tr>';
            $('#results').append(str);
          });
        
     
  });
});
}