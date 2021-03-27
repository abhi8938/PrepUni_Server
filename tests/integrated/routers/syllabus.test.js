import request from "supertest";
import {URL,syllabus_data} from "../../sample_data.mjs"

var server=URL+"/syllabus"

describe('api/syllabus',()=>{
    describe('/POST',()=>{
        // it('should be able to uplaod the data',async()=>{
        //     const res=await request(server).post('')
        //                         .send(syllabus_data)

        //     expect(res.status).toBe(200)
        // })
    })  
    describe("/GET",()=>{
        it('should be able to reqtrive all the data',async()=>{
            const res=await request(server).get('')
            expect(res.status).toBe(200)
        })
        // it('should be able to retrive data based in id',async()=>{
        //     const res=await request(server).get('/605e28dae666db155bf06d50')
        //     expect(res.status).toBe(200)
        // })
    })
    describe('/PUT',()=>{
        // it('should be able to update data based in id',async()=>{
        //     const res=await request(server).put('/605e28dae666db155bf06d50')
        //                     .send({
        //                         units:['unit1']
        //                     })

        //     expect(res.status).toBe(200)
        // })
    })
})