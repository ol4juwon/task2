// const debug = require("debug")("app:debug");
// const userRepository = require('../../app/v1/users/users.repository')
// const UserModel = require('../../app/v1/users/users.model');

// // const { MongoMemoryServer } = require('mongodb-memory-server');
// // const mongod = new MongoMemoryServer();
// let user = {
//     name: "olajuwon",
//     email: "olajuwon@mail.com",
//     dob: "1999-27-03",
//     occupation: "tracking"
// };
// /**
//  * @jest-environment node
//  */
// describe("User Repository test", () => {
//     beforeAll(() => {

//     })
//     afterEach(() => {
//         // userRepository.truncate()
//         // .then()
//         // .catch();
//     })

//     it("search by name should return a valid user", () => {
//         let name = "olajuwon";
//         userRepository.findOne({name})
//         .then(u =>{
//             console.log(u)
//             expect(u.email).toBe("");
//             expect(u.name).toBe("wwww");
//             expect(u.phone).toBe(user.phone);
//             done()
//         })
        
//     })
// })