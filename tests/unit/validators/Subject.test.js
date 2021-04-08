const {
    subject_data,
    update_subject_data
} =require ("../../sample_data")

const {
    validate,
    validateUpdate
} =require ("../../../src/Validators/Subject")

describe('subject validator',()=>{
    it('validate subject data',()=>{
        const result=validate(subject_data)
        expect(result.error).toBe(undefined)
    })
    it('validate update data',()=>{
        const result=validateUpdate(update_subject_data)
        expect(result.error).toBe(undefined)
    })
})