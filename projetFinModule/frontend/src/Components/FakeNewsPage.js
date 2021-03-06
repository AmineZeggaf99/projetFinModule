import React from 'react';
import { Layout, Menu,  Col, Button, Input, Alert, Divider } from 'antd';
import 'antd/dist/antd.css';
import './main.css';
import { Spinner} from 'react-activity';
import { Redirect } from "react-router-dom";


import detectFakeNews from '../Services/detectFakeNews';

const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;



class FakeNewsPage extends React.Component{
    
    state = {
        collapsed: false,
        news:"",
        label:null,
        loading:false,
        redirect:null
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
          
        });
      };

    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} >
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1" onClick={()=>this.setState({redirect:'/'})}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" onClick={()=>this.setState({redirect:'/detectFakeNews'})}>Detection Fake News </Menu.Item>
                    <Menu.Item key="3" onClick={()=>this.setState({redirect:'/detectEmotions'})}>Analyse des Sentiments </Menu.Item>
                    <Menu.Item key="4" onClick={()=>this.setState({redirect:'/nlp'})}>Fonctions NLP </Menu.Item>
                    <Menu.Item key="5" onClick={()=>this.setState({redirect:'/scrapFakeNews'})}>Scrapping des News</Menu.Item>
                    <Menu.Item key="6" onClick={()=>this.setState({redirect:'/scrapEmotions'})}>Scrapping des Sentiments</Menu.Item>
                </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '20px 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <h1 style={{textAlign: 'center', padding:'10px 30px'}}>D??tection des fausses actualit??s sur le COVID-19</h1>

                    <Divider plain style={{ width: "100%", fontSize: "20px" }} orientation="left" type="horizontal">
                        Entrer le texte que vous d??sirez d??tecter
                    </Divider>                   
                    <TextArea showCount placeholder='Entrer le texte que vous d??sirez d??tecter' onChange={(e)=>this.setState({news:e.target.value})} />
                    <Col span={3} style={{ padding:'20px 10px 10px 10px' }}>
                        <Button type="primary" htmlType="submit" style={{ width: "100%",display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}  onClick={()=>{
                          this.setState({loading:true})
                          detectFakeNews(this.state.news).then((res)=>{
                            console.log(res)
                          if(res.data==0) {
                            this.setState({label:false})
                            this.setState({loading:false})
                        }else {
                          this.setState({label:true})
                          this.setState({loading:false})
                        }
                        })}}> 
                            {this.state.loading==false && "D??tecter"} {this.state.loading==true && <Spinner size={14}/>}
                        </Button>
                    </Col>
                    <Divider plain style={{ width: "100%", fontSize: "20px" }} orientation="left" type="horizontal">
                        Le r??sultat
                    </Divider>

                    {this.state.label==true &&
                    
                    <Alert
                    message="Article r??el"
                    type="success"
                    description="Nous avons d??tecter que cet article contient des informations r??els."
                    showIcon
                  />
  
                    } 
                   {
                   this.state.label==false &&
                    <Alert
                  message="Article faux"
                  type="error"
                  description="Nous avons d??tecter que cet article contient des informations fausses."
                  showIcon
                
                    />

                   }
                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>R??alis?? par : Zeggaf Amine & Medaghri Alaoui Amine</Footer>
            </Layout>
        );
    }

}

export default FakeNewsPage;