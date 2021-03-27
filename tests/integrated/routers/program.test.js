import request from "supertest";
import {URL,validateprogram_data} from "../../sample_data.mjs"

var server=URL+"/Program"

describe('api/Program',()=>{
    describe('POST/',()=>{
        // it('should be able to POSt the data',async()=>{
        //     const res=await request(server).post('')
        //                         .send(validateprogram_data)
            
        //     expect(res.status).toBe(200)
        // })
    })

    describe('GET/',()=>{
        it('should be able to get all the data',async()=>{
            const res=await request(server).get('')
            expect(res.status).toBe(200)
        })
        // it('should be able to get data based on the id',async()=>{
        //     const res=await request(server).get('/605deebfb90be457340b1430')
        //     expect(res.status).toBe(200)
        // })
    })

    describe('PUT/',()=>{
        // it('should be able to update the data',async()=>{
        //     const res=await request(server).put('/605deebfb90be457340b1430')
        //                                     .send({
        //                                         'name':'new df name'
        //                                     })
        //     expect(res.status).toBe(200)
        // })
    })
})