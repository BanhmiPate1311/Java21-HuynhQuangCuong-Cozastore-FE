// Khi nội dung file html đã được hiển thị trên browser thì sẽ kích hoạt
$(document).ready(function () {
  // Đăng ký sự kiện click cho thẻ tag được chỉ định bên HTML
  $("#btn-sign-in").click(function () {
    // .val() : Lấy giá trị của thẻ input được chỉ định
    var username = $("#user").val();
    var password = $("#pass").val();

    // Xuất giá trị ra trên tab console trên trình duyệt
    console.log("username : ", username, " password : ", password);

    //ajax : Dùng để call ngầm API mà không cần trình duyệt
    //axios, fetch
    //data : chỉ có khi tham số truyền ngầm
    $.ajax({
      url: "http://localhost:8080/signin",
      method: "post",
      data: {
        email: username,
        password: password,
      },
    }).done(function (response) {
      // Khi gọi API thì kết quả sẽ trả ở đây
      var token = response.data;
      if (token != null && token != "") {
        localStorage.setItem("token", token);
        // "gioHang: [{id:1,title:"Shirt",price:10,soLuong:10}]
        // chuyển qua trang index.html
        window.location.href = "index.html";
        // append : Nối chuỗi
      } else {
        alert("Sai tài khỏn");
      }
      console.log("server tra ve ", response.data);
    });
  });
});
