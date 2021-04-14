const {
    university_data
} =require ("../../data/sample_data")

const {
    validate,
    validateUpdate
} =require( "../../../src/Validators/University")

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