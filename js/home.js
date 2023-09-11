$(document).ready(function () {
    login();
});
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
function login(){
    $("#loginbtn").click(function (e) { 
        e.preventDefault();
        $("#loginModal").modal('show');
        $("#submitloginbtn").click(function (e) { 
            e.preventDefault();
            var email = $("#email").val().trim() ;
            if(email==''){
                Toast.fire({
                    icon: 'error',
                    title: 'Chưa nhập email '
                  })
            }else{
            $.ajax({
                type: "post",
                url: "https://students.trungthanhweb.com/api/checkLoginhtml",
                data: {
                    email:email,
                },
                dataType: "JSON",
                success: function (res) {
                    if(res.check==true){
                        localStorage.setItem('token',res.apitoken);
                        Toast.fire({
                            icon: 'success',
                            title: 'Đăng nhập thành công'
                          }).then(()=>{
                            window.location.reload();
                          })
                    }else{
                        Toast.fire({
                            icon: 'error',
                            title: 'Tài khoản chưa được đăng ký'
                          })
                    }
                }
            });
            }

        });
    });
}