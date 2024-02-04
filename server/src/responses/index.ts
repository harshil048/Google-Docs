const userNotFound: Array<ResponseMessage> = [
  {
    msg: "Your email or password is incorrect"
  }
]
const emailNotVerified: Array<ResponseMessage> = [
  {
    msg: "Please verify your email"
  }
]
const resetPassword: Array<ResponseMessage> = [
  {
    msg: "You will receive email"
  }
]

export {userNotFound, emailNotVerified, resetPassword};