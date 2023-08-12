var isSizeApiCalled = false;
var isColorApiCalled = false;
$(document).ready(function () {
  console.log("first");
  // Lấy chuỗi query từ URL
  const queryString = window.location.search;

  // Sử dụng hàm URLSearchParams để trích xuất tham số id từ chuỗi query
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("id");

  // Kiểm tra nếu có giá trị id trong URL
  if (productId !== null) {
    // Hiển thị giá trị id trong console (hoặc bạn có thể làm gì đó khác với giá trị id)
    console.log("Product ID:", productId);
  }

  $.ajax({
    url: `http://localhost:8080/product/${productId}`,
    method: "get",
  }).done(function (response) {
    // Khi gọi API thì kết quả sẽ trả ở đây
    var product = response.data;
    console.log("product", product);

    $(".product-category").text(product.category.name);
    $(".product-name").text(product.name);
    $(".js-name-detail").html(product.name);
    $(".mtext-106").html(`$${product.price}`);
    $(".pro-discription").html(product.description);

    var imageList = JSON.parse(product.imageDetail);
    console.log("imageList", imageList);
    $(".item-slick3").each(function (index) {
      var itemSlick = $(this);
      var newImageUrl = "images/" + imageList[index]; // Lấy đường dẫn hình ảnh tương ứng

      // Thay đổi giá trị của thuộc tính data-thumb
      itemSlick.attr("data-thumb", newImageUrl);

      // Cập nhật thẻ img và a để thay đổi hình ảnh và đường dẫn tới hình ảnh lớn
      var imgElement = itemSlick.find("img");
      imgElement.attr("src", newImageUrl);

      var aElement = itemSlick.find("a");
      aElement.attr("href", newImageUrl);
    });
    // Cập nhật hình ảnh của itemthumb (dots)
    $(".slick3-dots li").each(function (index) {
      var dot = $(this);
      var newImageUrl = "images/" + imageList[index]; // Lấy đường dẫn hình ảnh tương ứng cho dots

      // Cập nhật thẻ img trong dots để hiển thị hình ảnh mới
      var imgThumb = dot.find("img");
      imgThumb.attr("src", newImageUrl);
    });

    // get Size
    if (!isSizeApiCalled) {
      // Gọi API để lấy danh sách Size
      $.ajax({
        url: "http://localhost:8080/size",
        method: "get",
      })
        .done(function (response) {
          var sizes = response.data;
          console.log("sizes", sizes);
          var listSizes = sizes.map(function (size) {
            return `<option>Size ${size.name}</option>`;
          });
          $(".size-list").html(listSizes);

          // Đánh dấu rằng API đã được gọi
          isSizeApiCalled = true;
        })
        .fail(function (error) {
          console.log("Lỗi khi gọi API:", error);
        });
    }

    // get Color
    if (!isSizeApiCalled) {
      $.ajax({
        url: "http://localhost:8080/color",
        method: "get",
      })
        .done(function (response) {
          // Khi gọi API thì kết quả sẽ trả ở đây
          var colors = response.data;
          console.log("colors", colors);
          var listColors = colors.map(function (color) {
            return `<option>${color.name}</option>`; // Sử dụng template strings
          });
          $(".color-list").html(listColors);

          // Đánh dấu rằng API đã được gọi
          isColorApiCalled = true;
        })
        .fail(function (error) {
          console.log("Lỗi khi gọi API:", error);
        });
    }
  });
});
