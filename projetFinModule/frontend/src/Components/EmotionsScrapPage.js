import {React, useEffect, useState} from "react";
import { useQuery, gql} from "@apollo/client";
import { GET_EMOTIONS } from "../Services/queries";
import { Layout, Menu, Col, Row, Input, List} from 'antd';
import 'antd/dist/antd.css';
import './main.css';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from "react-router";


const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
const onChange = e => {
    console.log('Change:', e.target.value);
  };

  
function EmotionsScrapPage(){
    const history=useHistory()
    const {error,loading, data} = useQuery(GET_EMOTIONS);
    const [emotions, setEmotions] = useState([]);

    useEffect(() =>{
    if (data) {
        console.log(data.emotions[0]);
        setEmotions(data.emotions);
    }}, [data]);


        return(
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} >
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['6']}>
                <Menu.Item key="1" onClick={()=>history.push('/')}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" onClick={()=>history.push('/detectFakeNews')}>Detection Fake News </Menu.Item>
                    <Menu.Item key="3" onClick={()=>history.push('/detectEmotions')}>Analyse des Sentiments </Menu.Item>
                    <Menu.Item key="4" onClick={()=>history.push('/nlp')}>Fonctions NLP </Menu.Item>
                    <Menu.Item key="5" onClick={()=>history.push('/scrapFakeNews')}>Scrapping des News</Menu.Item>
                    <Menu.Item key="6" onClick={()=>history.push('/scrapEmotions')}>Scrapping des Sentiments</Menu.Item>
                </Menu>
                </Header>
                    <Content className="site-layout" style={{ padding: '20px 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <h1 style={{textAlign: 'center'}}>Scrapping des Sentiments</h1>
                    <Row gutter={20} align="center">
                    <Col span={20}>
                    <div className="demo-infinite-container" style={{height:"400px"}}>
                    <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    useWindow={false}
                    >
                    {emotions.map((val)=> {
                        return (
                            <List size="large" bordered>
                                <List.Item>
                                <b>Text : </b>{val.text} <br/>
                                <b>Source : </b><a href={val.source}>{val.source}</a><br/>
                                <b>Label : </b>{val.label}
                                </List.Item>
                            </List>
                        );
                    })}
                    </InfiniteScroll>
                    </div>
                    </Col>
                    </Row>
                    </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Réalisé par : Zeggaf Amine & Medaghri Alaoui Amine</Footer>
                    <div>

            </div>
                </Layout>

        );

}   

export default EmotionsScrapPage;