import request from "supertest";
import {URL,paper_data} from "../../sample_data.mjs"
const path = require('path');

var server=URL+"/Paper"

describe("api/Paper",()=>{
    describe("/POST",()=>{
        // it("should be able to post the data",async()=>{
        //     const filepath=path.join(__dirname,"../files",'moby-dick.epub')
        //     const res=await request(server).post('')
        //                     .attach('link',filepath)
        //                     .field('subject_id',paper_data['subject_id'])
        //                     .field('year',paper_data['year'])

        //     expect(res.status).toBe(200)
        // })
    })
    describe('GET/',()=>{
        it("should be able to get all the data",async()=>{
            const res=await request(server).get('')
            expect(res.status).toBe(200)
        })
        it('should be able to get paper based on ID',async()=>{
            const res=await request(server).get('/605e07809e045799c1df1482')
            expect(res.status).toBe(200)
        })
    })
    describe("PUT",()=>{
        // it('should be able to update the data',async()=>{
        //     const res=await request(server).put('/605e07809e045799c1df1482')
        //                     .field('year',2021)
        //     expect(res.status).toBe(200)
        // })
    })
})