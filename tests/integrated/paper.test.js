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
const path=require('path')

let server;

describe("/api/paper",()=>{
    beforeEach(() => {server=require("../../app");})
    afterEach(async()=>{
        server.close();
        await Paper.remove({})
        await Program.remove({})
        await University.remove({})
        await Subject.remove({})
    })

    describe("GET/ single",()=>{
        it("should be able to get all the data",async()=>{
            const paper=new Paper(paper_data)
            await paper.save()

            var res=await request(server).get("/api/paper/single/"+paper._id)
            expect(res.status).toBe(200)
        })
    })

    describe("GET",()=>{
        it("Should be able to papers based on subject id",async()=>{
            const subject=new Subject(subject_data)
            await subject.save()

            paper_data.subject_id=subject._id;
            const paper=new Paper(paper_data)
            await paper.save()
            
            var res=await request(server).get("/api/paper/"+subject._id)
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(1)
        })
    })

    describe("POST",()=>{
        it("Should be able to uplaod the paper",async()=>{
            const filepath=path.join(__dirname,"/files",'Screenshot.png')
            console.log(filepath)

            const subject=new Subject(subject_data)
            await subject.save()

            paper_data.subject_id=String(subject._id);

            var res=await request(server).post("/api/paper")
                                        .attach("link",filepath)
                                        .field("subject_id",paper_data.subject_id)
                                        .field("title",paper_data.title)
                                        .field("year",paper_data.year)
            expect(res.status).toBe(200)
            expect(res.body.year).toBe(paper_data.year)
        })
    })

    describe("PUT /:id",()=>{
        it("Should be able to update the paper data by id",async()=>{
            const subject=new Subject(subject_data)
            await subject.save()

            paper_data.subject_id=subject._id;
            const paper=new Paper(paper_data)
            await paper.save()

            var res=await request(server).put("/api/paper/"+paper._id)
                                        .field("year",2021)
            expect(res.status).toBe(200)
            expect(res.body.year).toBe(2021)
        })
    })

    describe("douwnload /files/:name",()=>{
        it("shoudld be able to download the file",async()=>{
            const filepath=path.join(__dirname,"/files",'Screenshot.png')
            console.log(filepath)

            const subject=new Subject(subject_data)
            await subject.save()

            paper_data.subject_id=String(subject._id);

            var upload=await request(server).post("/api/paper")
                                        .attach("link",filepath)
                                        .field("subject_id",paper_data.subject_id)
                                        .field("title",paper_data.title)
                                        .field("year",paper_data.year)
            var res=await request(server).get("/api/paper/files/"+upload.body.link)
            expect(res.status).toBe(200)
            console.log(res.download)
        })
    })
})