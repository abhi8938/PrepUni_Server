import request from "supertest";
import {URL,resources_data} from "../../sample_data.mjs"

var server=URL+"/resources"

describe('/api/resources',()=>{
    describe('POST',()=>{
        it('should be able to upload the data',async()=>{
            console.log(server)
            const res=request(server).post('')
                        .set('x-auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVjZDk5MWQwZDVmZTc5OTlhYTY1YzAiLCJpYXQiOjE2MTY3ODU1MTN9.O9Nb7o5mSRWqDz87aDEO_pugIKq0D6HCqJwu2iEpa1Q')
                        .send(resources_data)
            console.log(res['error'])
            expect(res.status).toBe(200)
        })
    })
})