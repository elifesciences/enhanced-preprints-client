import {
  useRef, MouseEvent,
} from 'react';
import './modal.scss';

type Props = {
  modalTitle: string,
  children?: React.ReactNode,
  open?: boolean,
  onModalClose?: () => void,
};

export const Modal = ({ modalTitle, children, open = false, onModalClose, }: Props): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (onModalClose !== undefined && contentRef.current && !contentRef.current.contains(event.target as Element)) {
      onModalClose();
    }
  };

  return (
  <>
    <div onClick={(event) => clickHandler(event)} className={`modal-container${open ? ' modal-content__show' : ''} `}>
      <div ref={contentRef} className="modal-content">
        <div className="modal-content__block">
          <div className="modal-content__top">
            <h6 className="modal-content__title">{modalTitle}</h6>
            {onModalClose !== undefined ? (<button className="modal-content__close-button" onClick={onModalClose}>Close</button>) : ''}
          </div>
          {children !== undefined ? (<div className="modal-content__body">{children}</div>) : ''}
        </div>
      </div>
    </div>
  </>
  );
};
