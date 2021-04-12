const request=require('supertest')
const {Paper}=require("../../src/Validators/Paper")
const {
    paper_data,
    subject_data,
    validateprogram_data,
    university_data
}=require("../data/final")

const {Program}=require("../../src/Validators/Program")
const {University}=require("../../src/Validators/University")
const {Subject}=require("../../src/Validators/Subject")

let server;

describe("/api/paper",()=>{
    beforeEach(() => {server=require("../../index");})
    afterEach(async()=>{
        server.close();
        await Paper.remove({})
        await Program.remove({})
        await University.remove({})
        await Subject.remove({})
    })

    describe("GET/",()=>{
        it("should be able to get all the data",async()=>{
            const paper=new Paper(paper_data)
            await paper.save()
            console.log(paper)
            var res=await request(server).get("/api/paper/"+paper._id)
            expect(res.status).toBe(200)
            // console.log(res.body)
            // expect(res.body.title).toBe(paper.title)
        })
    })
})