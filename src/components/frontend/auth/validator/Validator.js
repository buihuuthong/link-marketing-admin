
function Validator(options){
 //hàm thực hiện validate
    function validate(inputElement,rule){
        var errorElement =inputElement.parentElement.querySelector('.form-message') // parentElement là lấy thẻ cha của nó
         
        if(inputElement){ 
            inputElement.onblur = function(){
                var errorMessage = rule.test(inputElement.value);
                
              if(errorMessage){
                errorElement.innerText = errorMessage;
                inputElement.parentElement.classList.add('invalid');

              }else{
                 errorElement.innerText ='';
                 inputElement.parentElement.classList.remove('invalid')
              }
              
            }
        }
    }
    // lấy element của form validate
   var formElement = document.querySelector(options.form)
   if(formElement){
       options.rules.forEach(function(rule){
           var inputElement = formElement.querySelector(rule.selector);
         if(inputElement){
             inputElement.onblur= function(){
                 validate(inputElement,rule)
             }
         }
        
        
       })
   }
}
//kiểm tra input đã nhập hay chưa
// khi có lỗi thì trả ra messae lỗi
// khi hợp lệ => undefined
Validator.isRequired = function(selector){
   return {
       selector: selector,
       test : function(value){
           return value.trim() ? undefined : 'Vui lòng nhập Username'
                  // trim loại bỏ dấu cách 
       }
   };
}
Validator.isPassword =function(selector){
    return {
         selector: selector,
       test : function(value){
           return value.trim() ? undefined : 'Vui lòng nhập Password'
       }
    };
}
export default Validator;