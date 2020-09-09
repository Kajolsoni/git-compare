import React, {useState} from 'react';

import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';

import Line from './chart';
import './App.css';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const Card=(props)=>{
  const [Repos,setRepos]=useState(0);
  const [avatar,setAvatar]=useState('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80');
 const[name,setName]=useState('Github User');
 const [gist,setGist]=useState(0);
 const [followers,setFollowers]=useState(0);
 const[following,setFollowing]=useState(0);

  fetch(`https://api.github.com/users/${props.username}`)
  .then(response => response.json())
  .then(data =>{ setRepos(data.public_repos);
    setAvatar(data.avatar_url);
    setName(data.name);
    setGist(data.public_gists);
    setFollowers(data.followers);
    setFollowing(data.following);

    console.log(data)
    let data2=[ {
      title: props.username,
      borderColor: '#fe4849',
      values: [37, 15, 90, 57],
  },
  {
      title: 'User2',
      borderColor: '#01b6f5',
      values: [18, 39, 15, 38]
  },]
    ReactDOM.render(<div ><Line dataset={data2}/></div>,document.getElementById('cht'));
  });

return (
<div style={{marginBottom:'10px'}}>
    <div className="card p-3">
        <div className="d-flex align-items-center">
            <div className="image"> <img src={avatar} class="rounded" width="155" alt=''/> </div>
            <div className="ml-3 w-100">
                <h4 className="mb-0 mt-0">{props.username}</h4> <span>{name}</span>
                <div className="p-2 mt-2 bg-secondary d-flex justify-content-between rounded text-white stats">
<div className="d-flex flex-column"> <span className="articles">Public Repos</span> <span className="number1">{Repos}</span> </div>
                    <div className="d-flex flex-column"> <span className="followers">Followers</span> <span className="number2">{followers}</span> </div>
                    <div className="d-flex flex-column"> <span className="rating">Following</span> <span className="number3">{following}</span> </div>
                    <div className="d-flex flex-column"> <span className="gist">Gist</span> <span className="number4">{gist}</span> </div>
                </div>
                <div className="button mt-2 d-flex flex-row align-items-center"> <button  onClick={(e) => {e.preventDefault(); window.location.href=`https://github.com/${props.username}`;}} className="btn btn-sm btn-outline-primary w-100">Overview </button> <button  onClick={(e) => {e.preventDefault(); window.location.href=`https://github.com/${props.username}?tab=repositories`;}} class="btn btn-sm btn-primary w-100 ml-2">Repository</button> </div>
            </div>
        </div>
    </div>
</div>

);
}
const App = () => {
  const onFinish = values => {
  let element=[];
  
for(var i=0;i<values.usernames.length;i++)
element.push(<Card username={values.usernames[i]}/>);
ReactDOM.render(element,document.getElementById('out'))
    
  }
  return (
    
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
      <Form.List name="usernames">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Github Users  ' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input a Github Username or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="GitHub Username" style={{ width: '70%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '70%' }}
                >
                  <PlusOutlined /> Add GitHub Username
                </Button>
                <br/>
                <Button
                  type="dashed"
                  onClick={() => {
                    add('Github Username', 0);
                  }}
                  style={{ width: '70%', marginTop: '20px' }}
                >
                  <PlusOutlined /> Add at TOP
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Compare
        </Button>
      </Form.Item>
    </Form>
  
  );
};

export default App;
