import {
    validate,
    validateUpdate
} from "../../../src/Validators/Program.mjs"

import {
    validateprogram_data
} from "../../sample_data.mjs"

describe("Program Validator",()=>{
    it("validate fucntion validator",()=>{
        const result=validate(validateprogram_data)
        expect(result.error).toBe(undefined)
    })
    it('validate update function validator',()=>{
        const result=validateUpdate(validateprogram_data)
        expect(result.error).toBe(undefined)
    })
})