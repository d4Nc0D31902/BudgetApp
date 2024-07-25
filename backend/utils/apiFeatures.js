class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
        // console.log(this.query,this.queryStr)
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        const clonedObj = { ...keyword };
        // console.log(clonedObj,keyword)
        // console.log(this.query.find({...keyword}))

        // console.log(keyword,this.queryStr,this.query.find(keyword));
        this.query = this.query.find( {...keyword });
        // console.log(this)
        return this;
    }

    //products?keyword=apple&category=Laptops
    //products?keyword=apple&category=Laptops&price[gte]=1&price[lte]=200
    filter() {

        const queryCopy = { ...this.queryStr };
        console.log(queryCopy);
        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        console.log(queryCopy);
        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        console.log(queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        console.log(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }


}
module.exports = APIFeatures