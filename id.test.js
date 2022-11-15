const supertest  = require('supertest');
const app = require('./index.js'); 

describe("POST /insert", () => {
    describe("given all values of employee", () => {
  
      test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/insert").send({
            id: "101",
            bd: "1991-09-12",
            fn: "John",
            ln: "Smith",
            hd: "2021-07-23"
        })
        expect(response.statusCode).toBe(200)
      })
    })
})
