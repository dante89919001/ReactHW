import Image from "next/image";
import { createPortal } from "react-dom";
import  styles  from "./Modal.module.css";



type ModalProps =  {
    onClose: () => void;
    onConfirm: () => void;
  }

export const Modal: React.FC<ModalProps> = ({ onClose, onConfirm }) => {
    return createPortal(
      <div className={styles.modalWrapper}>
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalTitle}>
              <h4>Удаление билета</h4>
              <div className={styles.closeButton} onClick={onClose}>
                <Image src="/img/close.svg" alt="Description of the image" width={10} height={10} />
              </div>
            </div>
            <p className={styles.modalText}>Вы уверены, что хотите удалить билет?</p>
            <div className={styles.modalButtons}>
              <div className={styles.modalButtonYes} onClick={onConfirm}>
                Да
              </div>
              <div className={styles.modalButtonNo} onClick={onClose}>
                Нет
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalBackdrop} onClick={onClose} />
      </div>,
      document.body as HTMLElement
    ) as React.ReactPortal;
  };
  