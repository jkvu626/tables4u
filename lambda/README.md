# How to Create an Endpoint
## Code
Create a folder from here with the same name as your eventual lambda function. Create a `package.json` containing `{  "dependencies": {"mysql": "^2.18.1"}}` and run `npm i` to be able to use mysql. If you need other packages then `npm install` them now, as you must upload all dependencies with your code. Put your actual controller code in a file called `index.mjs`. 
## Archive
Zip `node_modules/` and `index.mjs` into a zipfile. NOTE: zipping from the terminal creates corrupt archives in the eyes of AWS so do it from the file explorer. 
## Upload
On AWS create a new Lambda function with the same name as the folder containing your code. Use default settings, except the default execution role should be `Executor` rather than creating a new one. Select `Upload From> .zip File` and select your archive.
## Security Config
Navigate to `Configuration> VPC> Edit` and select the only VPC group we have. Select all three `us-east-2` subnets and and the only available security group.
## API Setup
Navigate to the API gateway and select `tables4u`. Click `Create resource` and name the resource whatever the API spec says. Make sure the resource path is set to `/` and CORS is enabled. Click on your method and select `Create method`. Select the approproate method (usually `POST`) and then select your lambda function. Click `Create method` then click `Deploy API`. Choose `tables4u` for the stage. Finally, go back to `Resources`, select your resource, and click `Enable CORS`. Make sure all methods are checked, then click `Save`. 
## Accessing
You can now access the API endpoints at [https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/[YOUR ENDPOINT]](about:null). 