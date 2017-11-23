/**
 * Created by Administrator on 2017/11/21.
 */
 $(function () {
   NProgress.configure({ showSpinner: false });

//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
   $(document).ajaxStart(function () {
     //开启进度条
     NProgress.start();
   });
  
   $(document).ajaxStop(function () {
     //完成进度条
     setTimeout(function () {
       NProgress.done();
     }, 500);
   });
  
   if(location.href.indexOf("login.html")==-1){
     $.ajax({
       type:"get",
       url:"/employee/checkRootLogin",
       success:function (data) {
         if(data.error==400){
           location.href="login.html"
         }
       }
      
     })
   }
   
   var $form=$("form");
   $form.bootstrapValidator({
  
     feedbackIcons: {
       valid: 'glyphicon glyphicon-ok',
       invalid:'glyphicon glyphicon-remove',
       validating: 'glyphicon glyphicon-refresh'
     },
     
     fields: {
       username: {
         validators: {
           notEmpty: {
             message: '用户名不能为空'
           },
           callback:{
             message:"账号错误"
           }
         }
       },
       password: {
         validators: {
           notEmpty: {
             message: '密码不能为空',
           },
           stringLength: {
             min: 6,
             max: 12
           },
           callback:{
             message:"密码错误",
           }
         }
       }
     }
     }),
  
     $form.on("success.form.bv", function (e) {
       e.preventDefault();
       $.ajax({
         type:"post",
         url:"/employee/employeeLogin",
         data: $form.serialize(),
         success:function (data) {
           if(data.success){
             location.href='index.html'
           };
           if(data.error==1000){
             $form.data("bootstrapValidator").updateStatus("username","invalid","callback")
           };
           if(data.error==1001){
             $form.data("bootstrapValidator").updateStatus("password","invalid","callback")
           }
           
             
         },
         
         
       
       })
     
     
   })
   

   
   $("[type='reset']").on("click", function () {
    
   
     $form.data("bootstrapValidator").resetForm();
    
   });
   // 二级菜单隐藏显示
   $(".items").on("click", function () {
   $(".list").toggle(400)
   })
   // 侧边栏隐藏显示
   $(".leftside").on("click",function () {
     $(".ad-section").toggleClass('navmain');
      $(".ad-side").toggleClass('sidemain');
   })
   //退出功能
   $(".rightside").on("click", function () {
     $("#logoutModal").modal("show");
    
    
     //给退出按钮注册事件, off:解绑所有的事件
     $(".btn_logout").off().on("click", function () {
       //console.log("Hehe");
       //发送ajax请求，退出系统
       $.ajax({
         type:"get",
         url:"/employee/employeeLogout",
         success:function (data) {
           if(data.success){
             //退出成功
             location.href = "login.html";
             }
         }
       })
     })
   });
  
   
   
  });