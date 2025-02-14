
// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./database.js";

// central: database identifies which database the users are stored within
// const val = await central(3);
// console.log(val); // returns-> db1

// // db1, db2. db3: databases contain the user's basic information, including username, website, and company.
// const val2 = await db1(3)
// console.log(val2);

// // val: The personal data for each user is contained within the vault database since its access and usage is restricted by law.
// const val3 = await vault(3);
// console.log(val3);




async function getUserData(id) {
  // const dbs = {
  //   db1: db1,
  //   db2: db2,
  //   db3: db3,
  // };

  try{
    if (typeof id !== "number" || id <1 || id>10 ) throw new Error("Invalid Input -- ID must be a number from 1-10");
    
  

  const dbs ={db1, db2, db3}
  
  const identifyUserFromCentral = await central(id)
  
  const [databaseInfo, vaultInfo] = await Promise.all([dbs[identifyUserFromCentral](id), vault(id)])
  return {
    // id: id,
  name: vaultInfo.name,
  username: databaseInfo.username,
  email: vaultInfo.email,
  address: {
    street: vaultInfo.address.street,
    suite: vaultInfo.address.suite,
    city: vaultInfo.address.city,
    zipcode: vaultInfo.address.zipcode,
  },
  geo: {
    lat: vaultInfo.lat,
    lng: vaultInfo.lng,
  },
    phone: vaultInfo.phone,
   website: databaseInfo.website,
  company: {
    name: databaseInfo.company.name,
    catchPhrase: databaseInfo.company.catchPhrase,
    bs: databaseInfo.company.bs,
  }
}


} catch (error) {
  console.error(error)
};
}
console.log(getUserData(3));

getUserData(3).then((data)=> console.log(data))
 

