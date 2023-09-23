class ApiFeatures {
    constructor(query,queryStr){
        this.query= query,
        this.queryStr = queryStr
    }

    search(){
        const Search = this.queryStr.keyword ?
         {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"            //this means case insensitive
            },
        } 
            : {};

        this.query = this.query.find({...Search})
        return this 
    }

    filter(){
        const queryCopy = {...this.queryStr };
        const removeElements = ["keyword","page","limit"]

        removeElements.forEach((key=>{
            delete queryCopy[key]
        }))
        this.query = this.query.find(queryCopy)

        //Making price range filter

        // console.log(queryCopy)
        // let queryStr = JSON.stringify(queryCopy);
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) =>`$${key}`);
        // console.log(queryStr)
        // const parsed = JSON.parse(queryStr)
        // this.query = this.query.find(parsed);  
        // console.log(parsed,"after parsing");  
        return this ;
    }

    pagination(resultsPerPage){
        const currentPage = this.queryStr.page || 1 ;
        console.log(currentPage)
        const skip = resultsPerPage * (currentPage - 1 );
        console.log(skip)
         this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
     }
        
}  
   
module.exports = ApiFeatures 