import React from 'react';
import { Layout, Menu,  Col, Button,  Input, Alert, Divider } from 'antd';
import 'antd/dist/antd.css';
import './main.css';
import { Spinner} from 'react-activity';
import { Redirect } from "react-router-dom";

import detectEmotions from '../Services/detectEmotions'
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;




class SentimentPage extends React.Component{
    
    state = {
        collapsed: false,
        text:"",
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
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['3']}>
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
                    <h1 style={{textAlign: 'center', padding:"10px 30px"}}>Analyse des sentiments</h1>
                    
                    <Divider plain style={{ width: "100%", fontSize: "20px" }} orientation="left" type="horizontal">
                      Entrer le texte que vous désirez analyser
                    </Divider>                   
                    <TextArea showCount placeholder='Entrer le texte que vous désirez analyser' onChange={(e)=>this.setState({text:e.target.value})} />
                    <Col span={3} style={{ padding:'20px 10px 10px 10px' }}>
                        <Button type="primary" htmlType="submit" style={{ width: "100%",display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}} onClick={()=>{
                          this.setState({loading:true})
                          detectEmotions(this.state.text).then((res)=>{
                          if(res.data[0].label=="NEGATIVE") {
                            
                            this.setState({label:false})
                            this.setState({loading:false})
                        }else {
                          
                          this.setState({label:true})
                          this.setState({loading:false})
                        }
                        })}} >
                             {this.state.loading==false && "Analyser"} {this.state.loading==true && <Spinner size={14}/>}
                        </Button>
                    </Col>
                    <Divider plain style={{ width: "100%", fontSize: "20px" }} orientation="left" type="horizontal">
                        Le résultat
                    </Divider> 

                    {
                      this.state.label==true &&
                      <Alert
                      message="Sentiment positif"
                      type="success"
                      description="Nous avons détecter que cet article contient des sentiments positifs."
                      showIcon
                    />
                    }

                    {
                      this.state.label==false &&
                      <Alert
                      message="Sentiment negatif"
                      type="error"
                      description="Nous avons détecter que cet article contient des sentiments negatifs."
                      showIcon
                    />
                    }
                   





                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Réalisé par : Zeggaf Amine & Medaghri Alaoui Amine</Footer>
            </Layout>
        );
    }

}

export default SentimentPage;