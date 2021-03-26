import {annotation_data} from "../../sample_data.mjs"
import {Validate,ValidateUpdate} from "../../../src/Validators/annotations.mjs"
// import server from "../../../server.mjs"


describe('this annotation validator',()=>{
    it('validate the ducring creating the data',()=>{
        const result = Validate(annotation_data)
        expect(result.error).toBe(undefined)
    })

    it('validate annotations update functions',()=>{
        const result=ValidateUpdate(annotation_data)
        expect(result.error).toBe(undefined)
    })
})