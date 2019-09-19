import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// 校验包 prop-types
class Person extends React.Component{ // 上下文
    static propTypes = {
        name:PropTypes.string.isRequired,
        age:PropTypes.number,
        gender:PropTypes.oneOf(['男','女']),
        salary(a,b,c){ // 自定义校验
            console.log(a[b])
            console.log(this)
            throw new Error();
        },
        position: PropTypes.shape({
            x:PropTypes.string,
            y:PropTypes.string
        }),
        hobby:PropTypes.arrayOf(['string'])
    }
    render(){
        console.log(this.props)
        return <h1>hello</h1>
    }
}
// Person.propTypes = {

// }
let person = {
    name:'姜文',
    age:18,
    gender:'男1',
    salary:100,
    position:{
        x:100,y:100
    },
    hobby:['吃饭','睡觉']
}
ReactDOM.render(<Person {...person}/>,document.getElementById('root'));