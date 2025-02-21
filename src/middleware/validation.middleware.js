 const validation=(schema)=>{
    return (req,res,next)=>{

    const data={...req.body,...req.params,...req.query}
    if(req.file || req.files?.length){
        data.file= req.file || req.files
        
    }
    console.log(data);
    
    const results=schema.validate(data,{abortEarly:false})
    if(results.error){
        const messagelist=results.error.details.map((obj)=>obj.message)
        return next(new Error(messagelist,{cause:400}))
      
    }
    return next()

    }}
    export default validation