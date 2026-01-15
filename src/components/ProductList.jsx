import React from 'react';
import { Table, Button, Skeleton, Tag, Switch } from 'antd';
import '../assets/styles/ProductList.css';

const ProductList = ({ products, onEdit, onToggleStatus, onDelete, isLoading, isInactive = false }) => {
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toLocaleString()}`,
    },
    {
      title: 'Estado',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Activo' : 'Inactivo'}
        </Tag>
      )
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <div className="product-actions">
          <Button 
            type="primary" 
            onClick={() => onEdit(record)}
            disabled={!record.isActive && !isInactive}
          >
            Editar
          </Button>

          <Button
            danger
            onClick={() => onDelete(record._id)}
          >
            Eliminar
          </Button>
          
          <Switch
            checked={record.isActive !== false}
            onChange={(checked) => onToggleStatus(record._id, !checked)}
            checkedChildren="Activo"
            unCheckedChildren="Inactivo"
          />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  return (
    <div className={`product-list-container ${isInactive ? 'inactive' : ''}`}>
      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProductList;
