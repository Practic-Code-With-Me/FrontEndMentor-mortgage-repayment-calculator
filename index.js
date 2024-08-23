document.addEventListener('DOMContentLoaded', function () {
    let inputFields = document.getElementsByClassName('input-field');
    let inputContainerFields = document.getElementsByClassName('input-container');
    let radioContainerFields = document.getElementsByClassName('radio-container');
    let inputUnit = document.getElementsByClassName('input-unit');
    let radioItems = document.getElementsByClassName('radio-item');


    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].addEventListener('focus', function () {
            this.style.borderColor = '#d7da2f'
            inputContainerFields[i].style.borderColor = '#d7da2f'
            inputUnit[i].style.backgroundColor = '#d7da2f'

        });

        inputFields[i].addEventListener('blur', function () {

            this.style.borderColor = '';
            inputContainerFields[i].style.borderColor = ''
            inputUnit[i].style.backgroundColor = ''
        });
    }


    for (let i = 0; i < radioItems.length; i++) {
        radioItems[i].addEventListener('click', function () {
         
            for (let j = 0; j < radioContainerFields.length; j++) {
                radioContainerFields[j].style.borderColor = '#d5e5eb';
                radioContainerFields[j].style.backgroundColor = '#ffffff'; // Nền trắng mặc định
            }
    
        
            radioContainerFields[i].style.borderColor = '#d7da2f';
            radioContainerFields[i].style.backgroundColor = '#feffcc';
        });
    }
});