import {
  useRef, MouseEvent,
} from 'react';
import './modal.scss';

type Props = {
  modalTitle: string,
  children?: React.ReactNode,
  open?: boolean,
  modalLayout?: 'cite' | 'share',
  onModalClose?: () => void,
  modalWarning?: string,
};

export const Modal = ({
  modalTitle,
  children,
  open = false,
  onModalClose,
  modalLayout,
  modalWarning,
}: Props) => {
  const contentRef = useRef<HTMLDialogElement>(null);

  const clickDetectedOutsideOfModal = (event: MouseEvent<HTMLDivElement>) => contentRef.current && !contentRef.current.contains(event.target as Element);

  return (
    <>
      <div onClick={(event) => { if (onModalClose !== undefined && clickDetectedOutsideOfModal(event)) { onModalClose(); } }} className={`modal-container${open ? ' modal-content__show' : ''} `}>
        <dialog ref={contentRef} role="alertdialog" aria-modal="true" aria-labelledby="modal_title" aria-describedby="modal_content" className={`modal-content ${modalLayout ? ` modal-content__${modalLayout}` : ''}`}>
          <div className="modal-content__block">
            <div className="modal-content__top">
              <h6 id="modal_title" className="modal-content__title">{modalTitle}</h6>
              {onModalClose !== undefined ? (<button className="modal-content__close-button" onClick={onModalClose}>Close</button>) : ''}
            </div>
            {children !== undefined && open ? (<div id="modal_content" className="modal-content__body">{children}</div>) : ''}
            {modalWarning && <span className="modal-content__warning">{modalWarning}</span>}
          </div>
        </dialog>
      </div>
    </>
  );
};
