import React from 'react';
import { Layout, Menu, Col, Row, Button, Input, Divider} from 'antd';
import 'antd/dist/antd.css';
import './main.css';
import nlpTransformer from '../Services/nlpTransformer';
import { Spinner} from 'react-activity';
import { Redirect } from "react-router-dom";



const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;



class NLPPage extends React.Component{
    
    state = {
        collapsed: false,
        text:"",
        option:"tokenWord",
        result:"",
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
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['4']}>
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
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <Menu.Item key="1" onClick={()=> {this.setState({option:"tokenWord"})}}>
                                    Tokenisation
                                </Menu.Item>
                                <Menu.Item key="2" onClick={()=> {this.setState({option:"tokenSentence"})}}>
                                    Tokenisation par phrases
                                </Menu.Item>
                                <Menu.Item key="3" onClick={()=> {this.setState({option:"stem"})}}>
                                    Stemming
                                </Menu.Item>
                                <Menu.Item key="4" onClick={()=> {this.setState({option:"lemma"})}}>
                                    Lemmatization
                                </Menu.Item>
                                <Menu.Item key="5" onClick={()=> {this.setState({option:"stopWords"})}}>
                                    Stop words
                                </Menu.Item>
                                <Menu.Item key="6" onClick={()=> {this.setState({option:"pos"})}}>
                                    L’étiquetage morpho-syntaxique
                                </Menu.Item>
                                <Menu.Item key="7" onClick={()=> {this.setState({option:"bow"})}}>
                                    Sac des mots
                                </Menu.Item>
                                <Menu.Item key="8" onClick={()=> {this.setState({option:"wordToVector"})}}>
                                    Embedding par mot
                                </Menu.Item>
            
                            </Menu>
                        </Sider>
                        <Content className="site-layout" style={{ padding: '20px 50px' }}>
                            <h1 style={{textAlign: 'center', fontSize:'30px'}}>Les fonctionalités de NLP</h1>
                            <Row gutter={31} align="center">
                                <Col span={12}>
                                    <Divider plain style={{ width: "100%", fontSize: "20px" }} orientation="left" type="horizontal">
                                        Inserer le texte à transformer
                                    </Divider>                   
                                    <TextArea showCount placeholder='Inserer le texte a transformer' onChange={(e)=>this.setState({text:e.target.value})}  />
                                    <Col span={8} align="right" style={{ padding:'20px 10px 10px 10px'}}>
                                        <Button type="primary" htmlType="submit" style={{ width: "100%"}} onClick={()=>{
                                            this.setState({loading:true})
                                            nlpTransformer(this.state.text,this.state.option).then((res)=>{
                                                
                                                this.setState({result:res.data,loading:false})
                                                
                                            })}}
                                        
                                        
                                        >
                                             {this.state.loading==true && <Spinner size={14}/>} {this.state.loading==false && "Do it"}
                                        </Button>
                                    </Col>                        
                                </Col>
                                <Col span={12}>
                                    <Divider plain style={{ width: "100%", fontSize: "20px" }} orientation="left" type="horizontal">
                                        Le résultat
                                    </Divider>
                                    <TextArea disabled value={this.state.result}  />
                                </Col>
                            </Row>      
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Réalisé par : Zeggaf Amine & Medaghri Alaoui Amine</Footer>
            </Layout>
        );
    }

}

export default NLPPage;