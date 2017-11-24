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