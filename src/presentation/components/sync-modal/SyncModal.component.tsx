// import { Button, Flex, Modal, Result, Spin } from "antd";
// import { useState } from "react";
// import { useSyncTransactions } from "../../hooks/useSyncTransactions";
// import { useSyncModal } from "../../hooks/useSyncModal";

// type SyncState = "loading" | "success" | "error";

// const SyncModal: React.FC = () => {
//   const { SyncModal, closeSyncModal } = useSyncModal();
//   const [state, setState] = useState(false);

//   const handleSetState = () => {
//     setState(true);
//   };

//   return (
//     <Modal open={SyncModal} onCancel={closeSyncModal} footer={null} width={430} closable={false}>
//       {!state ? (
//         <SyncConfirm onClose={closeSyncModal} onConfirm={handleSetState} />
//       ) : (
//         <Sync onClose={closeSyncModal} />
//       )}
//     </Modal>
//   );
// };

// interface SyncConfirmProps {
//   onClose: () => void;
//   onConfirm: () => void;
// }

// const SyncConfirm: React.FC<SyncConfirmProps> = ({ onClose, onConfirm }) => {
//   const transactionsLength = 2;

//   return (
//     <>
//       <Result
//         status="info"
//         title={`Hay ${transactionsLength} ${transactionsLength > 1 ? "transacciones" : "transacción"} sin sincronizar`}
//         subTitle="¿Deseas sincronizarlas?"
//       />
//       <Flex gap={8}>
//         <Button block danger onClick={onClose}>
//           Descartar
//         </Button>
//         <Button block type="primary" onClick={onConfirm}>
//           Confirmar
//         </Button>
//       </Flex>
//     </>
//   );
// };

// const Sync: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   // const [syncState, setSyncState] = useState<SyncState>("loading");
//   // useSyncTransactions(syncState, setSyncState);

//   return (
//     <>
//       {syncState === "loading" && (
//         <Flex justify="center" vertical>
//           <div style={{ paddingBlock: 150 }}>
//             <Spin tip="Sincronizando..." size="large">
//               {null}
//             </Spin>
//           </div>
//         </Flex>
//       )}
//       {syncState === "success" && (
//         <Result
//           status="success"
//           title="Transacciones sincronizadas"
//           subTitle="Las transacciones han sido sincronizadas con exito"
//           extra={[
//             <Button block type="primary" onClick={onClose}>
//               Cerrar
//             </Button>,
//           ]}
//         />
//       )}
//       {syncState === "error" && (
//         <Result
//           status="error"
//           title="Transacciones no sincronizadas"
//           subTitle="Las transacciones no han sido sincronizadas"
//         />
//       )}
//     </>
//   );
// };

// export default SyncModal;
