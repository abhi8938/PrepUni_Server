import {
    paper_data
} from "../../sample_data.mjs"

import {
    validate,
    validateUpdate
} from "../../../src/Validators/Paper.mjs"

describe('Paper validators',()=>{
    it('validate paper data',()=>{
        const result=validate(paper_data)
        expect(result.error).toBe(undefined)
    })
    it('update validate function',()=>{
        const result=validateUpdate(paper_data)
        expect(result.error).toBe(undefined)
    })
})