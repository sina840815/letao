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
  
           $("#paginator").bootstrapPaginator({
             bootstrapMajorVersion:3,
             currentPage: currentPage,
             totalPages: Math.ceil(info.total / pageSize),
             onPageClicked: function (a, b, c, page) {
               currentPage = page;
               rander();
             }
    
           })
         }
       })
   }
   rander()
   
   $(".btn_add").on("click",function () {
       $("#addModal").modal("show");
     
   })
   $form=$("#form");
   $form.bootstrapValidator({
     feedbackIcons:{
       valid: 'glyphicon glyphicon-ok',
       invalid:'glyphicon glyphicon-remove',
       validating: 'glyphicon glyphicon-refresh'
     },
     fields:{
       categoryName:{
         validators:{
           notEmpty:{
             message:'请输入一级分类名称'
           }
         }
       }
     }
   });
   $form.on("success.form.bv",function (e) {
     e.preventDefault();
     $.ajax({
             type:"post",
             url:'/category/addTopCategory',
             data:$form.serialize(),
             success:function (info) {
               if(info.success){
                 $("#addModal").modal("hide");
                 currentPage=1;
                 rander();
                 
           $form.data("bootstrapValidator").resetForm();
                 
           $form[0].reset();
         }
           
       }
     
     })
       
       
   })
   
  });