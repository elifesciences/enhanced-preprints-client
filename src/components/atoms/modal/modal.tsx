import { useRef, useState, MouseEvent } from 'react';
import './modal.scss';

type Props = {
  modalTitle: string, children: ReactElement
};

export const Modal = ({ modalTitle, children }: Props): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeModal = () => setShowModal(false);

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (contentRef.current && !contentRef.current.contains(event.target as Element)) {
      closeModal();
    }
  };

  return (
  <>
    <button className="modal-button" onClick={() => setShowModal(!showModal)}>Modal Link</button>
    <div onClick={(event) => clickHandler(event)} className={`modal-container${showModal ? ' modal-content__show' : ''} `}>
      <div ref={contentRef} className="modal-content">
        <div className="modal-content__block">
          <div className="modal-content__top">
            <h6 className="modal-content__title">{modalTitle}</h6>
            <button className="modal-content__close-button" onClick={closeModal}>Close</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  </>
  );
};
