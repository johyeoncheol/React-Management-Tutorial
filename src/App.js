import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

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
  'id': 1,
  'image': 'https://placeimg.com/64/64/3',
  'name': '이순신',
  'birthday': '921205',
  'gender': '남성',
  'job': '디자이너'
}
]

class App extends Component {
  render() {
    return (//pros<프롭스>라는 개념을 이용해서 한명의 정보를 출력한다.
      <div>
        { //map 함수를 이용해서 여러개를 일일히 호출할 필요가 없어졌다.
          customers.map(c => {//map을 이용하면 키값이 필요하다.
            return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})
        }
      </div>
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

export default App;


// import React from 'react';
// import './App.css';
// import Customer from './components/Customer';

// function App() {
//   return (
//     <Customer/>
//   );
// }

// export default App;

