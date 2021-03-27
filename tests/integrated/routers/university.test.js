import request from "supertest";
import {URL} from "../../sample_data.mjs"
import {University} from "../../../src/Validators/University.mjs"
const path = require('path');


var server=URL+'/University'

describe('api/University',()=>{
    describe("GET/",()=>{
        it('Should be able to retrive all the university data',async()=>{
            const res=await request(server).get('')
            expect(res.status).toBe(200)
        })
        // it('should be able to retrive data based on the ID',async()=>{
        //     const res=await request(server).get('/605cb307bfb44b0ea9a36368')
        //     expect(res.status).toBe(200)
        // })
    })
    describe("POST/",()=>{
        // it("Should be able to upload the data",async()=>{
        //     const filepath=path.join(__dirname,"../files",'Screenshot.png')
        //     console.log(filepath)
        //     const res=await request(server).post('')
        //                                 // .field('name', "test")
        //                                 .attach('logo',filepath)
        //                                 .field('name',"test")
                                    
        // expect(res.status).toBe(200)
        // })
    })
    describe("PUT/",()=>{
        // it("should be able to update the data",async()=>{
        //     const filepath=path.join(__dirname,"../files",'Screenshot.png')
        //     console.log(filepath)
        //     const res=await request(server).put('/605de5ccb90be457340b142e')
        //                                 // .field('name', "test")
        //                                 .attach('logo',filepath)
        //                                 .field('name',"updated test")
                                    
        // expect(res.status).toBe(200)
        // })
        
    })
})