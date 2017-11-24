/**
 * Created by Administrator on 2017/11/23.
 */
$(function () {
  var $form = $("form");
  var currentPage = 1;
  var pageSize = 5;
  
  function render() {
    
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
        
      },
      success: function (info) {
        var html = template("second-tmp", info);
        $("tbody").html(html)
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render()
          }
        })
      }
    })
  }
  
  render();
  
  $(".btn-add").on("click", function () {
    $("#addModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $(".dropdown-menu").html(template("second-tmp2", info))
      }
    })
  })
  $(".dropdown-menu").on("click", 'a', function () {
    $(".dropdown-text").text($(this).text());
    $("[name='categoryId']").val($(this).data("id"));
    console.log($("[name='categoryId']"));
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    
  })
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      $(".img_box img").attr("src", data.result.picAddr);
      $("[name='brandLogo']").val(data.result.picAddr);
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID")
    }
  });
  
  
  $form.bootstrapValidator({
    //excluded:[],//不验证的内容
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })
  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: {
        brandName:$("#brandName").val(),
        categoryId: $("[name='categoryId']").val(),
        brandLogo:$("[name='brandLogo']").val(),
        hot:1
      },
      success: function (info) {

        if (info.success) {
          $("#addModal").modal("hide");
          currentPage = 1;
          render();
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm;
          $(".dropdown-text").text("请选择第一分类");
          $("[name='categoryId']").val("");
          $(".img_box img").attr("src","images/none.png");
          $("[name='brandLogo']").val("");


        }
      }
    })
  })
});