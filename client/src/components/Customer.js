import React from 'react';//리액트 라이브러리를 사용하기 위해 임포트
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

/*React.Component는 라이브러리이자 클래스이다. 상속을 이용함*/
class Customer extends React.Component {
    render() { //렌더는 항상 수행 되는 것으로써, 커스터머라는 클래스를 실제로 그리고자 할때 사용
        return (//렌더라는 함수는 항상 리턴이라는 것을 이용해서 반환을 해줘야 한다.
            <TableRow> 
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile" style={{width:64,height:64}}/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>//사용자를 한줄에 담기 위해서 사용
        )
    }
}

export default Customer; 
// 다른 컴포넌트에서 커스터머 컴포넌트를 사용할 수 있게 하기 위해 쓴다.