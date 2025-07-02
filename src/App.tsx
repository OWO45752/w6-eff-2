import { useEffect, useState } from 'react';
import { Card, Col, Image, Row, Typography, Spin, Alert } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons'; // For a nice icon

const { Title, Text } = Typography; // Destructure for easier use

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Error"
          description={`Failed to load products: ${error}. Please try again later.`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '30px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#1890ff' }}>
        <ShoppingOutlined /> Our Amazing Products
      </Title>
      <Row gutter={[24, 24]} justify="center"> {/* Increased gutter and centered cards */}
        {products.map((product) => (
          <Col
            key={product.id}
            xs={24} // Full width on extra small screens
            sm={12} // Half width on small screens
            md={8}  // One-third width on medium screens
            lg={6}  // One-fourth width on large screens
            xl={4}  // Even smaller on extra large screens (e.g., 6 items per row)
          >
            <Card
              hoverable
              cover={<Image alt={product.title} src={product.images[0]} style={{ height: 200, objectFit: 'cover' }} />}
              style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              bodyStyle={{ padding: '16px' }}
            >
              <Card.Meta
                title={<Title level={4} ellipsis={{ rows: 1 }} style={{ marginBottom: '8px' }}>{product.title}</Title>}
                description={
                  <>
                    <Text type="secondary" ellipsis={{ rows: 2 }}>{product.description}</Text>
                    <Title level={5} style={{ color: '#52c41a', marginTop: '10px' }}>
                      Price: ${product.price.toFixed(2)}
                    </Title>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;