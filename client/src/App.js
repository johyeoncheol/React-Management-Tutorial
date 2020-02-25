import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

//스타일 변수 지정
const styles = theme => ({
  root: {
    width:'100%',//너비가 100퍼센트
    marginTop: theme.spacing.unit*3, // 여백을 3의 가중치만큼 줌
    overflowX: "auto" // 전체 바깥쪽에 해당하는 루트는 오버 플로 발생을 만듬
  },
  table:{
    minWidth: 1080 // 창을 줄여도 1080 픽셀 만큼은 무조건 만들게 해줌
  },
  progress:{
    margin: theme.spacing.unit * 2
  }
});

/*
리액트가 처음 컴포넌트를 실행할 때 따르는 순서

1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

*/

/*
pros 또는 state 가 변경 되는 경우 아래 함수가 만들어 진다.
pros or state => shouldComponentUpdate()

*/
class App extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      customers:'',
      completed: 0
    }
  }

  stateRefresh = () =>{
    this.setState({
      customers: '', 
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))//값을 받아오고 이름은 res로 바뀌고
      .catch(err => console.log(err));

  }

  progress=()=>{
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed+1});
  }

  //Api에 접근을 해서 데이터를 받아오는 작업
  //라이브러리라는 점에서 생명 주기가 존재함
  //마운트가 되었을 때 실행이 된다.
  componentDidMount(){
    this.timer = setInterval(this.progress,20);//0.02초마다 프로그래스 함수를 실행
    this.callApi()
      .then(res => this.setState({customers: res}))//값을 받아오고 이름은 res로 바뀌고
      .catch(err => console.log(err));
  }
  callApi = async () =>{
    const response = await fetch('/api/customers'); //접속하고자 하는 api의 주소
    const body = await response.json();// 고객 목록이 json 형태로 출력이 되고 이를 받아옴
    return body;
  }
  render() {
    const {classes} = this.props;
    return (//pros<프롭스>라는 개념을 이용해서 한명의 정보를 출력한다.
      <div>
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
                <TableCell>설정</TableCell>
              </TableHead>
              <TableBody>
                {this.state.customers ? this.state.customers.map(c => {//map을 이용하면 키값이 필요하다.
                  return (<Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)
                }) :
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          }
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
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

