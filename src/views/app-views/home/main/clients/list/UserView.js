import { Button, Card, Form, Input } from "antd";
import Loading from "components/shared-components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateClientRequest } from "redux/actions";

const UserView = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { clients, loading, error } = useSelector((state) => state.clients);

  if (loading) {
    return <Loading cover="content" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { name, email, address } = clients.find(
    (client) => client.id === Number(id)
  );

  const onFinish = async (user) => {
    user = {
      ...user,
      id: Number(id),
      address: {
        city: user.city,
        street: user.street,
        suite: user.suite,
        zipcode: user.zipcode,
      },
    };
    dispatch(updateClientRequest(user));
  };

  return (
    <Card>
      <Form
        name="basicInformation"
        layout="vertical"
        initialValues={{
          name: name,
          email: email,
          city: address.city,
          street: address.street,
          suite: address.suite,
          zipcode: address.zipcode,
        }}
        onFinish={(user) => onFinish(user)}
      >
        <Form.Item label="Имя" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Город" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Улица" name="street">
          <Input />
        </Form.Item>
        <Form.Item label="Подъезд" name="suite">
          <Input />
        </Form.Item>
        <Form.Item label="Индекс" name="zipcode">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save Change
        </Button>
      </Form>
    </Card>
  );
};

export default UserView;
