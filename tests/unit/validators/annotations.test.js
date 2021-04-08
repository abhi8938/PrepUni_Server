const {annotation_data} =require ("../../sample_data")
const {Validate,ValidateUpdate} =require ("../../../src/Validators/annotations")


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