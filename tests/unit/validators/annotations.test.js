const {annotation_data,update_annotation_data} =require ("../../data/sample_data")
const {Validate,ValidateUpdate} =require ("../../../src/Validators/annotations")


describe('this annotation validator',()=>{
    it('validate the ducring creating the data',()=>{
        const result = Validate(annotation_data)
        expect(result.error).toBe(undefined)
    })

    it('validate annotations update functions',()=>{
        const result=ValidateUpdate(update_annotation_data)
        expect(result.error).toBe(undefined)
    })
})