var isSizeApiCalled = false;
var isColorApiCalled = false;
$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/category",
    method: "get",
  }).done(function (response) {
    // Khi gọi API thì kết quả sẽ trả ở đây
    var categories = response.data;
    console.log("categories", categories);
    var listItems = categories.map(function (category) {
      return `<button
                class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".${category.name.toLowerCase()}"
            >
            ${category.name}
            </button>`; // Sử dụng template strings
    });
    $(".filter-tope-group").append(listItems);
  });

  $.ajax({
    url: "http://localhost:8080/product",
    method: "get",
  }).done(function (response) {
    // Khi gọi API thì kết quả sẽ trả ở đây
    var products = response.data;
    console.log("products", products);
    var listProducts = products.map(function (product) {
      var encodedProduct = encodeURIComponent(JSON.stringify(product));
      return `
      <div  class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.category.name.toLowerCase()}">
            <div class="block2">
              <div class="block2-pic hov-img0">
                <img src="images/${product.image}" alt="IMG-PRODUCT" />
                <a
                  href="#"
                  class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" data-product="${encodedProduct}"
                >
                  Quick View
                </a>
              </div>
              <div class="block2-txt flex-w flex-t p-t-14">
                <div class="block2-txt-child1 flex-col-l">
                  <a
                  href="product-detail.html?id=${product.id}"
                    class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    data-product-id="2"
                  >
                  ${product.name}
                  </a>
                  <span class="stext-105 cl3"> $${product.price} </span>
                </div>
                <div class="block2-txt-child2 flex-r p-t-3">
                  <a
                    href="#"
                    class="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                  >
                    <img
                      class="icon-heart1 dis-block trans-04"
                      src="images/icons/icon-heart-01.png"
                      alt="ICON"
                    />
                    <img
                      class="icon-heart2 dis-block trans-04 ab-t-l"
                      src="images/icons/icon-heart-02.png"
                      alt="ICON"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
      `; // Sử dụng template strings
    });
    $(".isotope-grid").append(listProducts);
  });
  var product = "";
  $(".isotope-grid").on("click", ".js-show-modal1", function (e) {
    // Xử lý khi phần tử được nhấp
    // Đoạn mã xử lý hiển thị modal ở đây
    var encodedProduct = $(this).data("product");
    product = JSON.parse(decodeURIComponent(encodedProduct));
    $(".js-name-detail").append(product.name);
    $(".mtext-106").append(`$${product.price}`);
    $(".pro-discription").append(product.description);

    // Bây giờ bạn có thể sử dụng đối tượng product trong xử lý tiếp theo
    console.log("product", product);
    e.preventDefault();
    $(".js-modal1").addClass("show-modal1");
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

  $(".isotope-grid").on("click", ".js-hide-modal1", function (e) {
    // Xử lý khi phần tử được nhấp
    // Đoạn mã xử lý hiển thị modal ở đây
    $(".js-modal1").removeClass("show-modal1");
  });
});
