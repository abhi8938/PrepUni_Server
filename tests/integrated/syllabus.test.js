const request=require("supertest")
const {Syllabus}=require("../../src/Validators/Syllabus")
const {
    syllabus_data,
    subject_data,
    validateprogram_data,
    university_data
}=require("../data/final")
const {Subject}=require("../../src/Validators/Subject")
const {Program}=require("../../src/Validators/Program")
const {University}=require("../../src/Validators/University")

let server;

describe("api/syllabus",()=>{
    beforeEach(() => {server=require("../../index");})
    afterEach(async()=>{
        server.close();
        await Syllabus.remove({})
        await Subject.remove({});
        await Program.remove({})
        await University.remove({});
    })

    describe("GET/",()=>{
        it("Should be able to get all the syllabus data",async()=>{
            const syllabus=new Syllabus(syllabus_data)
            await syllabus.save();

            var res=await request(server).get("/api/syllabus")
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(1)
        })
    })

    describe("GET/:id",()=>{
        it("Should be able to get the data based on the if",async()=>{
            const syllabus=new Syllabus(syllabus_data)
            await syllabus.save();

            var res=await request(server).get("/api/syllabus/"+syllabus._id)
            expect(res.status).toBe(200)
            expect(String(res.body._id)).toBe(String(syllabus._id))
            expect
        })
    })

    describe("/post",()=>{
        it("should be able to uplad the data",async()=>{
            var res=await request(server).post("/api/syllabus")
                                            .send(syllabus_data)

            expect(res.status).toBe(200)
            expect(res.body.subject_id).toBe(syllabus_data.subject_id)
        })
    })

    describe("/PUT",()=>{
        it("should be able to update the data",async()=>{
            const syllabus=new Syllabus(syllabus_data)
            await syllabus.save();

            var res=await request(server).put("/api/syllabus/"+syllabus._id)
                                        .send({
                                            units:['unit1',"unit2","unit3"]
                                        })
            expect(res.status).toBe(200)
            expect(res.body.units.length).toBe(3)
        })
    })
})