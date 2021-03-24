import {
    validate,
    updatevalidate
} from "../../../src/Validators/Syllabus.mjs"

import {
    syllabus_data
} from "../../sample_data.mjs"

describe('syllabus validator',()=>{
    it('validate syllabus data',()=>{
        const result=validate(syllabus_data)
        expect(result.error).toBe(undefined)
    })
    it('validate update data',()=>{
        const result=updatevalidate(syllabus_data)
        expect(result.error).toBe(undefined)
    })
})