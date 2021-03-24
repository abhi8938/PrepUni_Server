import {
    subject_data
} from "../../sample_data.mjs"

import {
    validate,
    validateUpdate
} from "../../../src/Validators/Subject.mjs"

describe('subject validator',()=>{
    it('validate subject data',()=>{
        const result=validate(subject_data)
        expect(result.error).toBe(undefined)
    })
    it('validate update data',()=>{
        const result=validateUpdate(subject_data)
        expect(result.error).toBe(undefined)
    })
})