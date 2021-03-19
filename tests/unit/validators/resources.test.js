import {resources_data} from "../../sample_data.mjs"
import {Validate,ValidateUpdate} from "../../../src/Validators/resources.mjs"

describe("resources validatoe",()=>{
    it('should valid proper valid recorces data',()=>{
        const result=Validate(resources_data)
        expect(result.error).toBe(undefined)
    })
})

describe("rasourse validate update",()=>{
    it('should be able to dectect proper update field',()=>{
        const result=ValidateUpdate(resources_data)
        expect(result.error).toBe(undefined)
    })
})
