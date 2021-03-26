import request from "supertest";
import {URL} from "../../sample_data.mjs"
import {University} from "../../../src/Validators/University.mjs"

var server=URL+'/University'

describe('api/University',()=>{
    // describe("GET/",()=>{
    //     it('Should be able to retrive all the university data',async()=>{
    //         const res=await request(server).get('')
    //         expect(res.status).toBe(200)
    //     })
    //     it('should be able to retrive data based on the ID',async()=>{
    //         const res=await request(server).get('/605cb307bfb44b0ea9a36368')
    //         expect(res.status).toBe(200)
    //     })
    // })
    // describe("POST/",()=>{
    //     it("Should be able to upload the data",async()=>{
    //         const res=await request(server).post('')
    //                                     .send({
    //                                         name:"test",
    //                                         logo:"/Screenshot from 2021-01-16 21-58-16.png"
    //                                     })
    //     expect(res.status).toBe(200)
    //     })
    // })
})