/**
 * Created by Administrator on 2017/11/23.
 */
$(function () {
  
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
  
});