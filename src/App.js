import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react'

// list 컨포넌트 
function List({data, setData}) {
	const remove = (id)=>{
		// console.log(id)
		// console.log(setData)

		axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
		.then(res=>{
			console.log(res.data)
		})
	}

	return(
		<>
			{
				data.map(obj=>(
					<li key={obj.id}>
						{obj.msg}
						<button onClick={() => {remove(obj.id)}}>삭제</button>
					</li>
				))
			}
		</>
	)
}

// write 컨포넌트 
function Write() {
	const insert = (e) => {
		e.preventDefault();
		
		let msg = e.target.msg.value;
		// server index.js 에 보면 post /insert 에 해달라고 한거 있음 
		axios.post(`${process.env.REACT_APP_SERVER}/insert`, {msg})
		.then(res=> {
			console.log(res.data);
		})

		// console.log(e.target.msg.value)
	}
	return(
		<div>
				<form onSubmit={insert}>
					<input type="text" name="msg" />
					<input type="submit" name="저장 " />
				</form>
			</div>
	)
}

function App() {
	const [data, setData] = useState([]);

	const getData = () =>{
		axios.get(`${process.env.REACT_APP_SERVER}/abc`)
		// 09.04 cloudtype 으로 서버 했을 떄 
		// axios.get('https://port-0-jsonserver-6w1j2alm48bhk2.sel5.cloudtype.app/abc')
		// axios.get('http://localhost:3030')
		.then(res => {
			setData(res.data)
			// console.log(res.data)
		})
	}
	useEffect(() => {
		// useEffect 안에 없으면 파일이 실행됐을 때 아래서 또 실행하고 무한렌더링가능 
		getData();
	}, [data])
	

  // index.js에서 post 한뒤 여기도 
  // axios.post('http://localhost:3030/insert', {id:100, name: "신규데이터"})

  return (
		<div>
			<h2>한줄 댓글(7)</h2>
			<Write />
			<ul>
				{/* data를 list에 보내준다 */}
				<List data={data} setData={setData} />
			</ul>
		</div>
  );
}

export default App;
