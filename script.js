
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
  try {
    if (typeof id !== "number" || id < 1 || id > 10) {
      throw new Error("Invalid Input -- ID must be a number from 1-10");
    }

    const dbs = { db1, db2, db3 };
    const identifyUserFromCentral = await central(id);
    
    if (!dbs[identifyUserFromCentral]) {
      throw new Error(`Invalid database identifier: ${identifyUserFromCentral}`);
    }

    const [databaseInfo, vaultInfo] = await Promise.all([
      dbs[identifyUserFromCentral](id),
      vault(id)
    ]);

    return {
      id,
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
    };
  } catch (error) {
    throw error;  // This ensures the Promise is properly rejected
  }
}

// Test valid ID
async function testValidId() {
    try {
        const data = await getUserData(8);
        console.log('Success for ID 7:', data);
    } catch (error) {
        console.error('Error with ID 7:', error.message);
    }
}

// Test invalid ID (above 10)
async function testInvalidHighId() {
    try {
        const data = await getUserData(11);
        console.log('Success for ID 11:', data);
    } catch (error) {
        console.error('Error with ID 11:', error.message);
    }
}

// Test invalid ID (below 1)
async function testInvalidLowId() {
    try {
        const data = await getUserData(0);
        console.log('Success for ID 0:', data);
    } catch (error) {
        console.error('Error with ID 0:', error.message);
    }
}

// Run all tests
console.log('Running tests...\n');

testValidId();
testInvalidHighId();
testInvalidLowId();