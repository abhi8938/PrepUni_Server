const request=require("supertest")
const {Resources}=require("../../src/Validators/resources")
var{
    resources_data,
    student_data,
    upload_resources_data
}=require("../data/final")
const {Student}=require("../../src/Validators/student")

let server;

describe("/api/resources",()=>{
    beforeEach(() => {server=require("../../app");})
    afterEach(async() =>{
        server.close();
        await Resources.remove({});
        await Student.remove({})
    })

    describe("POST/",()=>{
        it("Should be able to uplaoad the revources data",async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            var res=await request(server).post("/api/resources")
                                        .send(resources_data)
                                        .set("x-auth-token",token)
            expect(res.status).toBe(200)
            console.log(res.body)
        })
    })


    describe("GET/",()=>{
        it("Shoule be able to get the resouces data of the student",async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            upload_resources_data.STID=student._id
            const resource=new Resources(upload_resources_data)
            await resource.save()

            var res=await request(server).get("/api/resources")
                                        .set("x-auth-token",token)
            expect(res.status).toBe(200)
        })
    })

    describe("PUT :id",()=>{
        it("Should be able to update the recourse data by id",async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            upload_resources_data.STID=student._id
            const resource=new Resources(upload_resources_data)
            await resource.save()

            var res=await request(server).put("/api/resources/"+resource._id)
                                        .set("x-auth-token",token)
                                        .send({center:
                                            { address: { address: 'this location', lat: 234, long: 344 },
                                              college: 'new college' }})
            expect(res.status).toBe(200)
            console.log(res.body)
        })
    })
})