import { useForm } from 'react-hook-form';
import styles from './CreateSuburbForm.module.scss'

const CreateSuburbForm = () => {
    const { register } = useForm();

    return (
        <form className={styles.createSuburbForm}>
            <label htmlFor="">Suburb name:</label>
            <input type="text" {...register("name")}/>

            <label htmlFor="">Population:</label>
            <input type="text" {...register("population")} />

            <label htmlFor="">Postcode</label>
            <input type="text" {...register("postcode")} />

            <input type="submit" value="Submit" />
        </form>
    )
}

export default CreateSuburbForm