import { useContext } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/ModalContext';
import NewShoeWeightForm from '../forms/NewShoeWeightForm';
import { IShoeWeight } from '../../types/production';
import { Image } from 'react-native';


function NewShoeWeightDialog({ shoeweight }: { shoeweight?: IShoeWeight }) {
    const { choice, setChoice } = useContext(ChoiceContext)
  
    return (
        <>
            <Dialog fullScreen visible={choice === ProductionChoiceActions.create_showweight ? true : false} handleClose={() => setChoice({ type: ProductionChoiceActions.close_production })}
            >
                {!shoeweight ? <NewShoeWeightForm /> :
                    <Image style={{ flex: 1, height: '100%', width: '100%' }} source={{ uri: shoeweight.shoe_photo1?.public_url }} />}
            </Dialog>
        </>
    )
}

export default NewShoeWeightDialog


