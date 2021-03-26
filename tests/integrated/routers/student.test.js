import request from "supertest";
import {URL,student_data} from "../../sample_data.mjs"
import {Student} from "../../../src/Validators/student.mjs"

var server=URL+'/students'

describe('api/student',()=>{
    describe('GET/',()=>{
    //     it("should return 200 status code",async()=>{
    //         var res=await request(server).get('')
    //         expect(res.status).toBe(200)
    //     })

        // it("should be able to retrive data based on auth",async()=>{
        //     var res=await request(server)
        //                 .get('/me')
        //                 .set('x-auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVjZDk5MWQwZDVmZTc5OTlhYTY1YzAiLCJpYXQiOjE2MTY2OTg1OTN9.dFrftrVpMH9eaTUcf1FM-gyi85HMj_3mVAqA9lXwh1c')
        //     expect(res.status).toBe(200)
        // })
    })
    describe("POST/",()=>{
        // it('Should be able to post the data',async()=>{
        //     var res=await request(server)
        //                     .post('')
        //                     .send(student_data)

        //     console.log(res.headers["x-auth-token"])
        //     expect(res.status).toBe(200)
        // })
        // it("Should be able to authenticate",async()=>{
        //     console.log(student_data['email'])
        //     var res=await request(server)
        //                     .post('/authenticate')
        //                     .send({
        //                         id:student_data['email'],
        //                         password:student_data['password']
        //                     })
        //     expect(res.status).toBe(200)
        // })
    })
    describe("PUT/",()=>{
        // it("should be able to update the password",async()=>{
        //     var res=await request(server)
        //                     .put('/reset')
        //                     .send({
        //                         id:"8527670484",
        //                         password:"123456"
        //                     })
        //     expect(res.status).toBe(200)
        // })
        // it("Should be able to update the data",async()=>{
        //     var res=await request(server)
        //                     .put("")
        //                     .set({'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVjZDk5MWQwZDVmZTc5OTlhYTY1YzAiLCJpYXQiOjE2MTY3MDAxNzd9.55wPdZ5V0r7VtgjxSjMKgcGNBuM_5z3aWcnwZZyPc5U'})
        //                     .send({
        //                         semester:3,
        //                         device_token:"some token"
        //                     })

        //     expect(res.status).toBe(200)
        // })
    })
})