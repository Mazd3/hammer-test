import React from "react";
import { Card, Table } from "antd";

import { useSelector } from "react-redux";
import Loading from "components/shared-components/Loading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const UserList = ({ match }) => {
  const { clients, loading, error } = useSelector((state) => state.clients);

  const tableColumns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: "Имя",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
      render: (name, { id }) => <Link to={`${match.url}/${id}`}>{name}</Link>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      render: (address) =>
        `${address.city}, ${address.street}, ${address.suite} (${address.zipcode})`,
    },
  ];

  if (loading) {
    return <Loading cover="content" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <Table columns={tableColumns} dataSource={clients} rowKey="id" />
    </Card>
  );
};

export default UserList;
