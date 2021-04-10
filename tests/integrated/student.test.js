const request=require("supertest")
const {Student}=require("../../src/Validators/student")
const bcrypt=require('bcrypt')
var {
    student_data,
    validateprogram_data,
    university_data,
    update_student,
    subject_data,
    syllabus_data,
    paper_data
            }=require("../data/final")
const {Program}=require("../../src/Validators/Program")
const {University}=require("../../src/Validators/University")
const {Subject}=require("../../src/Validators/Subject")
const {Syllabus}=require("../../src/Validators/Syllabus")
const {Paper}=require("../../src/Validators/Paper")
const {Subscript}=require("../../src/Validators/subscription")
const {Annotations}=require("../../src/Validators/annotations")
const cons = require("consolidate")
let server;

describe("/api/student",()=>{
    beforeEach(() => {server=require("../../index");})
    afterEach(async()=>{
        server.close();
        await Student.remove({})
        await Program.remove({})
        await University.remove({})
        await Subject.remove({})
        await Paper.remove({})
        await Syllabus.remove({})
    })

    describe("GET",()=>{
        it("Get all the data of the students",async()=>{
            const student_=new Student(student_data)
            await student_.save()
            var res=await request(server).get("/api/students")
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(1)
        })
    })

    describe("GET/me",()=>{
        it('Should be able to get the  data of the student',async()=>{
            const program=new Program(validateprogram_data)
            await program.save()
            // console.log(program)
            const university=new University(university_data)
            await university.save()
            // console.log(university)
            student_data.program=program._id
            student_data.university=university._id

            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            var res=await request(server).get("/api/students/me")
                                        .set('x-auth-token',token)
            // console.log(res.body.university._id)
            // console.log(university._id)
            expect(res.status).toBe(200)
            expect(res.body.university._id).toBe(String(university._id))
            expect(res.body.program._id).toBe(String(program._id))
        })  
    })

    describe("POST/authenticate",()=>{
        it("should be able to get the authenticate the post ",async()=>{
            const student=new Student(student_data)
            const salt = await bcrypt.genSalt(13);
            student.password = await bcrypt.hash(student.password, salt);
            await student.save()
            
            const student_=await Student.findByIdAndUpdate(
                student._id,
                {isloggedin:false},
                {new :true}
            )
                // console.log(student_)
                // console.log(student_data.email)
                // console.log(student_data.password)
                const credentials={
                    id:student_data.user_name,
                    password: student_data.password
                }
                // console.log("credentials",credentials)
                var res=await request(server).post("/api/students/authenticate")
                                .send(credentials)
            expect(res.status).toBe(200)
        })
    })

    describe("POST/logout",()=>{
        it("Should be ablt to logout from all the devices",async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            const res=await request(server).post("/api/students/logout")
                                    .set('x-auth-token',token)
            
            expect(res.status).toBe(200)
            const student_=await Student.findById(student._id)
            expect(student_.isloggedin).toBe(false)
        })
    })

    describe("POST/",()=>{
        it('Should be able to upload the student data',async()=>{
            var res=await request(server).post("/api/students")
                                .send(student_data)
            expect(res.status).toBe(200)
            expect(res.body.first_name).toBe(student_data.first_name)
        })  
    })

    describe("PUT/",()=>{
        it('Should be able to update the data',async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            const res=await request(server).put("/api/students")
                                            .set("x-auth-token",token)
                                            .send(update_student)
            expect(res.status).toBe(200)
            expect(res.body.semester).toBe(5)
        })
    })

    describe("reset/",()=>{
        it('Should be able to update the password',async()=>{
            const student=new Student(student_data)
            const salt = await bcrypt.genSalt(13);
            student.password = await bcrypt.hash(student.password, salt);
            await student.save()
            const token=student.generateAuthToken()

            const res=await request(server).put("/api/students/reset")
                                            .set("x-auth-token",token)
                                            .send({password:"1234567"})
            expect(res.status).toBe(200)
        })
    })
})