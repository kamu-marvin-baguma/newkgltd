function validationForm() {
    let produceType = document.forms["salesProduce"]["produceType"];
    let produceTypeErr = document.getElementById("produceType");

    let name = document.forms["salesProduce"]["nameOfDealer"];
   
    let nameOfSalesAgent = document.forms["salesProduce"]["salesAgent"];
    let nameOfSalesAgentErr = document.getElementById("salesAgent");

    let tonnage = document.forms["salesProduce"]["tonnage"];

    let tonnageOfProduce = document.forms["salesProduce"]["nameOfSalesAgent"];
    let tonnageOfProduceErr = document.getElementById("tonnageOfProduceErr");

   

    // let nameerr = document.forms["RegForm"] ["nameerr"];
    // nameRegex = /^[A-Za-z]+$/
    // emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    // passRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#^()])[A-Za-z\d@#$!%?&^()]{10,}$/
    // nameOfBuyerRegex = /^[A-Za-z]+$/
    nationalIdRegex = /^(?=.\d)(?=.[A-Z])[A-Z0-9]{1,14}$/
    nameOfProduceRegex = /^[A-Za-z]+$/
    typeOfProduceRegex = /^[A-Za-z0-9]+$/
    tonnageRegex = /^[0-9]{3,}$/
    costRegex = /^[0-9]{3,}$/
    contactRegex = /^\d{10}$/
    salesAgentRegex = /^[A-Za-z]+$/
    
    

    if (name.value == "") {
         name.style.border = "2px solid red";
        nameOfBuyerErr.innerHTML = "Please select name of buyer ☝"
        return false;
    }
    else {
        name.style.border = "2px solid green";
    }

    if (nationalId.value == "" || !nationalIdRegex.test(nationalId.value)) {
        nationalId.style.border = "2px solid red";
        nationalIdErr.innerHTML = "NIN of buyer (min 14 characters) ☝"
        return false;
    }
    else {
        nationalId.style.border = "2px solid green";
    }

    if (location.value == "") {
        location.style.border = "2px solid red";
        locationErr.innerHTML = "Location of buyer ☝"
        return false;
    }
    else {
        name.style.border = "2px solid green";
    }

    if (contactNumber.value == "" || !contactRegex.test(contactNumber.value)) {
        contactNumber.style.border = "2px solid red";
        contactNumberErr.innerHTML = " Buyer's contact (Phone number)? ☝ "
        return false;
    }
    else {
        contactNumber.style.border = "2px solid green";
    }

    if (amountPaid.value == "" || !costRegex.test(amountPaid.value)) {
        amountPaid.style.border = "2px solid red";
        amountPaidErr.innerHTML = "Amount paid so far? ☝"
        return false;
    }
    else {
        amountPaid.style.border = "2px solid green";
    }

    if (amountDue.value == "" || !costRegex.test(amountDue.value)) {
        amountDue.style.border = "2px solid red";
        amountDueErr.innerHTML = "How much is due ☝"
         return false;
    }
    else {
        amountDue.style.border = "2px solid green";
    }

    if (nameOfSalesAgent.value == "" || !salesAgentRegex.test(nameOfSalesAgent.value)) {
        nameOfSalesAgent.style.border = "2px solid red";
        nameOfSalesAgentErr.innerHTML = "Name of sales agent ☝"
        return false;
    }
    else {
        nameOfSalesAgent.style.border = "2px solid green";
    }

    if (dueDate.value == "") {
        dueDate.style.border = "2px solid red";
        dueDateErr.innerHTML = "When is the due date ☝"
        return false;
    }
    else {
        dueDate.style.border = "2px solid green";
    }

    if (produceName.value == "" || !nameOfProduceRegex.test(produceName.value)) {
        produceName.style.border = "2px solid red";
        produceNameErr.innerHTML = "What is the produce name? ☝ "
        return false;
    }
    else {
        produceName.style.border = "2px solid green";
    }

    if (typeOfProduce.value == "" || !typeOfProduceRegex.test(typeOfProduce.value)) {
        typeOfProduce.style.border = "2px solid red";
        typeOfProduceErr.innerHTML = " What is the produce type? ☝ "
        return false;
    }
    else {
        typeOfProduce.style.border = "2px solid green";
    }

    if (tonnageOfProduce.value == "" || !tonnageRegex.test(tonnageOfProduce.value)) {
        tonnageOfProduce.style.border = "2px solid red";
        tonnageOfProduceErr.innerHTML = "Fill in the tonnage ☝"
          return false;
    }
    else {
        tonnageOfProduce.style.border = "2px solid green";
    }

    if (dispatchDate.value == "") {
        dispatchDate.style.border = "2px solid red";
        dispatchDateErr.innerHTML = "When is the Dispatch? ☝"
        return false;
    }
    else {
        dispatchDate.style.border = "2px solid green";
    }

    function validation(formid){
        //perform your validations
        if (valid)
            $("#formid").submit();
        else
           alert("Validation error");
        }
    
    }