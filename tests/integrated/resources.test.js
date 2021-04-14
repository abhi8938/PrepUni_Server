const request=require("supertest")
const {Resources}=require("../../src/Validators/resources")
var{
    resources_data,
    student_data
}=require("../data/final")
const {Student}=require("../../src/Validators/student")

let server;

describe("/api/resources",()=>{
    beforeEach(() => {server=require("../../index");})
    afterEach(async() =>{
        server.close();
        await Resources.remove({});
        await Student.remove({})
    })

    describe("POST/",()=>{
        it("Should be able to uplaoad the revources data",async()=>{
            var student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            var res=await request(server).post("/api/resources")
                                        .send(resources_data)
                                        .set("x-auth-token",token)
            expect(res.status).toBe(200)
            console.log(res.body)
        })
    })

})