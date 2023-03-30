$visorNumber = document.querySelector(".card-visor__number");
$visorName = document.querySelector(".card-visor__name");
$visorExpDate = document.querySelector(".card-visor__exp-date");

$visorExpDateMM= document.querySelector(".card-visor__exp-date-mm")
$visorExpDateYY= document.querySelector(".card-visor__exp-date-yy")

$visorCvc= document.querySelector(".card-visor__cvc")
$cardForm = document.querySelector(".card-form");
$ThanksSection=document.querySelector(".thanks-section")
// INPUTS

$NameInput=document.getElementById("Cardholder-name")
$CvcInput=document.getElementById("cvc")
$NumberInput= document.getElementById("Cardholder-number")
$MonthInput=document.getElementById("Month")
$YearInput=document.getElementById("Year")
// ERRORS
$NumberError=document.getElementById("numberError")
$DateError=document.getElementById("DateError")
$CvcError=document.getElementById("cvcError")
$NameError=document.getElementById("Name-error")
// Button 
$ConfirmButton=document.querySelector(".card__button")

// let  cardNumbervalidation= /\d{4}\ \d{4}\ \d{4}\ \d{4}/






// FUNCIONES
let Validator=false
const lengthValidator=(Length,Input,ErrorField)=>{

    if(Input.value.length!==Length) {ErrorField.textContent=`Wrong length` 
    Input.classList.add("card-form__input--invalid")
  
  }                
     else{ ErrorField.textContent="" 
     Input.classList.remove("card-form__input--invalid")
     return true
  
  }
}
const CannotBeBlankValidation=(Input,ErrorField)=>{
    if (Input.value==="")
    {ErrorField.textContent="Can´t be blank" 
   
   Input.classList.add("card-form__input--invalid")  
    }                        
   else{     
    ErrorField.textContent=""
    Input.classList.remove("card-form__input--invalid")
    return true}
}
const NumbersOnly=(Input,ErrorField)=>{ 
     let regExp= /[a-z]/g;
     if (regExp.test((Input.value).toLowerCase()))
    {ErrorField.textContent="Wrong format, numbers only" 
   Input.classList.add("card-form__input--invalid")

}                
    else{ ErrorField.textContent="" 
    Input.classList.remove("card-form__input--invalid")
    return true

}}
const WordsOnly=(Input,ErrorField)=>{ 
    let regExp= /[\d]/g;
    if (regExp.test((Input.value).toLowerCase()))
   {ErrorField.textContent="Wrong format, words only" 
  Input.classList.add("card-form__input--invalid")

}                
   else{ ErrorField.textContent="" 
   Input.classList.remove("card-form__input--invalid")
   return true

}}     

const MonthLength=()=>{if($MonthInput.value>12)
    {$DateError.textContent="Wrong format" 
  $MonthInput.classList.add("card-form__input--invalid")

 }else{ $DateError.textContent=""; 
 $MonthInput.classList.remove("card-form__input--invalid")
 return true

 }
}
const EmptyValidations= (visorField="",defaultValue)=>{

    if(visorField.textContent==="")visorField.textContent=defaultValue
}



const ValidateButton=(Input)=>{ 

    if(!Input.classList.contains("card-form__input--invalid")){return true}}

$cardForm.addEventListener("input", (e) => {



    // NAME
        if (e.target.matches("#Cardholder-name")) {

            $visorName.textContent = ""
            $visorName.insertAdjacentText("afterbegin", e.target.value)
        }
              EmptyValidations($visorName,"Jane Appleseed")
              WordsOnly($NameInput,$NameError)
        
      



            //   NUMBER

          
        if(e.target.matches("#Cardholder-number")) {
            $visorNumber.textContent = ""
            $visorNumber.insertAdjacentText("afterbegin", e.target.value)


            
            NumbersOnly($NumberInput,$NumberError);

            $NumberInput.value= e.target.value.replace(/\s/g,"").replace(/([0-9]{4})/g, `$1 `).trim(); 

        
            EmptyValidations($visorNumber,"0000 0000 0000 0000")
                        
                        
     }
              
                        
                        
       // MONTH
                        
if(e.target.matches("#Month")){
    $visorExpDateMM.textContent = ""
    $visorExpDateMM.insertAdjacentText("afterbegin", e.target.value)   
    e.target.value.replace(/[a-z]g/,"")
//    NumbersOnly($MonthInput,$DateError);
   CannotBeBlankValidation($MonthInput,$DateError)
   EmptyValidations($visorExpDateMM,"00")
   NumbersOnly($MonthInput,$DateError)
}



// YEAR
if(e.target.matches("#Year")){
    $visorExpDateYY.textContent = ""
    $visorExpDateYY.insertAdjacentText("afterbegin", e.target.value)
    CannotBeBlankValidation($YearInput,$DateError)
    EmptyValidations($visorExpDateYY,"00")
    NumbersOnly($YearInput,$DateError)

}


// CVC
if(e.target.matches("#cvc")){
    $visorCvc.textContent = ""
    $visorCvc.insertAdjacentText("afterbegin", e.target.value)
    CannotBeBlankValidation($CvcInput,$CvcError)
    EmptyValidations($visorCvc,"123")
    NumbersOnly($CvcInput,$CvcError)
}

 

}
)



// Crear condicional que habilite el listener de botón si todos los campos están correctos




// BOTÓN DE CONFIRMACIÓN 
// 
// 
$ConfirmButton.addEventListener("click",(e)=>{
    e.preventDefault()


// NameValidation
    if(CannotBeBlankValidation($NameInput,$NameError))  WordsOnly($NameInput,$NameError)
    
    
  
    
     
     // NumberValidation
    

     if(CannotBeBlankValidation($NumberInput,$NumberError) &&NumbersOnly($NumberInput,$NumberError)) lengthValidator(19,$NumberInput,$NumberError)
     
    
    //  
    // Month Validation
    if( CannotBeBlankValidation($MonthInput,$DateError)&&NumbersOnly($MonthInput,$DateError)&&  lengthValidator(2,$MonthInput,$DateError))MonthLength()
    
     
   
    



     // YearValidation
    
if(  CannotBeBlankValidation($YearInput,$DateError)&&NumbersOnly($YearInput,$DateError))lengthValidator(2,$YearInput,$DateError)

  
    
    



  // Cvc Validation
if( CannotBeBlankValidation($CvcInput,$CvcError)&& NumbersOnly($CvcInput,$CvcError)) lengthValidator(3,$CvcInput,$CvcError)
    
   
   
//    Button Validation


    if(ValidateButton($NameInput)&&
    ValidateButton($NumberInput)&&
    ValidateButton($MonthInput)&&
    ValidateButton($YearInput)&&
    ValidateButton($CvcInput)){

$cardForm.classList.add("Invisible")
$ThanksSection.classList.remove("Invisible")

    }
   
 
}




)