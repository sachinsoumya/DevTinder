# DevTinder Apis

 ## Auth Router

   - POST /SignUp
   - POST /Login
   - POST /Logout
   

 ## profileRouter

   - GET /Profile/view
   - PATCH /profile/edit
   - PATCH /profile/password

 ## connectionRequestRouter
   -POST /request/send/:status/:userId
   -POST /request/review/:status/:requestId
   -POST /request/review/accepted/:req
   
   uestId
   -POST /request/review/accepted/:requestId

 ## userRouter
  -GET user/connections
  -GET user/requests/received
  -GET user/feed

Status : interested , ignored , accepted , rejected
