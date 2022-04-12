import React from 'react'
import Carousel from 'emerald-ui/lib/Carousel';
import { Container, Row, Col, Card } from 'emerald-ui';

const Home = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} className="sample-col">&nbsp;</Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className="sample-col text-title">Featured Products</Col>
                </Row>
                <Carousel innerMargin={20}>
                    <Carousel.Slide style={{ width: '20vw' }}>
                        <Card>
                            <Card.Header color="success">
                                <h1 className="eui-card-header-title shopping-card-header">Army citrus punch</h1>
                            </Card.Header>
                            <div>
                                <h2 className="eui-card-title">FOOD</h2>
                                <p className="shopping-card">
                                    Army citrus punch
                                    $125.000
                                </p>
                            </div>
                        </Card>
                    </Carousel.Slide>
                    <Carousel.Slide style={{ width: '20vw' }}>
                        <Card>
                            <Card.Header color="success">
                                <h1 className="eui-card-header-title shopping-card-header">Best protein vainilla gourmet</h1>
                            </Card.Header>
                            <div>
                                <h2 className="eui-card-title">FOOD</h2>
                                <p  className="shopping-card">
                                Best protein vainilla gourmet
                                $170.000
                                </p>
                            </div>
                        </Card>
                    </Carousel.Slide>
                    <Carousel.Slide style={{ width: '20vw' }}>
                        <Card>
                            <Card.Header color="success">
                                <h1 className="eui-card-header-title shopping-card-header">Mouse wireless</h1>
                            </Card.Header>
                            <div>
                                <h2 className="eui-card-title">TECH</h2>
                                <p className="shopping-card">
                                    Mouse wireless
                                    $250.000
                                </p>
                            </div>
                        </Card>
                    </Carousel.Slide>
                </Carousel>
            </Container>
        </>
    )
}

export default Home;
