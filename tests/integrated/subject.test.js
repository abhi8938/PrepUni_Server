const request=require('supertest')
const {Subject}=require("../../src/Validators/Subject")
const {
    subject_data,
    syllabus_data,
    validateprogram_data
}=require("../data/final")
const {Program}=require("../../src/Validators/Program")
const {Syllabus}=require("../../src/Validators/Syllabus")
const path = require('path');

let server;

describe("/api/subject",()=>{
    beforeEach(() => {server=require("../../app");})
    afterEach(async()=>{
        server.close();
        await Program.remove({})
        await Subject.remove({})
        await Syllabus.remove({})
    })

    describe("/single/:id",()=>{
        it("should be able to get the data based on id",async()=>{
            const subject=new Subject(subject_data)
            await subject.save()   

            var res=await request(server).get("/api/subject/single/"+subject._id)

            expect(res.status).toBe(200)
            expect(res.body.cover).toBe(subject.cover)
        })
    })

    describe("/post",()=>{
        it("should be able to upload the data",async()=>{
            const filepath=path.join(__dirname,"/files",'Screenshot.png')
            console.log(filepath)
            
            var res=await request(server).post("/api/subject")
                                .field('semester',subject_data['semester'])
                                .field('name',subject_data['name'])
                                .field('description',subject_data['description'])
                                .field('by',subject_data['by'])
                                .field('maximum_marks',subject_data['maximum_marks'])
                                .field('program_id',subject_data['program_id'])
                                .field('code',subject_data['code'])
                                .attach('cover',filepath)

            expect(res.status).toBe(200)
            expect(res.body.by).toBe(subject_data.by)
        })
    })

    describe("/put/:id",()=>{
        it("should be able to update the data",async()=>{
            var subject=new Subject(subject_data)
            await subject.save()   

            var res=await request(server).put("/api/subject/"+subject._id)
                                            // .field("by","This new data")    
                                            .send({by:"This new new data"})
            expect(res.status).toBe(200)
            console.log(res.body)
        })
    })

    describe("/get",()=>{
        it("shoudl be able to get the all the data related to subjects",async()=>{
            const program=new Program(validateprogram_data)
            await program.save()

            subject_data.program_id=program._id
            var subject=new Subject(subject_data)
            await subject.save()

            syllabus_data.subject_id=subject._id
            var syllabus=new Syllabus(syllabus_data)
            await syllabus.save()

            var res=await request(server).get("/api/subject/"+program._id)

            expect(res.status).toBe(200)
            console.log(res.body)
        })
    })
})