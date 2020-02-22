import React from 'react';//리액트 라이브러리를 사용하기 위해 임포트

/*React.Component는 라이브러리이자 클래스이다. 상속을 이용함*/
class Customer extends React.Component {
    render() { //렌더는 항상 수행 되는 것으로써, 커스터머라는 클래스를 실제로 그리고자 할때 사용
        return (//렌더라는 함수는 항상 리턴이라는 것을 이용해서 반환을 해줘야 한다.
           <div>
                <CustomerProfile id={this.props.id} image={this.props.image} name={this.props.name}/>
                <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
           </div>
        )
    }
}

class CustomerProfile extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}

export default Customer; 
// 다른 컴포넌트에서 커스터머 컴포넌트를 사용할 수 있게 하기 위해 쓴다.