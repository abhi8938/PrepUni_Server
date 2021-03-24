import {
    university_data
} from "../../sample_data.mjs"

import {
    validate,
    validateUpdate
} from "../../../src/Validators/University.mjs"

describe('university validator',()=>{
    it('validate university data',()=>{
        const result=validate(university_data)
        expect(result.error).toBe(undefined)
    })
    it('validate update data',()=>{
        const result=validateUpdate(university_data)
        expect(result.error).toBe(undefined)
    })
})