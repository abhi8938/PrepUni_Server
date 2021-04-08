const {
    validate,
    updatevalidate
} =require ("../../../src/Validators/Syllabus")

const {
    syllabus_data
} =require ("../../sample_data")

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