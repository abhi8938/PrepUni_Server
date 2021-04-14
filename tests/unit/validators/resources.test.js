const {resources_data} =require ("../../data/sample_data")
const {Validate,ValidateUpdate} =require ("../../../src/Validators/resources")

describe("resources validatoe",()=>{
    it('should valid proper valid recorces data',()=>{
        const result=Validate(resources_data)
        expect(result.error).toBe(undefined)
    })
    it('should be able to dectect proper update field',()=>{
        const result=ValidateUpdate(resources_data)
        expect(result.error).toBe(undefined)
    })
})