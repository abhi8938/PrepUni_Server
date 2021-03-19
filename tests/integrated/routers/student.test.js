// import server from "../../../server.mjs";
import request from "supertest";
// let server;
// import {server} from "../../../server.mjs"
import server from "../../../server.mjs"

describe('api/student',()=>{
    // beforeEach(()=>{server})
    // afterEach(()=>{server.close()})
    describe('GET/',()=>{
        it("should return 200 status code",async()=>{
            const res=await request(server).get('/')
            expect(res.status).toBe(200)
        })
    })
})