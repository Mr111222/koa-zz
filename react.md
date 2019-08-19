react.md1
	1.虚拟dom
	 性能最优，按需更新渲染页面
	 对比新旧dom树来进行更新
	2.如何获取新旧dom树
		程序员自己模拟新旧dom树，如何模拟dom元素
		程序员手动模拟两根新旧dom树，就是react虚拟dom的概念

	总结: 用js对象来模拟页面上的dom层级嵌套关系

	3.diff算法 different
		tree diff: 新旧两颗dom树逐层对比的过程就是treeDiff
		component diff: tree diff过程中每一层对组件进行对比
		如果组件类型相同 怎认为暂时不更新，反之则更新
		element diff:在进行组件对比的时候，若组件类型相同则需要进行元素级别的对比
	4.redux
		vscode插件  sinple-react-snippets
		工作流程

		1.事件触发， 以input onchange事件为例子
		
		// todolist.js   组件文件

		import React, { Component } from 'react';
		import {Input, Button, List} from 'antd';
		import store from '../store' 
		import 'antd/dist/antd.css'
		class Todolist extends Component {
		  constructor(props) {
		    super(props);
		    this.state = store.getState() // 获取初始化数据
		    this.changeVal = this.changeVal.bind(this)
		    this.storeChange = this.storeChange.bind(this) 
		    store.subscribe(this.storeChange) // 订阅模式
		  }

		  // 派发事件
		  changeVal (e) {
		    console.log(e.target.value);
		    const action = {
		      type: 'changeInp',
		      value: e.target.value
		    }
		    store.dispatch(action)
		  }
		  
		  // 订阅模式  新版本不需要
		  storeChange (){
		    this.setState(store.getState())
		  }
		  render() { 
		    return ( 
		      <div style={{marginLeft:'10px'}}>
		        <Input
		          placeholder={this.state.inputValue}
		          style={{width:'250px', marginRight:'10px'}}
		          onChange={this.changeVal}
		          value={this.state.inputValue}
		        >
		        </Input> 
		        <Button type="primary">增加</Button>

		        <div style={{margin:'10px', width:'300px'}}>
		        <List
		          bordered
		          dataSource={this.state.list}
		          renderItem={(item, index)=>(<List.Item>{index+1}.{item}</List.Item>)}
		        >

		        </List>
		        </div> 
		      </div>
		     );
		  }
		}
		 
		export default Todolist;

		// store文件夹下 index.js
			import {createStore, applyMiddleware, compose} from 'redux';
			import reducer from './reducer'

			const store = createStore(
			  reducer
			);

			export default store;

		//store文件夹下 reducer.js
		const defaultState = {
		  inputValue: 'jsut do it',
		  list: [
		    '早晨上班打卡',
		    '中午吃饭休息',
		    '晚上下班回家',
		    '路上堵车中......'
		  ]
		}

		export default (state = defaultState, action)=>{
		  console.log(action, 'action');
		  // reducer 只能接受state 不能改变state
		  if(action.type === 'changeIpn'){
		    let newState = JSON.parse(JSON.stringify(state))
		    newState.inputValue = action.value
		    return newState
		  }
		  return state
		}

		window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION()

