# Blood-Bank-Apis

Api urls

//hospital
http://localhost:8000/api/hospital/login   //hospital login
http://localhost:8000/api/hospital/register
http://localhost:8000/api/hospital/delete/64083ae8d7c4c32c71000f13 //delete blood samples
http://localhost:8000/api/hospital/blood-sample  //to add blood samples
/api/hospital/blood-sample/:sampleId // to update the sample
/api/hospital/all-blood-sample   //all available blood samples
/api/hospital/delete/:id // to delete blood samples
/api/hospital/blood-samples //blood samples added by current hospital
/api/hospital/blood-requests //to see all the blood requests of a current hospital

//user apis
http://localhost:8000/api/user/login //user login
http://localhost:8000/api/user/register 
http://localhost:8000/api/user/request-blood/64088d4d1ca3c6327840e1ed  // request blood
