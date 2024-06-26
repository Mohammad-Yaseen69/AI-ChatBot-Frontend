import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { FormField, FormStructure } from "../../components"
import { motion } from "framer-motion"
import { resetPassword } from "../../store/userslice"

const ResetPassword = () => {
  const { handleSubmit, register } = useForm()
  const email = useSelector(state => state.user.userEmailForgotPassword)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (data) => {
    if (data) {
      const modifiedData = {
        ...data,
        email
      }
      const response = await dispatch(resetPassword(modifiedData))

      if (response.type === "resetPassword/fulfilled" && response.payload?.success) {
        navigate("/login")
      }
    }
  }
  return (
    <FormStructure onSubmit={handleSubmit(submit)} name="Reset Your Password">
      <FormField id="newPassword" registerFunction={register} type="password" name="newPassword" placeholder="Enter Your New password" />
      <motion.input
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        type="submit" className="bg-blue-600 px-12 py-3  text-white font-semibold self-center rounded-full cursor-pointer" value="Submit" />
    </FormStructure>
  )
}

export default ResetPassword