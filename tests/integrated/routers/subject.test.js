import request from "supertest";
import {URL,subject_data} from "../../sample_data.mjs"
const path = require('path');

var server=URL+"/Subject"

describe('api/Subject',()=>{
    describe('/POST',()=>{
        // it('should be able to data',async()=>{
        //     const filepath=path.join(__dirname,"../files",'Screenshot.png')
        //     const res=await request(server).post('').attach('cover',filepath)
        //                                     .field('semester',subject_data['semester'])
        //                                     .field('name',subject_data['name'])
        //                                     .field('description',subject_data['description'])
        //                                     .field('by',subject_data['by'])
        //                                     .field('maximum_marks',subject_data['maximum_marks'])
        //                                     .field('program_id',subject_data['program_id'])
        //     expect(res.status).toBe(200)
        // })
    })
    describe('/GET',()=>{
        it('Should be able to get all the subjects',async()=>{
            const res=await request(server).get('')
            expect(res.status).toBe(200)
        })
        it('should be able to get subjects based on id',async()=>{
            const res=await request(server).get('/605df8fd9e045799c1df1481')
            expect(res.status).toBe(200)
        })
    })
    describe('/PUT',()=>{
        it('Should be able to update the data',async()=>{
            const res=await request(server).put('/605df8fd9e045799c1df1481')
            .field('description','some new description')

            expect(res.status).toBe(200)
        })
       
    })
})