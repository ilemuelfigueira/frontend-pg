import { Modal } from "antd";
import { twMerge } from "tailwind-merge";

const Container = ({children}) => (
  <div className="flex flex-col">{children}</div>
);

export default function ConfirmModal({
  children,
  onOk,
  containerClassname,
  onCancel,
  okText,
  ...props
}) {
  return (
    <Modal
      title={() => <>TESTE</>}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      {...props}
    >
      <Container className={twMerge("", containerClassname)}>
        {children}
      </Container>
    </Modal>
  );
}
