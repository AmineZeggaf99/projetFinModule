import React from 'react';
import { Layout, Menu, Card, Col, Row, Button, Image } from 'antd';
import 'antd/dist/antd.css';
import './main.css';
import { Redirect } from "react-router-dom";



const { Header, Footer, Sider, Content } = Layout;


class MainPage extends React.Component{
    

    state = {
        collapsed: false,
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
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={()=>{this.setState({redirect:'/'} ) 
                console.log("lol")
            
            }}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" onClick={()=>{this.setState({redirect:'/detectFakeNews'})
                    console.log(this.state.redirect)
                
                }}>Detection Fake News </Menu.Item>
                    <Menu.Item key="3" onClick={()=>this.setState({redirect:'/detectEmotions'})}>Analyse des Sentiments </Menu.Item>
                    <Menu.Item key="4" onClick={()=>this.setState({redirect:'/nlp'})}>Fonctions NLP </Menu.Item>
                    <Menu.Item key="5" onClick={()=>this.setState({redirect:'/scrapFakeNews'})}>Scrapping des News</Menu.Item>
                    <Menu.Item key="6" onClick={()=>this.setState({redirect:'/scrapEmotions'})}>Scrapping des Sentiments</Menu.Item>
                </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <h1 style={{textAlign: 'center', fontSize:'30px'}}>Projet NoSQL</h1>
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                        <Col span={8}>
                            <Card bordered={true} style={{height: '350px', display:'flex', alignItems:'center', background:'#1890ff'}}>
                                <div style={{height:'200px', width:'100%'}}>
                                    <h1 style={{textAlign: 'center', paddingBottom:'40px', fontSize:'30px', color:'white'}}>
                                        Détection des fausses actualités sur le COVID-19
                                    </h1> 

                                </div>
                                <Button  type="primary"  shape="round" style={{ width: "100%",height:'50px' , backgroundColor: "white", color:'black', fontSize:'20px'}}
                                onClick={()=>this.setState({redirect:'/detectFakeNews'})}
                                >
                                    Accéder
                                </Button>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card bordered={true} style={{height: '350px', display:'flex', alignItems:'center', background:'#1890ff'}}>
                                <div style={{height:'200px', width:'100%'}}>
                                    <h1 style={{textAlign: 'center', paddingBottom:'40px', fontSize:'30px', color:'white'}}>
                                        L'analyse des Sentiments  
                                    </h1> 
                                </div>
                                <Button type="primary" shape="round" style={{ width: "100%",height:'50px' , backgroundColor: "white", color:'black', fontSize:'20px'}}
                                onClick={()=>this.setState({redirect:'/detectEmotions'})}
                                >
                                    Accéder
                                </Button>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card bordered={true} style={{height: '350px', display:'flex', alignItems:'center', background:'#1890ff'}}>
                                <div style={{height:'200px', width:'100%'}}>
                                    <h1 style={{textAlign: 'center', paddingBottom:'40px', fontSize:'30px', color:'white'}}>
                                        Les fonctionalités du Natural Language Processing
                                    </h1> 
                                </div>
                                <Button type="primary" shape="round" style={{ width: "100%",height:'50px' , backgroundColor: "white", color:'black', fontSize:'20px'}}
                                onClick={()=>this.setState({redirect:'/nlp'})}
                                >
                                    Accéder
                                </Button>
                            </Card>
                        </Col>
                        </Row>
                    </div>
                </div>
        

                </Content>
                <Footer style={{ textAlign: 'center' }}>Réalisé par : Zeggaf Amine & Medaghri Alaoui Amine</Footer>
            

                

            
            
            </Layout>
        );
    }

}
 
export default MainPage;