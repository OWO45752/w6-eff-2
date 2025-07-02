import { useEffect, useState } from 'react'
import { Card, Col, Image, Row } from "antd";

function App() {
  const [data, setData] = useState<Record<string, never>[]>([]);

  useEffect(() => {
    (async () => {
        const r = await fetch("https://dummyjson.com/products")
        const d = await r.json();
        setData(d.products);
    })();
  }, [])

  return (
    <>
        <Row gutter={[20, 20]}>
            {data.map((e) => (
            <Col>
            <Card key={e.id} title={e.title} style={{ width: 240 }} hoverable>
                <Image src={e.images[0]} />
                <p>{e.description}</p>
                <p>price: {e.price}</p>
            </Card></Col>
        ))}
        </Row>
    </>
  )
}

export default App
