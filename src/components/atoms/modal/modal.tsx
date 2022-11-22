import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../../utils/use-onclick-outside';
import styles from './modal.module.scss';

export const Modal = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const outsideRef = useRef<HTMLDivElement>(null!);
  const closeModal = () => setShowModal(false);
  // useOnClickOutside(outsideRef, closeModal);

  return (
  <>
    <button onClick={() => setShowModal(!showModal)}>Popup Link</button>
    <div className={`${styles['modal-container']} ${showModal ? styles['modal-content__show'] : ''} `}>
      <div ref={outsideRef} className={styles['modal-content']}>
        <button onClick={closeModal}>Close</button>
        <div className="modal-content__show">
          <h6>Modal Window Title</h6>
          This is a modal window
        </div>
      </div>
    </div>
  </>
)};
