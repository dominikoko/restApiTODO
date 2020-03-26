const {User} = require ('../models/user');
const request = require ('supertest');
const expect = require ('chai').expect;
const app = require('../server');

// describe("GET/:id", ()=>{
//   it("return user if valid id is passed ", async ()=>{
//     const user = new User({
//       username: "harry",
//       email:"harry@potter.Z",
//       password:"awadakedawra"
//     });
//     const res = await request(app).get('/login' + user.userId);
//     expect(res.status).to.equal(200);
    
//     expect(res.body).to.have.property("username password", user.usernamename + user.password)
//   });
//   it("should return 400 error when invalid object id is passed", async () => {
//     const res = await request(app).get("/api/users/1");
//     expect(res.status).to.equal(400);
//   });

//   it("should return 404 error when valid object id is passed but does not exist", async () => {
//     const res = await request(app).get("/api/users/111111111111");
//     expect(res.status).to.equal(404);
//   });

// })

describe("POST /", () => {
  it("should return user when the all request body is valid", async () => {
    const res = await request(app)
      .post("/registerNewUser")
      .send({
        username: "test",
        email: "test@gmail.com",
        password: "testpassword"
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("name", "email","password");
  });
});