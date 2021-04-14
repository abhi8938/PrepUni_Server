const request=require('supertest')
const {Program}=require("../../src/Validators/Program")
const {
    validateprogram_data,
    university_data
}=require("../data/final")
const {University}=require("../../src/Validators/University")

let server;
describe("/api/program",()=>{
    beforeEach(() => {server=require("../../app");})
    afterEach(async() =>{
        server.close();
        await Program.remove({});
        await University.remove({});
    })

    describe("GET",()=>{
        it("should be able to get all the program data",async()=>{
            const program=new Program(validateprogram_data)
            await program.save()

            var res=await request(server).get("/api/program")

            expect(res.status).toBe(200)
            expect(res.body.length).toBe(1)
        })
    })

    describe("GET/:id",()=>{
        it("should be able to get based on the id",async()=>{
            const program=new Program(validateprogram_data)
            await program.save()

            var res=await request(server).get("/api/program/"+program._id)

            expect(res.status).toBe(200)
            expect(res.body.name).toBe(program.name)
        })
    })

    describe("POST",()=>{
        it("should be able to upload the data",async()=>{
            var res=await request(server).post("/api/program")
                                            .send(validateprogram_data)
            expect(res.status).toBe(200)
            expect(res.body.name).toBe(validateprogram_data.name)
        })
    })

    describe("PUT/:id",()=>{
        it("Should be able to update the data",async()=>{
            const program=new Program(validateprogram_data)
            await program.save()

            var res=await request(server).put("/api/program/"+program._id)
                                            .send({name:"this is new name"})
            expect(res.status).toBe(200)
            expect(res.body.name).toBe("this is new name")
        })
    })
})