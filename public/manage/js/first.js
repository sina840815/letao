/**
 * Created by Administrator on 2017/11/23.
 */
 $(function () {
    var currentPage=1;
   var pageSize=5;
   function rander() {
       $.ajax({
         tyle:"get",
         url:"/category/queryTopCategoryPaging",
         data:{
           page:currentPage,
           pageSize:pageSize
        
         },
         success:function (info) {
             var html = template("first-tmp",info);
           $("tbody").html(html)
         }
       })
   }
   rander()
  });