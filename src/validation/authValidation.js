import * as Yup from 'yup'

export const registerInitialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
}
export const registerValidationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string().required("password is required").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    password_confirmation: Yup.string().required("confirm password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
})  
export const loginInitialValues = {
    email: '',
    password: '',
}
export const loginValidationSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
    password: Yup.string().required("password is required"),
})  
export const attendanceInitialValues = {
    status: '',
    date_time: '',
}
export const attendanceValidationSchema = Yup.object({
    status: Yup.string().required(),
    date_time: Yup.string().required(),
})  