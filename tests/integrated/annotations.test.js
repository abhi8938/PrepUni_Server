const request=require("supertest")
const {Paper}=require("../../src/Validators/Paper")
const {Student}=require("../../src/Validators/student")
const {Annotations}=require("../../src/Validators/annotations")
const {Subject}=require("../../src/Validators/Subject")
const {Program}=require("../../src/Validators/Program")
const {University}=require("../../src/Validators/University")
var {
    annotation_data,
    paper_data,
    student_data,
    subject_data,
    validateprogram_data,
    university_data
}=require("../data/final")

let server

describe("/api/annotations",()=>{
    beforeEach(() => {server=require("../../index");})
    afterEach(async()=>{
        server.close();
        await Student.remove({})
        await Paper.remove({})
        await Student.remove({})
        await Annotations.remove({})
        await Subject.remove({})
        await Program.remove({})
        await University.remove({})
    })

    describe("GET/",()=>{
        it("Should be able to get all the annotations under on student",async()=>{
            const student=new Student(student_data)
            await student.save()

            const university=new University(university_data)
            await university.save()

            validateprogram_data.university_id=university._id
            const program=new Program(validateprogram_data)
            await program.save()

            subject_data.program_id=program._id
            const subject=new Subject(subject_data)
            await subject.save()

            paper_data.subject_id=subject._id
            const paper=new Paper(paper_data)
            await paper.save()

            annotation_data.STID=student._id
            var annotation=new Annotations(annotation_data)
            await annotation.save()

            annotation_data.paper_id=paper._id
            annotation_data.STID=student._id
            annotation=new Annotations(annotation_data)
            await annotation.save()

            const token=student.generateAuthToken()

            const res=await request(server).get('/api/annotations')
                                            .set("x-auth-token",token)
            
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
        })
    })

    describe("POST/",()=>{
        it("Should be able to upload the annotations data",async()=>{
            const student=new Student(student_data)
            await student.save()

            const university=new University(university_data)
            await university.save()

            validateprogram_data.university_id=university._id
            const program=new Program(validateprogram_data)
            await program.save()

            subject_data.program_id=program._id
            const subject=new Subject(subject_data)
            await subject.save()

            paper_data.subject_id=subject._id
            const paper=new Paper(paper_data)
            await paper.save()

            annotation_data.paper_id=paper._id
            annotation_data.STID=student._id

            const token=student.generateAuthToken()

            const res=await request(server).post('/api/annotations')
                                            .set('x-auth-token',token)
                                            .send(annotation_data)
            expect(res.status).toBe(200)
            console.log(res.body)
        })
    })

    describe("GET/:id",()=>{
        it("should be able get annotations based on the id",async()=>{
            const student=new Student(student_data)
            await student.save()

            const university=new University(university_data)
            await university.save()

            validateprogram_data.university_id=university._id
            const program=new Program(validateprogram_data)
            await program.save()

            subject_data.program_id=program._id
            const subject=new Subject(subject_data)
            await subject.save()

            paper_data.subject_id=subject._id
            const paper=new Paper(paper_data)
            await paper.save()

            var annotation
            // annotation_data.STID=student._id
            // annotation=new Annotations(annotation_data)
            // await annotation.save()

            annotation_data.paper_id=paper._id
            annotation_data.STID=student._id
            annotation=new Annotations(annotation_data)
            await annotation.save()

            const token=student.generateAuthToken()

            const res=await request(server).get('/api/annotations/'+annotation._id)
                                            .set("x-auth-token",token)
            
            expect(res.status).toBe(200)
        })
    })

    describe("PUT/",()=>{
        it("should be able to update the data",async()=>{
            const student=new Student(student_data)
            await student.save()

            const university=new University(university_data)
            await university.save()

            validateprogram_data.university_id=university._id
            const program=new Program(validateprogram_data)
            await program.save()

            subject_data.program_id=program._id
            const subject=new Subject(subject_data)
            await subject.save()

            paper_data.subject_id=subject._id
            const paper=new Paper(paper_data)
            await paper.save()

            annotation_data.paper_id=paper._id
            annotation_data.STID=student._id
            console.log(annotation_data)
            const annotation=new Annotations(annotation_data)
            await annotation.save()

            const token=student.generateAuthToken()
            console.log(annotation,"Annotations data",annotation._id)

            const res=await request(server).put('/api/annotations/'+student._id)
                                            .set('x-auth-token',token)
                                            .send({ann:[{color:"New color"}]})
            expect(res.status).toBe(200)
            console.log(res.body)
        })
    })
})