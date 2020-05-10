import React, {useState, useContext} from 'react';
import {AlertContext} from '../context/alert/alertContext';
import {FirebaseContext} from '../context/firebase/firebaseContext';

export const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext);

    const submitHandler = evt => {
        evt.preventDefault();
        if (value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show('Note was added', 'success');
            }).catch(() => {
                alert.show('Something went wrong', 'danger');
            });
            setValue('');
        } else {
            alert.show('Add text');
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a title"
                    value={value}
                    onChange={evt => setValue(evt.target.value)}
                />
            </div>
        </form>
    )
}