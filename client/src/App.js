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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

//스타일 변수 지정
const styles = theme => ({
  root: {
    width:'100%',//너비가 100퍼센트
    minWidth:1080
    //marginTop: theme.spacing.unit*3, // 여백을 3의 가중치만큼 줌
    //overflowX: "auto" // 전체 바깥쪽에 해당하는 루트는 오버 플로 발생을 만듬
  },
  menu:{
    marginTop :15,
    marginBottom: 15,
    display:'flex',
    justifyContent:'center'
  },
  paper:{
    marginLeft : 18,
    marginRight : 18
  },
  // table:{
  //   minWidth: 1080 // 창을 줄여도 1080 픽셀 만큼은 무조건 만들게 해줌
  // },
  progress:{
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  TableHead:{
    fontSize:'1.0rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
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
      completed: 0,
      searchKeyword:''
    }
  }

  stateRefresh = () =>{
    this.setState({
      customers: '', 
      completed: 0,
      searchKeyword:''
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))//값을 받아오고 이름은 res로 바뀌고
      .catch(err => console.log(err));

  }

  progress=()=>{
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed+1});
  }

  
  handleValueChange =(e)=> {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
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
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
    }
    const {classes} = this.props;
    const cellList = ["번호","이미지","이름","생년월일","성별","직업","설정"];
    return (//pros<프롭스>라는 개념을 이용해서 한명의 정보를 출력한다.
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
        <Paper className={classes.paper}>
          { //map 함수를 이용해서 여러개를 일일히 호출할 필요가 없어졌다.
            <Table class={classes.table}>
              <TableHead>
                {cellList.map(c=>{
                  return <TableCell className={classes.TableHead}>{c}</TableCell>
                })}
              </TableHead>
              <TableBody>
                {this.state.customers ? 
                  filteredComponents(this.state.customers) :
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

