const {
    paper_data
} =require ("../../sample_data")

const {
    validate,
    validateUpdate
} =require ("../../../src/Validators/Paper")

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