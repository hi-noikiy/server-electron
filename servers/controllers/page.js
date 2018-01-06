/**
 * 该控制器web 网页业务逻辑
 */

exports.index = async(ctx)=>{
    console.log('index')
    ctx.response.type='application/json';
    ctx.response.body={
        success:'index'
    }
}