import { useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es);
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { useUiStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {
  const {isDateModalOpen, closeDateModal} = useUiStore();
  // const [isOpen, setIsOpen] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    title:'Daniel',
    notes:'Lopez',
    start: new Date(),
    end: addHours (new Date(), 3),

  });

  const tittleClass = useMemo(() =>{
    if (!formSubmitted) return;
    return (formValues.title.length > 0 ) 
      ? 'is-valid'
      : 'is-invalid';
  }, [formValues.title, formSubmitted])

  const onInputChanges = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  
  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    });
  };
  
  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      console.log('Error en las fechas');
      Swal.fire(
        'Fechas incorrectas',
        'Revisar las fechas ingresadas',
        'error'
      )
    };
    if (formValues.title.length <=0 ) return;
  }
  
  

  return (
    <Modal
      isOpen={isDateModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      // contentLabel="Example Modal"
      className='modal '
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
    <h1> Nuevo evento </h1>
    <hr />
    <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            {/* <input value={formValues.start} className="form-control" placeholder="Fecha inicio" /> */}
            <DatePicker 
              locale='es'
              className='form-control'
              selected={formValues.start}
              onChange={(event) => onDateChanged(event, 'start')}
              dateFormat={'Pp'}
              showTimeSelect
              timeCaption='Hora'
            />
        </div>

        <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            {/* <input className="form-control" placeholder="Fecha inicio" /> */}
            <DatePicker 
              locale='es'
              minDate={formValues.end}
              className='form-control'
              selected={formValues.end}
              onChange={(event) => onDateChanged(event, 'end')}
              dateFormat={'Pp'}
              showTimeSelect
              timeCaption='Hora'
            />
        </div>

        <hr />
        <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input 
                type="text" 
                className={`form-control ${tittleClass}` }
                placeholder="Título del evento"
                name="title"
                autoComplete="off"
                value={formValues.title}
                onChange={onInputChanges}
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
            <textarea 
                type="text" 
                className="form-control"
                placeholder="Notas"
                rows="5"
                name="notes"
                value={formValues.notes}
                onChange={onInputChanges}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
            type="submit"
            className="btn btn-outline-primary btn-block"
        >
            <i className="far fa-save"></i>
            <span> Guardar</span>
        </button>

    </form>
    </Modal>
  )
}
