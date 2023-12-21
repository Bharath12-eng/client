export const Validation = ({employee})=>{
   console.log("employeesdata ",employee)
   let errors = {}

  if(employee.firstName === ""){
    errors.firstName="FirstName is required"
  }
  if(employee.lastName === ""){
   errors.lastName="LastName is required"
  }
  if(employee.email=== ""){
   errors.email="Email is required"
  }

  if(employee.bloodGroup === ""){
   errors.bloodGroup="Blood Group is required"
  }
  
  if(employee.countryCode ===""){
   errors.countryCode="Country code is required"
  }

  if(employee.phone === ""){
   errors.phone="Phone Number is required"
  }

  if(employee.altPhone === ""){
   errors.altPhone ="Alternate Number is required"
  }

  if(employee.DOB === ""){
   errors.DOB="Date of Birth is required"
  }

  if(employee.maritalStatus === ""){
   errors.maritalStatus="Marital Status is required"
  }

  if(employee.languages === ""){
   errors.languages = "Language is required"
  }

  if(employee.accommodation === ""){
   errors.accommodation = "Accommodation is required"
  }


  if(employee.gender === ""){
   errors.gender = "Gender is required"
  }  

  return errors;

}