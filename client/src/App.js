import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

//스타일 변수 지정
const styles = theme => ({
  root: {
    width:'100%',//너비가 100퍼센트
    marginTop: theme.spacing.unit*3, // 여백을 3의 가중치만큼 줌
    overflowX: "auto" // 전체 바깥쪽에 해당하는 루트는 오버 플로 발생을 만듬
  },
  table:{
    minWidth: 1080 // 창을 줄여도 1080 픽셀 만큼은 무조건 만들게 해줌
  }
})

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '조현철',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '홍길동',
  'birthday': '960119',
  'gender': '남자',
  'job': '프로그래머'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '이순신',
  'birthday': '921205',
  'gender': '남자',
  'job': '디자이너'
}
]

class App extends Component {
  render() {
    const {classes} = this.props;
    return (//pros<프롭스>라는 개념을 이용해서 한명의 정보를 출력한다.
      <Paper className={classes.root}>
        { //map 함수를 이용해서 여러개를 일일히 호출할 필요가 없어졌다.
          <Table class={classes.table}>
          <TableHead>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableHead>
          <TableBody>
            {customers.map(c => {//map을 이용하면 키값이 필요하다.
            return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})}
          </TableBody>
          </Table>
       }
      </Paper>
      //// Paper은 감싸주기 위해서 사용한다.
      //  <Customer
      //   id={customers[0].id}
      //   image={customers[0].image}
      //   name={customers[0].name}
      //   birthday={customers[0].birthday}
      //   gender={customers[0].gender}
      //   job={customers[0].job}
      // />
      // <Customer
      //   id={customers[1].id}
      //   image={customers[1].image}
      //   name={customers[1].name}
      //   birthday={customers[1].birthday}
      //   gender={customers[1].gender}
      //   job={customers[1].job}
      // />
      // <Customer
      //   id={customers[2].id}
      //   image={customers[2].image}
      //   name={customers[2].name}
      //   birthday={customers[2].birthday}
      //   gender={customers[2].gender}
      //   job={customers[2].job}
      // />
    );
  }
}

export default withStyles(styles)(App);


// import React from 'react';
// import './App.css';
// import Customer from './components/Customer';

// function App() {
//   return (
//     <Customer/>
//   );
// }

// export default App;

