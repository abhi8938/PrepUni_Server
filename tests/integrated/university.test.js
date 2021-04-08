const request=require("supertest")
const {University}=require("../../src/Validators/University")
const {university_data}=require("../sample_data")
const path=require('path')

let server;

describe("/api/student",()=>{
    beforeEach(() => {server=require("../../index");})
    afterEach(async()=>{
        server.close();
        await University.remove({})
    })

    describe("GET/",()=>{

        it('should be able to get the student data',async()=>{
            await University.collection.insertOne(university_data)

            const res=await request(server).get("/api/University");
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(1)
            expect(res.body.some(g=>g.name==="some college")).toBeTruthy()
        })  
    })

    describe("GET /:id",()=>{
        it("should be able to get the data based on the ID",async()=>{
            const university=new University(university_data)
            await university.save();

            const res=await request(server).get('/api/University/'+university._id);

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("name",university_data.name)
        })
        it('should pass 404 if invalid id is passed',async()=>{
            const res=await request(server).get('/api/University/1');
            
            expect(res.text).toBe("Invalid Id")
        })
    })

    describe("POST",()=>{
        it("should be able to upload the data",async()=>{
            const filepath=path.join(__dirname,"/files",'Screenshot.png')
            console.log(filepath)
            const res=await request(server).post("/api/University")
                                            .field('name',university_data.name)
                                            .attach('logo',filepath)

            expect(res.body.name).toBe(university_data.name)
            expect(res.status).toBe(200)
        })
    })

    describe("PUT",()=>{
        it("should be able to update the data",async()=>{
            const university=new University(university_data)
            await university.save();
            // console.log(university)
            const res=await request(server).put("/api/University/"+university._id)
                                            .field('name','This is a new name')
            expect(res.status).toBe(200)
            expect(res.body.name).toBe("This is a new name")
        })
    })
}) 