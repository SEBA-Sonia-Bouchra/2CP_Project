import React from 'react'
import image from '../assets/images/background.png'
import { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import fileTick from '../assets/images/file-tick.png'

export default function SignUpPage() {
  const [isChecked,setIsChecked]=useState(false); // professional checkbox
  const initialValues={firstName:"",lastName:"",email:"",password:"",confirmPassword:"",role:"",institution:"",attachFile:""}; // input fields
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)
  const [selectedFile, setSelectedFile] = useState(null); // for file attachement
  const navigate=useNavigate() // to navigate to the email verification page when clicking create account button

  const handleChange = (e) => { // update form fields(when entering input)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name]; // Remove error for the current field
      return newErrors;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents submit
    const validationErrors = validate(formValues);
    setFormErrors(validationErrors); // treat errors
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmit(true); // Allow submission only if no errors
      navigate("/email-verification"); // Navigate to email verification
    }
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Submitting form:", formValues);
    }
  }, [formErrors, isSubmit]);
  const validate = (values) => { // checks for errors and return them
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName.trim()) { // trim is used to remove spaces from start or end
      errors.firstName = "First name is required!";
    }
    if (!values.lastName.trim()) {
      errors.lastName = "Last name is required!";
    }
    if (!values.email.trim()) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }
    if(!values.confirmPassword.trim()){
      errors.confirmPassword="Confirming password is required!"
    } else if (values.confirmPassword!==values.password){
      errors.confirmPassword="Passwords don't match!"
    }
    if (!values.role.trim() && isChecked) { // are only required if the professional checkbox is checked
      errors.role = "Your role is required!";
    }
    if (!values.institution.trim() && isChecked) {
      errors.institution = "Your institution is required!";
    }
    if (!selectedFile && isChecked) {
      errors.attachFile = "Please attach an identification file";
    }
    return errors;
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <>
      <div className='sm:flex gap-8 sm:flex-col md:grid md:grid-cols-3 md:h-screen bg-[#F2F2E1]'>
        <div className=' col-span-1 '>
          <img src={image} alt="background" className='sm:w-full md:h-screen md:w-full object-cover rounded-br-[50px] 
          rounded-tr-[50px] min-w-full'/>
        </div>
        <div className='bg-[#b57d57]/30 rounded-[100px] place-self-center text-[#b57d57]
        shadow-lg mt-10 md:col-span-2 px-12 py-14 mb-10 md:mr-24 flex-1 overflow-hidden'>
          <form action="" className='font-montserral grid place-content-center gap-4' noValidate onSubmit={handleSubmit}>
            <h2 className='font-playfairdisplay text-[#b57d57] text-[30px] text-center drop-shadow-lg'>
              Sign Up
            </h2>
            <div className='flex gap-2'>
              <input type="text" name='firstName' placeholder={formErrors.firstName ? formErrors.firstName : "First name"} className={`appearance-none outline-none
               bg-transparent border-b border-solid w-full h-full ${formErrors.firstName ? "placeholder-red-700 border-red-700 " : "placeholder-[#b57d57] border-[#b57d57]"} `}
               value={formValues.firstName} onChange={handleChange}/>
              <input type="text" name='lastName' placeholder={formErrors.lastName ? formErrors.lastName : "Last name"} className={`appearance-none outline-none bg-transparent
              border-b border-solid  w-full h-full ${formErrors.lastName ? "placeholder-red-700 border-red-700 " : "placeholder-[#b57d57] border-[#b57d57]"}`} 
              value={formValues.lastName} onChange={handleChange}/>
            </div>
            <div className='flex gap-1 flex-col'>
              <input type="email" name='email' placeholder={formErrors.email ? formErrors.email : "Email"} className={`appearance-none outline-none bg-transparent border-b
              border-solid w-full h-full " ${formErrors.email ? "placeholder-red-700 border-red-700 " : "placeholder-[#b57d57] border-[#b57d57]"}`}
              value={formValues.email} onChange={handleChange}/>
              {(formValues.email && formErrors.email) && <p className='text-red-700 '>{formErrors.email}</p> }
            </div>
            <div className='flex gap-1 flex-col'>
              <input type="password" name='password' placeholder={formErrors.password ? formErrors.password : "Password"} className={`appearance-none outline-none bg-transparent 
               border-b border-solid w-full h-full ${formErrors.password ? "placeholder-red-700 border-red-700 " : "placeholder-[#b57d57] border-[#b57d57]"}`}
               value={formValues.password} onChange={handleChange}/>
               {(formValues.password && formErrors.password) && <p className='text-red-700 '>{formErrors.password}</p> }
            </div>
            <div className='flex gap-1 flex-col'>
              <input type="password" name='confirmPassword' placeholder={formErrors.confirmPassword ? formErrors.confirmPassword : "Confirm password"}
               className={`appearance-none outline-none bg-transparent border-b border-solid  w-full h-full
               ${formErrors.confirmPassword ? "placeholder-red-700 border-red-700 " : "placeholder-[#b57d57] border-[#b57d57]"}`}
               value={formValues.confirmPassword} onChange={handleChange}/>
               {(formValues.confirmPassword && formErrors.confirmPassword) && <p className='text-red-700 '>{formErrors.confirmPassword}</p> }
            </div>
            <div className='flex items-center gap-[8px] relative mt-2.5'>
              <input type="checkbox" id='professional-checkbox' className='appearance-none p-0.5 rounded-sm border-2 border-[#b57D57] border-solid
              w-5 h-5 sm:w-6 sm:h-6 cursor-pointer checked:bg-no-repeat checked:bg-center checked:bg-[#b57d57] relative peer shrink-0 
              focus:outline-none'  checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
              <svg className="absolute left-1.5 top-1.5 w-3 h-3 hidden peer-checked:block pointer-events-none text-white"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"
              strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <label htmlFor="professional-checkbox" className='text-[#b57d57]'>I am a professional</label>
            </div>
            {isChecked && (
             <>
              <div className='flex gap-2 mb-1'>
                <input type="text" name='role' placeholder={formErrors.role ? formErrors.role : "Role"} className={`appearance-none outline-none
                bg-transparent border-b border-solid w-full h-full ${formErrors.role ? "placeholder-red-700 border-red-700 " : "placeholder-[#b57d57] border-[#b57d57]"}`}
                value={formValues.role} onChange={handleChange}/>
                <input type="text" name='institution' placeholder={formErrors.institution ? formErrors.institution : "Institution"}
                className={`appearance-none outline-none bg-transparent border-b border-solid w-full h-full ${formErrors.institution ?
               "placeholder-red-700 border-red-700 " : "placeholder-[#b57d57] border-[#b57d57]"}`} value={formValues.institution}
                onChange={handleChange}/>
              </div>
              <div className='flex justify-center' >
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                <label htmlFor="file-upload" name='attachFile' className={`button-style cursor-pointer ${selectedFile ? 'text-[#4F3726] bg-[#EFEFDE]' : 
                'border border-[#b57d57] border-solid'} py-2 rounded-[70px] border-solid flex-grow text-center ${formErrors.attachFile
                 ? 'text-red-700 border-red-700' : '' } `}> {selectedFile ? (<div className='flex place-content-center gap-1'>
                <img src={fileTick} alt='added-file' className='w-3 h-3 place-self-center'/><span>File added successfully</span></div>) :(
                <span>{formErrors.attachFile ? formErrors.attachFile : 'Attach an identification file'}</span>)}</label>
              </div>
             </>
            )}
              <button type='submit' className='bg-[#b57D57] rounded-[50px] object-cover text-[20px] text-[#FFF8E3] px-8 py-2 place-self-center
              drop-shadow-md mt-3 mb-3'>Create account</button>
            <p className="text-center text-sm sm:text-base">Already have an account ?
              <Link to='/signin' className='text-black underline'> Sign in here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
